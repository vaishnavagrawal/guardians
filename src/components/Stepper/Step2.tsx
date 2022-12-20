import { Spacer, Textarea } from '@nextui-org/react';
import withStep, { StepDataProps } from './Step';

const inputDefaults = {
  bordered: true,
  clearable: false,
  width: '100%',
  color: 'primary',
} as const;

function Step({ onBlur, register }: StepDataProps) {
  return (
    <>
      <Textarea
        aria-label='Allergies'
        {...register('medical.allergies')}
        // rounded
        {...inputDefaults}
        placeholder='Allergies'
        onBlur={onBlur}
      ></Textarea>
      <Spacer y={0.5} />
      <Textarea
        aria-label='Current Meds'
        {...register('medical.currentMedications')}
        {...inputDefaults}
        placeholder='Current Medications'
        onBlur={onBlur}
      ></Textarea>
      <Spacer y={0.5} />
      <Textarea
        aria-label='MEd Conditions'
        {...register('medical.medicalConditions')}
        {...inputDefaults}
        placeholder='Medical Conditions'
        onBlur={onBlur}
      ></Textarea>
    </>
  );
}

export const Step2 = withStep(Step, {
  title: 'Medical Information',
  triggerValidator: 'medical',
});
