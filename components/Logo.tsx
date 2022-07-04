import logoDark from "../public/assets/logo-dark.svg";
import logoLight from "../public/assets/logo-light.svg";
import logoMobile from "../public/assets/logo-mobile.svg";

import React from 'react'
import Image from "next/image";
import { Theme } from "../lib/types";
import { useMediaQuery } from "@mui/material";

type Props = {
  theme: Theme;
  big?: boolean;
}

const Logo = ({theme, big}: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  let logo: string;
  let width: string;

  if (isMobile && !big ) {
    logo = logoMobile;
    width = "25px";
  } else {
    logo = theme === "dark" ? logoLight : logoDark;
    width = "152px";
  }

  return (
    <Image src={logo} width={width} height="25px" alt="kanban"/>
  )
}

export default Logo
