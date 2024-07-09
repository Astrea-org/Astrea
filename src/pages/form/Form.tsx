import React from "react";
import { Stepper, Step } from "@material-tailwind/react";
import Details from "./steps/Details";
import Verification from "./steps/Verification";
import License from "./steps/License";

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const renderStepContent = (step: any) => {
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
    <div className="w-full py-4 px-8 pt-28">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <Step
          onClick={() => setActiveStep(0)}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          1
        </Step>
        <Step
          className="bg-black"
          onClick={() => setActiveStep(1)}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          2
        </Step>
        <Step
          onClick={() => setActiveStep(2)}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          3
        </Step>
      </Stepper>
      <div className="mt-6">{renderStepContent(activeStep)}</div>
      <div className="mt-16 flex justify-between">
        <button
          className="bg-white"
          onClick={handlePrev}
          disabled={isFirstStep}
        >
          Prev
        </button>
        <button onClick={handleNext} disabled={isLastStep} className="bg-white">
          Next
        </button>
      </div>
    </div>
  );
}
