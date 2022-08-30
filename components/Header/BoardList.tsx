import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { Board } from "../../lib/types";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../styles/theme";

type Props = {
  boards: Board[];
  handleCurrentBoardChange: (id: number) => void;
  currentBoard: Board | null;
};

const BoardList = ({
  boards,
  handleCurrentBoardChange,
  currentBoard,
}: Props) => {
  return (
    <List>
      {boards.map((board) => (
        <StyledListItem
          key={board.id}
          onClick={() => handleCurrentBoardChange(board.id)}
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
      <ListItem sx={{paddingLeft: 0}}>
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
  active?: boolean
};

const DashboardIcon = ({ active }: DashboardIconProps) => {
  return (
    <ListItemIcon sx={{ minWidth: "auto", marginRight: 2 }}>
      <DashboardOutlinedIcon
        sx={{
          color:
            active ? WHITE_COLOR : "text.secondary",
        }}
      />
    </ListItemIcon>
  );
};
