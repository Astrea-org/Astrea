import React, { useState, useEffect } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import Details from "./steps/Details";
import Verification from "./steps/Verification";
import License from "./steps/License";

type FormProps = {};

const Form: React.FC<FormProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Details />;
      case 1:
        return <Verification />;
      case 2:
        return <License />;
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    console.log("activeStep:", activeStep);
  }, [activeStep]);
  return (
    <div className="w-full px-8 pt-28 bg-white flex flex-col min-h-screen">
      <div className="flex justify-end gap-10 h-10">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={isFirstStep}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={isLastStep}
        >
          Next
        </button>
      </div>
      <div className="absolute w-[60vh] top-0 left-0 right-0 bottom-0 mt-20">
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
      <div className="">{renderStepContent(activeStep)}</div>
    </div>
  );
};

export default Form;
