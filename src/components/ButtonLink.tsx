import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { buttonClasses, ButtonSize, ButtonVariant } from "../utils/button";

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses(variant, size, fullWidth, className)}
      {...rest} />);


}