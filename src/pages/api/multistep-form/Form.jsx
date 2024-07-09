import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <label className="text-white">
              First Name:
              <input type="text" name="firstName" />
            </label>
          </form>
        );
      case 1:
        return (
          <form>
            <label>
              Last Name:
              <input type="text" name="lastName" />
            </label>
          </form>
        );
      case 2:
        return (
          <form>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
          </form>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
      </Stepper>
      <div className="mt-16">{renderStepContent(activeStep)}</div>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
