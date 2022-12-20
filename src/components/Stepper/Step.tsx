import { Grid, Text } from "@nextui-org/react";
import React, { useCallback, useEffect } from "react";
import { UseFormRegister, UseFormReturn, UseFormWatch } from "react-hook-form";
import { OnboardingData } from "../../schemas/form";
import { Card } from "../Card";
import { ConnectForm } from "./ConnectForm";

interface StepProps {
  active: boolean;
  registerValidator: React.Dispatch<React.SetStateAction<boolean>>;
}

interface StepMeta {
  title: string;
  description?: string;
  triggerValidator?: keyof OnboardingData;
}

export interface StepDataProps {
  onBlur: () => void;
  register: UseFormRegister<OnboardingData>;
  watch: UseFormWatch<OnboardingData>;
  registerValidator: () => boolean;
}

function withStep(Component: any, meta: StepMeta) {
  return ({ active, registerValidator }: StepProps) => {
    return (
      <Card
        style={{ display: active ? "block" : "none" }}
      >
        <Text h4>{meta.title}</Text>
        <Grid.Container gap={2} direction="column">
          <ConnectForm>
            {({
              register,
              trigger,
              watch,
              formState: { errors },
            }: UseFormReturn<OnboardingData>) => {
              const onBlur = useCallback(() => {
                trigger(meta.triggerValidator).then((isValid) => {
                  registerValidator(isValid);
                });
              }, [trigger, registerValidator]);

              useEffect(() => {
                onBlur();
              }, []);

              useEffect(() => {
                onBlur();
              }, [active]);
              return (
                <Component
                  {...{ onBlur, register, registerValidator, watch }}
                ></Component>
              );
            }}
          </ConnectForm>
        </Grid.Container>
      </Card>
    );
  };
}

export default withStep;
