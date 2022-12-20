import { useEffect } from "react";
import Profile from "../Profile";

import { OnboardingData } from "../../schemas/form";
import withStep, { StepDataProps } from "./Step";

const inputDefaults = {
  bordered: true,
  clearable: false,
  width: "100%",
  color: "primary",
} as const;

function Step({ watch, onBlur }: StepDataProps) {
  useEffect(() => {
    onBlur();
  }, []);

  const data: OnboardingData = {
    basic: watch("basic"),
    medical: watch("medical"),
    contact: watch("contact"),
  };
  return (
    <>
      <Profile {...data} />
    </>
  );
}

export const Step4 = withStep(Step, {
  title: "Review",
});
