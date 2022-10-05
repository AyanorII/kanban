import { Divider, IconButton, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
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

  const accessToken = useSelector((state: RootState) => state.user.accessToken)
  const { data: boards, isLoading, error } = useBoardsQuery(undefined, {
    skip: !accessToken
  });
  const toggleNavbar = () => {
    dispatch(toggleNav());
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: DARK_GREY_COLOR,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
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
