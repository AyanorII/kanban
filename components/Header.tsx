import { Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RootContext } from "../lib/context/StoreContext";
import { drawerWidth } from "./Layout";
import Logo from "./Logo";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
  isDarkMode: boolean;
};

const Header = observer(({ open, handleDrawerOpen, isDarkMode }: Props) => {
  const store = useContext(RootContext);
  const { currentBoard } = store.board;

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ backgroundColor: "background.default" }}
    >
      <Toolbar>
        <Box
          onClick={handleDrawerOpen}
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <Logo theme={isDarkMode ? "dark" : "light"} />
        </Box>
        <Typography variant="h6" component="h1" color="text.main">
          {currentBoard?.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
