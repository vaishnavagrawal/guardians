import { Input } from '@nextui-org/react';
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
      <Input
        aria-label='Emerency'
        {...register('contact.emergency')}
        {...inputDefaults}
        placeholder='Emergency'
        onBlur={onBlur}
      ></Input>
    </>
  );
}

export const Step3 = withStep(Step, {
  title: 'Emergency Contact',
  triggerValidator: 'contact',
});
