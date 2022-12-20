import { Button as DefaultButton, styled } from "@nextui-org/react";

export const Button = styled(DefaultButton, {
  width: "auto",
});

Button.defaultProps = {
  auto: true,
};
