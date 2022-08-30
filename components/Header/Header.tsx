import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Stack } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import * as React from "react";
import { Board } from "../../lib/types";
import { MEDIUM_GREY_COLOR, WHITE_COLOR } from "../../styles/theme";
import BoardList from "./BoardList";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type Props = {
  currentBoard: Board | null;
  boards: Board[];
  handleCurrentBoardChange: (id: number) => void;
};

export default function PersistentDrawerLeft({
  currentBoard,
  boards,
  handleCurrentBoardChange,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "background.dark" }}>
        <Toolbar sx={{ justifyContent: "space-between", paddingRight: 0 }}>
          <Stack flexDirection="row" alignItems="center">
            {!open && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
              >
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "background.dark",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <Image src="/logo-light.svg" width="152px" height="25px" />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{bgcolor: `${MEDIUM_GREY_COLOR}30`}}/>
        <Typography
          variant="body1"
          fontSize="1rem"
          fontWeight={600}
          letterSpacing="1.2px"
          textTransform="uppercase"
          color="text.secondary"
          marginLeft={2}
          gutterBottom
          marginTop={3}
        >{`All Boards (${boards.length})`}</Typography>
        <BoardList
          currentBoard={currentBoard}
          boards={boards}
          handleCurrentBoardChange={handleCurrentBoardChange}
        />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

const AddTaskButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      sx={{
        ".MuiButton-startIcon": {
          marginLeft: { xs: 0, md: -0.5 },
          marginRight: { xs: 0, md: 0.5 },
        },
      }}
    >
      <Typography
        variant="body1"
        fontWeight="inherit"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        Add new task
      </Typography>
    </Button>
  );
};
