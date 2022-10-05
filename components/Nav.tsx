import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { styled, SxProps } from "@mui/material/styles";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useBoardsQuery } from "../stores/api/boardsApi";
import { toggleNav } from "../stores/navSlice";
import { RootState } from "../stores/store";
import { DARK_GREY_COLOR, MEDIUM_GREY_COLOR } from "../styles/theme";
import BoardList from "./Header/BoardList";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Nav = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.nav.open);
  const drawerWidth = useSelector((state: RootState) => state.nav.drawerWidth);

  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const {
    data: boards,
    isLoading,
    error,
  } = useBoardsQuery(undefined, {
    skip: !accessToken,
  });

  const toggleNavbar = () => {
    dispatch(toggleNav());
  };

  const styles: SxProps = {
    width: drawerWidth,
    flexShrink: 0,

    "& .MuiDrawer-paper": {
      position: "relative",
      width: drawerWidth,
      bgcolor: DARK_GREY_COLOR,
      boxSizing: "border-box",
      overflow: "visible",
      visibility: "visible !important",
    },
  };

  return (
    <Drawer sx={styles} variant="persistent" anchor="left" open={open}>
      <ExpandDrawerButton open={open} toggleNavbar={toggleNavbar} />
      <DrawerHeader>
        <IconButton onClick={toggleNavbar}>
          <Image src="/logo-light.svg" width="152px" height="25px" />
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ bgcolor: `${MEDIUM_GREY_COLOR}30` }} />
      {isLoading && <div>Loading...</div>}
      {boards && (
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
        >{`All Boards (${boards?.length})`}</Typography>
      )}
      <BoardList />
    </Drawer>
  );
};

export default Nav;

type ExpandDrawerButtonProps = {
  open: boolean;
  toggleNavbar: () => void;
};

const ExpandDrawerButton = ({
  open,
  toggleNavbar,
}: ExpandDrawerButtonProps) => {
  const styles: SxProps = {
    padding: 2,
    borderRadius: "0 50% 50% 0",
    position: "absolute",
    bottom: "50px",
    right: "-65px",
  };

  return (
    <Button variant="contained" sx={styles} onClick={toggleNavbar}>
      {open ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </Button>
  );
};
