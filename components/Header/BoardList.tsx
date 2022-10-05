import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Board } from "../../lib/types";
import { useBoardsQuery } from "../../stores/api/boardsApi";
import { setCurrentBoard } from "../../stores/boardsSlice";
import { RootState } from "../../stores/store";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/theme";
import AddEditBoardModal from "./AddEditBoardModal";

const BoardList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const { data: boards } = useBoardsQuery(undefined, {
    skip: !accessToken,
  });

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const handleClick = (board: Board) => {
    dispatch(setCurrentBoard(board));
  };

  return (
    <>
      <AddEditBoardModal open={open} onClose={handleClose} />
      <List>
        {boards?.map((board: Board) => (
          <StyledListItem
            key={board.id}
            onClick={() => handleClick(board)}
            disablePadding
            sx={{ position: "relative" }}
            className={currentBoard?.id === board.id ? "active" : ""}
          >
            <ListItemButton disableRipple>
              <DashboardIcon active={currentBoard?.id === board.id} />
              <Typography
                variant="body1"
                fontWeight={600}
                color={
                  currentBoard?.id === board.id ? WHITE_COLOR : "text.secondary"
                }
              >
                {board.name}
              </Typography>
            </ListItemButton>
          </StyledListItem>
        ))}
        <StyledListItem sx={{ padding: 0 }} onClick={handleOpen}>
          <ListItemButton disableRipple>
            <DashboardIcon />
            <Typography variant="body1" fontWeight={600} color="primary">
              + Create new board
            </Typography>
          </ListItemButton>
        </StyledListItem>
      </List>
    </>
  );
};

export default BoardList;

const StyledListItem = styled(ListItem)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0 30px 30px 0;
    width: 0;
    transition: all 0.5s;
  }

  &:hover p {
    color: ${PRIMARY_COLOR};
  }

  &:hover::before {
    background-color: ${WHITE_COLOR};
    width: 90%;
  }

  &.active {
    p {
      color: ${WHITE_COLOR};
    }

    &::before {
      background-color: ${PRIMARY_COLOR};
      width: 90%;
    }
  }
`;

type DashboardIconProps = {
  active?: boolean;
};

const DashboardIcon = ({ active }: DashboardIconProps) => {
  return (
    <ListItemIcon sx={{ minWidth: "auto", marginRight: 2 }}>
      <DashboardOutlinedIcon
        sx={{
          color: active ? WHITE_COLOR : "text.secondary",
        }}
      />
    </ListItemIcon>
  );
};
