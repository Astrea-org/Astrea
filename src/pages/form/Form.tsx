import React, { useState, useEffect } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import Details from "./steps/Details";
import Verification from "./steps/Verification";
import License from "./steps/License";
import { AssetItem, TagType } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { AO_MODULE, AO_SCHEDULER, TAGS } from "../../utils/config";
import { useWallet } from "../../context/WalletContext";
import { connect, createDataItemSigner } from "@permaweb/aoconnect";
import { fetchUserByAddress } from "../../api/user";
import { fileToBuffer } from "../../utils/utils";
import { SubmitState } from "./SubmitState";
import { UploadComplete } from "./steps/UploadComplete";
import { addAssetToDB } from "../../api/apis";

type FormProps = {};

const Form: React.FC<FormProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [validation, setValidation] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [finalTxId, setFinalTxId] = useState<string>("");
  const { activeAddress } = useWallet();

  const methods = useForm<AssetItem>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      content_type: "",
      content: "",
      license: "",
      owner: "",
      file: undefined,
      banner: undefined,
      thumbnail: undefined,
    },
  });

  const { watch } = methods;

  const asset = watch();

  const validateFields = () => {
    if (activeStep === 0) {
      if (
        asset.title === "" ||
        asset.description === "" ||
        asset.file.length === 0
      ) {
        return false;
      }
    }
    if (activeStep === 1) {
      if (asset.license === "") {
        return false;
      }
    }
    console.log;
    return true;
  };

  const handleNext = () => {
    if (validateFields()) {
      !isLastStep && setActiveStep((cur) => cur + 1);
    }
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    console.log("validate", validation);
    setValidation(validateFields());
  }, [asset]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Details />;
      case 1:
        return <License />;
      case 2:
        return <Verification />;
      default:
        return "Unknown step";
    }
  };

  const handleUploadAsset = async () => {
    setSubmiting(true);

    let uploadedAssetsList: string[] = [];
    if (activeAddress) {
      const dateTime = new Date().getTime().toString();

      const title = asset.title;
      const description = asset.description;
      const type = asset.file[0].type;
      const balance = 1;

      try {
        const assetTags: TagType[] = [
          { name: TAGS.keys.contentType, value: type },
          { name: TAGS.keys.creator, value: activeAddress },
          { name: TAGS.keys.ans110.title, value: title },
          { name: TAGS.keys.ans110.description, value: description },
          { name: TAGS.keys.ans110.type, value: type },
          { name: TAGS.keys.ans110.implements, value: TAGS.values.ansVersion },
          { name: TAGS.keys.dateCreated, value: dateTime },
          { name: "Action", value: "Add-Uploaded-Asset" },
        ];

        if (asset.license !== "") {
          assetTags.push({
            name: TAGS.keys.license,
            value: TAGS.values.license,
          });
          assetTags.push({
            name: TAGS.keys.currency,
            value: TAGS.values.licenseCurrency,
          });
        }
        if (asset.proof !== "") {
          assetTags.push({ name: "Proof", value: asset.proof });
        }

        const aos = connect();

        let atomic_asset_src = null;

        let temp = await fetch(`public/atmoic-assets-src.text`);
        if (temp.ok) {
          atomic_asset_src = await temp.text();
        }
        const res = await fetchUserByAddress(activeAddress);

        if (atomic_asset_src && res) {
          atomic_asset_src = atomic_asset_src.replace(
            "[Owner]",
            `['${res.PID}']`
          );
          atomic_asset_src = atomic_asset_src.replaceAll(
            `'<NAME>'`,
            `[[${title}]]`
          );
          atomic_asset_src = atomic_asset_src.replaceAll("<TICKER>", "ATOMIC");
          atomic_asset_src = atomic_asset_src.replaceAll("<DENOMINATION>", "1");
          atomic_asset_src = atomic_asset_src.replaceAll(
            "<BALANCE>",
            balance.toString()
          );
          atomic_asset_src = atomic_asset_src.replace(
            "Transferable = true",
            "Transferable = false"
          );
        }

        let data: any = await fileToBuffer(asset.file[0]);

        let processId: string | null = null;
        let retryCount = 0;
        const maxRetries = 25;

        console.log("wallet: ", window.arweaveWallet);
        while (!processId && retryCount < maxRetries) {
          try {
            processId = await aos.spawn({
              module: AO_MODULE,
              scheduler: AO_SCHEDULER,
              signer: createDataItemSigner(window.arweaveWallet),
              tags: assetTags,
              data: data,
            });
            console.log(`Asset process: ${processId}`);
            setSubmiting(false);
            setFinalTxId(processId);
            setSubmissionSuccess(true);
          } catch (e: any) {
            console.error(`Spawn attempt ${retryCount + 1} failed:`, e);
            retryCount++;
            if (retryCount < maxRetries) {
              await new Promise((r) => setTimeout(r, 1000));
            } else {
              throw new Error(
                `Failed to spawn process after ${maxRetries} attempts`
              );
            }
          }
        }

        while (true) {
          try {
            if (processId && atomic_asset_src) {
              const evalMessage = await aos.message({
                process: processId,
                signer: createDataItemSigner(window.arweaveWallet),
                tags: [{ name: "Action", value: "Eval" }],
                data: atomic_asset_src,
              });
              console.log("evalMessage:", evalMessage);

              const evalResult = await aos.result({
                message: evalMessage,
                process: processId,
              });
              console.log("evalResult:", evalResult);

              if (evalResult && res) {
                await aos.message({
                  process: processId,
                  signer: createDataItemSigner(window.arweaveWallet),
                  tags: [
                    { name: "Action", value: "Add-Asset-To-Profile" },
                    { name: "ProfileProcess", value: res.PID },
                    { name: "Quantity", value: balance.toString() },
                  ],
                  data: JSON.stringify({ Id: processId, Quantity: balance }),
                });

                uploadedAssetsList.push(processId);

                console.log("uploadedAssetsList:", uploadedAssetsList);
                break;
              } else {
                console.log("No evalResult, retrying...");
              }
            } else {
              console.log("Error fetching from gateway");
              break;
            }
          } catch (error) {
            console.error("Error:", error);
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        while (true) {
          try {
            if (processId && res) {
              await addAssetToDB({
                PID: processId,
                Owner: activeAddress,
                OwnerId: res.PID,
                Username: res.username,
                Content_Type: type,
              });
              console.log("Uploaded to DB");
              break;
            } else {
              console.log("Error fetching from gateway");
              break;
            }
          } catch (error) {
            console.log(error);
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-white">
      {submiting ? (
        <div className="min-h-screen flex items-center justify-center text-black ">
          <SubmitState />
        </div>
      ) : submissionSuccess ? (
        <div className="min-h-screen flex items-center justify-center text-black ">
          <UploadComplete txId={finalTxId} />
        </div>
      ) : (
        <FormProvider {...methods}>
          <div className="w-full px-8 pt-28 bg-white flex flex-col min-h-screen">
            <div className="flex justify-end gap-10 h-10">
              <button
                className={`px-4 py-2 bg-gray-300 rounded disabled:opacity-50  ${
                  isLastStep ? "hidden" : ""
                }`}
                onClick={handlePrev}
                disabled={isFirstStep}
              >
                Prev
              </button>
              <button
                className={`px-4 py-2 bg-black text-white rounded disabled:opacity-50 ${
                  isLastStep ? "hidden" : ""
                }`}
                onClick={handleNext}
                disabled={isLastStep || !validation}
              >
                Next
              </button>

              {isLastStep && (
                <button
                  className={`px-4 py-2 bg-black text-white rounded disabled:opacity-50 `}
                  onClick={handleUploadAsset}
                  // disabled={isLastStep || !validation}
                >
                  Submit
                </button>
              )}
            </div>
            <div className="hidden xl:block absolute w-[60vh] top-0 left-0 right-0 bottom-0 mt-20">
              <div className="absolute inset-0 flex items-center rotate-90 ">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <Stepper
                activeStep={activeStep}
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                className="absolute inset-0 rotate-90"
              >
                <div>
                  <Step
                    onClick={() => setActiveStep(0)}
                    className={`relative z-30 flex items-center justify-center p-8 rounded-xl cursor-pointer -rotate-90
                ${
                  activeStep === 0
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
                    placeholder="0"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    1
                  </Step>
                </div>
                <div>
                  <Step
                    onClick={() => setActiveStep(1)}
                    className={`relative z-30 flex items-center justify-center p-8 rounded-xl cursor-pointer -rotate-90
                ${
                  activeStep === 1
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
                    placeholder="1"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    2
                  </Step>
                </div>
                <div>
                  <Step
                    onClick={() => setActiveStep(2)}
                    className={`relative z-30 flex items-center justify-center p-8 rounded-xl cursor-pointer -rotate-90
                ${
                  activeStep === 2
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
                    placeholder="2"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    3
                  </Step>
                </div>
              </Stepper>
            </div>
            <div className="relative flex xl:hidden my-5">
              <div className="absolute mt-5 w-full flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                placeholder="0"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                className=""
              >
                <div>
                  <Step
                    className={`relative z-30 flex items-center justify-center cursor-pointer
                ${
                  activeStep === 0
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
                    onClick={() => setActiveStep(0)}
                    placeholder="0"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    1
                  </Step>
                </div>
                <div>
                  <Step
                    className={`relative z-30 flex items-center justify-center cursor-pointer
                  ${
                    activeStep === 1
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                    onClick={() => setActiveStep(1)}
                    placeholder="1"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    2
                  </Step>
                </div>
                <div>
                  <Step
                    className={`relative z-30 flex items-center justify-center cursor-pointer
                  ${
                    activeStep === 2
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                    onClick={() => setActiveStep(2)}
                    placeholder="2"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    3
                  </Step>
                </div>
              </Stepper>
            </div>
            <div className="">{renderStepContent(activeStep)}</div>
          </div>
        </FormProvider>
      )}
    </div>
  );
};

export default Form;
