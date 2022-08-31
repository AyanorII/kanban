import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../../stores/navSlice";
import { RootState } from "../../stores/store";
import { DARK_GREY_COLOR, WHITE_COLOR } from "../../styles/theme";
import AddTaskButton from "../Tasks/AddTaskButton";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

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

const Header = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );
  const open = useSelector((state: RootState) => state.nav.open);

  const toggleNavbar = () => {
    dispatch(toggleNav());
  };

  return (
    <AppBar position="fixed" open={open} sx={{ bgcolor: DARK_GREY_COLOR }}>
      <Toolbar sx={{ justifyContent: "space-between", paddingRight: 0 }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          onClick={toggleNavbar}
          sx={{ cursor: "pointer" }}
        >
          {!open && (
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <Image src="/logo-mobile.svg" width="25px" height="25px" />
            </IconButton>
          )}
          <Typography
            variant="h5"
            fontWeight={600}
            letterSpacing="0.75px"
            color="text.primary"
            marginLeft="1rem"
          >
            {currentBoard?.name}
          </Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <AddTaskButton />
          <IconButton>
            <MoreVertIcon sx={{ color: WHITE_COLOR }} />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
