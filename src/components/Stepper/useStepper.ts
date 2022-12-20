import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { boolean, number, object, z, ZodFunction } from "zod";

type StepValidator = () => boolean;

interface Helpers {
  goToNextStep: () => void;
  goToPrevStep: () => void;
  reset: () => void;
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
  // setStep: Dispatch<SetStateAction<number>>;
  registerValidator: (step: number, validator: StepValidator) => void;
}

type setStepCallbackType = (step: number | ((step: number) => number)) => void;

const useStepPropsSchema = object({
  maxStep: number().default(4),
  stepValidator: z.function().args(number()).returns(boolean()).optional(),
});
type useStepProps = z.infer<typeof useStepPropsSchema>;

const defaultValidator = () => true;
const validatorMap = (maxSteps: number) => {
  const validator: Record<number, StepValidator> = {};
  for (let i = 0; i < maxSteps; i++) {
    validator[i + 1] = defaultValidator;
  }
  return validator;
};

/**
 *
 * use 1 based indexing for steps
 * @param props
 * @returns
 */
function useStep(props: useStepProps): [number, Helpers] {
  // Set Default Props
  const { maxStep } = useStepPropsSchema.parse(props);

  const [validator, setValidator] = useState<Record<number, StepValidator>>(
    validatorMap(maxStep)
  );

  const registerValidator = useCallback(
    (step: number, validatorFn: StepValidator) => {
      if (step <= maxStep) {
        setValidator((valid) => ({ ...valid, [step]: validatorFn }));
      }
    },
    [maxStep, setValidator]
  );

  const [currentStep, setCurrentStep] = useState(1);

  const stepValidator = useCallback(
    (step: number) => {
      return validator[step]();
    },
    [validator]
  );

  // Checks if next step is within range and if stepValidator returns true for current Step
  const canGoToNextStep = useMemo(() => {
    const flag = stepValidator ? stepValidator(currentStep) : true;
    return currentStep + 1 <= maxStep && flag;
  }, [currentStep, maxStep, stepValidator]);

  // Allow going to previous steps
  const canGoToPrevStep = useMemo(() => currentStep - 1 >= 1, [currentStep]);

  const setStep = useCallback<setStepCallbackType>(
    (step) => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step;

      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep);
        return;
      }

      throw new Error("Step not valid");
    },
    [maxStep, currentStep]
  );

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextStep]);

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoToPrevStep]);

  const reset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      // setStep,
      reset,
      registerValidator,
    },
  ];
}

export default useStep;
