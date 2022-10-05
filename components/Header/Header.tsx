import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useBoardsQuery,
  useDeleteBoardMutation,
} from "../../stores/api/boardsApi";
import { resetCurrentBoard, setCurrentBoard } from "../../stores/boardsSlice";
import { toggleNav } from "../../stores/navSlice";
import { RootState } from "../../stores/store";
import { DARK_GREY_COLOR, WHITE_COLOR } from "../../styles/theme";
import Logo from "../Logo";
import DeleteModal from "../Modal/DeleteModal";
import AddTaskButton from "../Tasks/AddTaskButton";
import AddEditBoardModal from "./AddEditBoardModal";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const open = useSelector((state: RootState) => state.nav.open);
  const drawerWidth = useSelector((state: RootState) => state.nav.drawerWidth);

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const { data: boards } = useBoardsQuery(undefined, {
    skip: !accessToken,
  });

  const toggleNavbar = () => {
    dispatch(toggleNav());
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      drawerWidth={drawerWidth}
      sx={{ bgcolor: DARK_GREY_COLOR }}
    >
      <Toolbar sx={{ justifyContent: "space-between", paddingRight: 0 }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          onClick={toggleNavbar}
          sx={{ cursor: "pointer" }}
        >
          {!open && (
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <Logo mobile/>
            </IconButton>
          )}
          {currentBoard && (
            <Typography
              variant="h5"
              letterSpacing="0.75px"
              color="text.primary"
              marginLeft="1rem"
            >
              {currentBoard.name}
            </Typography>
          )}
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <AddTaskButton />
          <IconButton onClick={handleClick} disabled={boards?.length === 0}>
            <MoreVertIcon sx={{ color: WHITE_COLOR }} />
          </IconButton>
          <HeaderMenu
            open={menuOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

type MenuProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
};

const HeaderMenu = ({ anchorEl, open, onClose }: MenuProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const { data: boards } = useBoardsQuery(undefined, {
    skip: !accessToken,
  });
  const [deleteBoard, status] = useDeleteBoardMutation();
  const dispatch = useDispatch();

  /* ------------------------------ Edit modal ------------------------------ */
  const handleOpenEditModal = () => {
    setEditModalOpen(true);
    onClose();
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  const handleEditClick = () => {
    handleOpenEditModal();
    onClose();
  };
  /* ------------------------------ Edit modal ------------------------------ */

  /* ----------------------------- Delete modal ----------------------------- */
  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
    onClose();
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    const response = await deleteBoard(currentBoard!);

    if (boards && boards.length) {
      dispatch(setCurrentBoard(boards[0]));
    } else {
      dispatch(setCurrentBoard(null));
    }

    handleCloseDeleteModal();
  };
  /* ----------------------------- Delete modal ----------------------------- */

  return (
    <>
      {currentBoard && (
        <AddEditBoardModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          board={currentBoard || undefined}
        />
      )}
      <DeleteModal
        open={deleteModalOpen}
        onClose={onClose}
        onDelete={handleDelete}
        onCancel={handleCloseDeleteModal}
        title="Delete this board?"
        description={`Are you sure you want to delete the '${currentBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { bgcolor: DARK_GREY_COLOR } }}
      >
        <MenuItem onClick={handleEditClick}>Edit Board</MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>
          <Typography paragraph mb={0} fontWeight={600} color="error">
            Delete Board
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
