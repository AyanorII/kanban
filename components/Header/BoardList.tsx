import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Board } from "../../lib/types";
import { useBoardsQuery } from "../../stores/api/boardsApi";
import { useBoardColumnsQuery } from "../../stores/api/columnsApi";
import {
  setCurrentBoard,
  setCurrentBoardColumn,
} from "../../stores/boardsSlice";
import { RootState } from "../../stores/store";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/theme";

const BoardList = () => {
  const dispatch = useDispatch();

  const { data: boards, isLoading, error } = useBoardsQuery();

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const { data: columns } = useBoardColumnsQuery(currentBoard || skipToken);

  const handleClick = (board: Board) => {
    if (window) {
      window.localStorage.setItem("currentBoard", JSON.stringify(board));
    }

    dispatch(setCurrentBoard(board));
  };

  useEffect(() => {
    if (columns) {
      dispatch(setCurrentBoardColumn(columns!));
    }

    if (window && columns) {
      window.localStorage.setItem("columns", JSON.stringify(columns));
    }
  }, [currentBoard, columns]);

  return (
    <List>
      {columns &&
        boards?.map((board: Board) => (
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
      <ListItem sx={{ paddingLeft: 0 }}>
        <ListItemButton disableRipple>
          <DashboardIcon />
          <Typography variant="body1" fontWeight={600} color="primary">
            + Create new board
          </Typography>
        </ListItemButton>
      </ListItem>
    </List>
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
