import LogoutIcon from "@mui/icons-material/Logout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { styled, SxProps } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";
import { ModalType } from "../lib/types";
import { useBoardsQuery } from "../stores/api/boardsApi";
import { toggleNav } from "../stores/navSlice";
import { RootState } from "../stores/store";
import { logout } from "../stores/userSlice";
import {
  DANGER_COLOR,
  DANGER_LIGHT_COLOR,
  DARK_GREY_COLOR,
  MEDIUM_GREY_COLOR,
} from "../styles/theme";
import BoardList from "./Header/BoardList";
import Loading from "./Loading";
import Modal from "./Modal/Modal";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Nav = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.nav.open);
  const drawerWidth = useSelector((state: RootState) => state.nav.drawerWidth);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const { data: boards, isLoading } = useBoardsQuery(undefined, {
    skip: !accessToken,
  });

  const toggleNavbar = () => {
    dispatch(toggleNav());
  };

  const styles: SxProps = {
    width: drawerWidth,
    flexShrink: 0,

    "& .MuiDrawer-paper": {
      position: "fixed",
      width: drawerWidth,
      bgcolor: DARK_GREY_COLOR,
      boxSizing: "border-box",
      overflow: "visible",
      visibility: "visible !important",
    },
  };

  return (
    <>
      <LogoutModal open={isLogoutModalOpen} onClose={closeLogoutModal} />
      <Drawer sx={styles} variant="persistent" anchor="left" open={open}>
        <ExpandDrawerButton open={open} toggleNavbar={toggleNavbar} />
        <DrawerHeader>
          <IconButton onClick={toggleNavbar}>
            <Image src="/logo-light.svg" width="152px" height="25px" />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ bgcolor: `${MEDIUM_GREY_COLOR}30` }} />
        {isLoading && <Loading />}
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
        {/* -------------------------- Logout Button ------------------------- */}
        <Box mt="auto" width="100%">
          <UserInfo />
          <Divider sx={{ bgcolor: `${MEDIUM_GREY_COLOR}50`, mb: 3 }} />
          <Button
            variant="text"
            endIcon={<LogoutIcon />}
            size="large"
            onClick={openLogoutModal}
            fullWidth
            sx={{
              color: DANGER_LIGHT_COLOR,
              mb: 4,
              pl: 3,
              justifyContent: "start",

              "&:hover": { color: DANGER_COLOR },
            }}
          >
            Logout
          </Button>
        </Box>
        {/* -------------------------- Logout Button ------------------------- */}
      </Drawer>
    </>
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

const LogoutModal = ({ open, onClose }: ModalType) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    onClose();
    dispatch(logout());
    signOut(auth as any);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" mb={3}>
        Are you sure?
      </Typography>
      <Stack flexDirection="row" justifyContent="space-between" gap={3}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Stack>
    </Modal>
  );
};

const UserInfo = () => {
  const [user] = useAuthState(auth as any);

  const usernameOrEmail = user?.displayName || user?.email;

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1.5}
      ml={2}
      mb={2}
      overflow="hidden"
      maxWidth="100%"
    >
      <Avatar
        alt={usernameOrEmail!}
        src={user?.photoURL as string | undefined}
        imgProps={{ referrerPolicy: "no-referrer" }}
      />
      <Typography
        paragraph
        mb={0}
        maxWidth="100%"
        paddingRight={1}
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {usernameOrEmail}
      </Typography>
    </Stack>
  );
};
