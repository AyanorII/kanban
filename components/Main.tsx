import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { DARK_BACKGROUND_COLOR } from "../styles/theme";
import { DrawerHeader } from "./Nav";

type Props = {
  children: React.ReactNode;
};

const StyledMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => {
  const drawerWidth = useSelector((state: RootState) => state.nav.drawerWidth);
  return {
    backgroundColor: DARK_BACKGROUND_COLOR,
    minHeight: "100vh",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  };
});

const Main = ({ children }: Props) => {
  const open = useSelector((state: RootState) => state.nav.open);

  return (
    <StyledMain open={open}>
      <DrawerHeader />
      {children}
    </StyledMain>
  );
};

export default Main;
