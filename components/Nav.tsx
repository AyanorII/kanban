import React from 'react'
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { Divider, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { DARK_GREY_COLOR, MEDIUM_GREY_COLOR } from '../styles/theme';
import BoardList from './Header/BoardList';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { toggleNav } from '../stores/navSlice';

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type Props = {

};

const Nav = (props: Props) => {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.nav.open)
  const drawerWidth = useSelector((state: RootState) => state.nav.drawerWidth);
  const boards = useSelector((state: RootState) => state.boards.boards);

  const toggleNavbar = () => {
    dispatch(toggleNav())
  }

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
      <BoardList />
    </Drawer>
  );
}

export default Nav
