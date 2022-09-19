import CloseIcon from "@mui/icons-material/Close";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import {
  Button,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Board, ModalType } from "../../lib/types";
import {
  BoardPayload,
  useBoardsQuery,
  useCreateBoardMutation,
} from "../../stores/api/boardsApi";
import { setCurrentBoard } from "../../stores/boardsSlice";
import { RootState } from "../../stores/store";
import {
  MEDIUM_GREY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from "../../styles/theme";
import Input from "../Input";
import Modal from "../Modal";

const BoardList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const { data: boards } = useBoardsQuery();

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const handleClick = (board: Board) => {
    if (window) {
      window.localStorage.setItem("currentBoard", JSON.stringify(board));
    }

    dispatch(setCurrentBoard(board));
  };

  return (
    <>
      <CreateBoardModal open={open} onClose={handleClose} />
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

const CreateBoardModal = ({ open, onClose }: ModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BoardPayload>();

  const { fields, append, remove } = useFieldArray<BoardPayload>({
    control,
    name: "columns",
  });

  const [createBoard] = useCreateBoardMutation();

  const onSubmit = async (data: BoardPayload): Promise<void> => {
    const response = await createBoard(data);
    reset();
    onClose();
  };

  const COLUMNS_PLACEHOLDERS = [
    "e.g Todo",
    "e.g Doing",
    "e.g Done",
    "e.g Urgent",
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" mb={3}>
        Add New Board
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          <Input
            name="name"
            control={control}
            label="Board Name"
            error={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            rules={{
              required: {
                value: true,
                message: "Board name is required.",
              },
            }}
            placeholder="e.g Web Design"
          />
          <Stack gap={1}>
            <InputLabel>Columns</InputLabel>
            {fields.map((field, index) => (
              <Stack key={field.id} flexDirection="row" gap={1}>
                <Controller
                  control={control}
                  name={`columns.${index}`}
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      fullWidth
                      placeholder={`e.g. ${
                        COLUMNS_PLACEHOLDERS[
                          index % COLUMNS_PLACEHOLDERS.length
                        ]
                      }`}
                      value={controllerField.value.title}
                    />
                  )}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => remove(index)}
                  sx={{ paddingRight: 0 }}
                >
                  <CloseIcon sx={{ color: MEDIUM_GREY_COLOR }} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              append({
                title: "",
              })
            }
          >
            + Add New Column
          </Button>
          <Button variant="contained" type="submit">
            Create New Board
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

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
