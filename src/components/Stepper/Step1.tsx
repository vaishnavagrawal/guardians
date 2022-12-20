import { Input, Spacer } from '@nextui-org/react';
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
        aria-label='Name'
        {...register('basic.name')}
        // rounded
        {...inputDefaults}
        placeholder='Name'
        onBlur={onBlur}
      ></Input>
      <Spacer y={0.5}></Spacer>
      <Input
        aria-label='Email'
        {...register('basic.email')}
        {...inputDefaults}
        type='email'
        placeholder='Email'
        onBlur={onBlur}
      ></Input>
      <Spacer y={0.5}></Spacer>

      <Input
        aria-label='Mobile'
        {...register('basic.mobile')}
        {...inputDefaults}
        placeholder='Mobile'
        onBlur={onBlur}
      ></Input>
    </>
  );
}

export const Step1 = withStep(Step, {
  title: 'Basic Information',
  triggerValidator: 'basic',
});
