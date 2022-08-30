import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Board } from "../../lib/types";
import { setCurrentBoard } from "../../stores/boardSlice";
import { RootState } from "../../stores/store";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/theme";

const BoardList = () => {
  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.boards.boards);
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const handleClick = (board: Board) => {
    dispatch(setCurrentBoard(board));
  }

  return (
    <List>
      {boards.map((board) => (
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

  &.active {
    color: ${WHITE_COLOR};

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
