import DashboardIcon from "@mui/icons-material/Dashboard";
import { Container, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { BoardContext } from "../lib/context/BoardsContext";
import { Board as BoardInterface } from "../lib/types";
import { DrawerHeader, drawerWidth } from "./Layout";
import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

type Props = {
  isDarkMode: boolean;
  open: boolean;
  handleDrawerClose: () => void;
  toggleTheme: () => void;
};

const Navbar = observer(
  ({ isDarkMode, open, handleDrawerClose, toggleTheme }: Props) => {
    const store = useContext(BoardContext);

    const drawerStyles = {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    };

    return (
      <Drawer variant="persistent" anchor="left" open={open} sx={drawerStyles}>
        <DrawerHeader sx={{ justifyContent: "start", padding: 0 }}>
          <Container>
            <Stack
              justifyContent="center"
              alignItems="start"
              onClick={handleDrawerClose}
            >
              <Logo theme={isDarkMode ? "dark" : "light"} big />
            </Stack>
          </Container>
        </DrawerHeader>
        <Container>
          <Typography
            variant="body2"
            textTransform="uppercase"
            fontWeight={600}
            color="text.light"
            letterSpacing="2.4px"
            marginTop={2}
          >
            All boards ({store.boards.length})
          </Typography>
        </Container>
        <Stack justifyContent="space-between" height="100%" paddingBottom={3}>
          <List sx={{ paddingRight: "24px" }}>
            {store.boards.map((board, index) => {
              return <Board key={index} board={board} />;
            })}
          </List>
          <ThemeSwitch toggleTheme={toggleTheme} />
        </Stack>
      </Drawer>
    );
  }
);

export default Navbar;

type BoardProps = {
  board: BoardInterface;
};

const Board = observer(({ board }: BoardProps) => {
  const store = useContext(BoardContext);

  const { _id: id, name } = board;

  const isCurrentBoard = id === store.currentBoard?._id;

  const transition = { transition: "all 0.35s ease-in-out" };

  const liStyle = {
    padding: "0.25rem 0.5rem 0.25rem 0",
    position: "relative",
    "&:before": {
      borderRadius: "0 30px 30px 0",
      ...transition,
      content: "''",
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      width: isCurrentBoard ? "100%" : "0%",
      bgcolor: isCurrentBoard ? "primary.main" : "inherit",
    },
  };

  return (
    <ListItem
      onClick={() => store.setCurrentBoard(board)}
      disablePadding
      sx={liStyle}
    >
      <ListItemButton sx={{ gap: 2 }} disableRipple>
        <ListItemIcon sx={{ minWidth: "unset" }}>
          <DashboardIcon
            sx={{
              ...transition,
              color: isCurrentBoard ? "#FFF" : "text.light",
            }}
          />
        </ListItemIcon>
        <Typography
          variant="body1"
          fontWeight={600}
          color={isCurrentBoard ? "#FFF" : "text.light"}
          sx={transition}
        >
          {name}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
});
