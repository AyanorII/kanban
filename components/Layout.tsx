import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: "100vh",
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

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type Props = {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const Layout = observer(({ children, isDarkMode, toggleTheme }: Props) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        isDarkMode={isDarkMode}
      />
      <Navbar
        open={open}
        handleDrawerClose={handleDrawerClose}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Main open={open} sx={{ bgcolor: "body.background", overflow: "auto" }}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
});

export default Layout;
