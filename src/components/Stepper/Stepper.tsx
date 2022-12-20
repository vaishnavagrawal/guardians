import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Link } from '@nextui-org/react';
import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  defaultOnboardingData,
  OnboardingData,
  onboardingSchema,
} from '../../schemas/form';
import { profileAtom } from '../../store/store.atom';
import { Button } from '../Button';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import useStep from './useStepper';

// interface OnboardingFormData {
//   basic: NestedValue<z.infer<typeof >>
// }

function Stepper() {
  const [currentStep, helpers] = useStep({ maxStep: 4 });

  const [profile, setProfile] = useAtom(profileAtom);

  const formControl = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: profile,
    // reValidateMode: "onChange",
    // criteriaMode: "all",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    // reset,
  } = helpers;

  const save = () => {
    console.log('formdata' , formControl.getValues())
    setProfile(formControl.getValues())
    navigate('/profile')
  };

  return (
    <Grid.Container
      css={{ mx: 'auto' }}
      style={{ width: '480px', maxWidth: '100%' }}
    >
      <FormProvider {...formControl}>
        <Step1 active={currentStep === 1} registerValidator={setIsFormValid} />
        <Step2 active={currentStep === 2} registerValidator={setIsFormValid} />
        <Step3 active={currentStep === 3} registerValidator={setIsFormValid} />
        <Step4 active={currentStep === 4} registerValidator={setIsFormValid} />
      </FormProvider>
      <Grid.Container
        css={{ my: '$8', mx: '$12' }}
        gap={2}
        justify='space-between'
      >
        <Button disabled={!canGoToPrevStep} onClick={goToPrevStep}>
          Previous
        </Button>
        {formControl.formState.isValid && <Button onClick={save}>Save</Button>}
        <Button
          disabled={!(canGoToNextStep && isFormValid)}
          onClick={goToNextStep}
        >
          Next
        </Button>
      </Grid.Container>
      {/* <button onClick={reset}>Reset</button> */}
      {/* <button onClick={() => setStep(2)}>Set to step 2</button> */}
    </Grid.Container>

    // <FormProvider {...methods}>
    //   <form>
    //     <input {...methods.register("name")}></input>
    //   </form>
    // </FormProvider>
  );
}

export default Stepper;
