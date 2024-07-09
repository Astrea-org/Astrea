import React, { useState, useEffect } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import Details from "./steps/Details";
import Verification from "./steps/Verification";
import License from "./steps/License";

type FormProps = {};

const Form: React.FC<FormProps> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);

  useEffect(() => {
    setIsLastStep(activeStep === 2);
    setIsFirstStep(activeStep === 0);
  }, [activeStep]);

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

  return (
    <div className="w-full py-4 px-8 pt-28 bg-white">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-200"></div>
        </div>
        <Stepper activeStep={activeStep}>
          {["1", "2", "3"].map((label, index) => (
            <Step
              key={index}
              onClick={() => setActiveStep(index)}
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${
                activeStep === index
                  ? "bg-black text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {label}
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="mt-6">{renderStepContent(activeStep)}</div>
      <div className="mt-16 flex justify-between">
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
    </div>
  );
};

export default Form;
