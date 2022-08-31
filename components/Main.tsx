import React from 'react'
import { styled } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { DrawerHeader } from './Nav';
import { DARK_BACKGROUND_COLOR } from '../styles/theme';

type Props = {
  children: React.ReactNode;
}

const Main = ({children}: Props) => {
  const drawerWidth = useSelector((state: RootState) => state.nav.drawerWidth);

  const StyledMain = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
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
  }));

  return (
    <StyledMain>
      <DrawerHeader />
      {children}
    </StyledMain>
  )
}

export default Main
