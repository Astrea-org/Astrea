import { IoMdInformationCircle } from "react-icons/io";
import { liscData } from "../../../utils/data/liscData";
import { useFormContext } from "../FormContext";
import { useState } from "react";

export default function License() {
  const { formMethods, formData, setFormData } = useFormContext();
  const { register, handleSubmit } = formMethods;
  const [selectedLicense, setSelectedLicense] = useState(
    formData.details.license || ""
  );
  console.log(formData);

  const onSubmit = () => {
    setFormData({
      ...formData,
      details: { ...formData.details, license: selectedLicense },
    });
    console.log("Selected License:", selectedLicense);
  };

  const handleSelection = (title: string) => {
    setSelectedLicense(title);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center font-poppinsRegular">
        <div className="bg-white shadow-2xl px-3 py-6 w-[700px] border border-gray-300 rounded-lg">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <p className="text-lg font-bold">Universal Data License</p>
              {/* <p className="text-lg">Lice</p> */}
            </div>
            <div>
              {liscData.map((item: any) => (
                <div
                  key={item.title}
                  className={`border border-gray-600 p-3 mt-6 rounded-lg hov ${
                    selectedLicense === item.title
                      ? "bg-[#454FA8] text-white"
                      : ""
                  }`}
                  onClick={() => handleSelection(item.title)}
                >
                  <h1 className="font-bold">{item.title}</h1>
                  <p className="mt-2">{item.desc}</p>
                  <input
                    type="radio"
                    value={item.title}
                    checked={selectedLicense === item.title}
                    {...register("license")}
                    onChange={() => handleSelection(item.title)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-lg font-bold mt-3 flex">
                Banner{" "}
                <span className="mt-[6px] ml-3">
                  <IoMdInformationCircle />
                </span>
              </p>
              <input type="file" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
