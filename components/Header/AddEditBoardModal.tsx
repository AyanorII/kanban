import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Board, ModalType } from "../../lib/types";
import {
  BoardPayload,
  useCreateBoardMutation,
} from "../../stores/api/boardsApi";
import { useBoardColumnsQuery } from "../../stores/api/columnsApi";
import { setCurrentBoard } from "../../stores/boardsSlice";
import { RootState } from "../../stores/store";
import { MEDIUM_GREY_COLOR } from "../../styles/theme";
import Input from "../Input";
import Modal from "../Modal/Modal";

type Props = {
  board?: Board | undefined;
} & ModalType;

const AddEditBoardModal = ({ open, onClose, board }: Props) => {
  const defaultValues: BoardPayload = {
    name: board?.name || "",
    columns: [],
  };

  const { data: columns, isLoading } = useBoardColumnsQuery(board || skipToken);

  useEffect(() => {
    if (columns && columns.length) {
      defaultValues.columns = columns.map((column) => ({
        title: column.name,
      }));
    }
  }, [columns]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BoardPayload>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray<BoardPayload>({
    control,
    name: "columns",
  });

  const isEditing = Boolean(board);
  const dispatch = useDispatch();

  const [createBoard, result] = useCreateBoardMutation();
  // const [updateBoard] = useCreateBoardMutation();

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const onSubmit = async (data: BoardPayload): Promise<void> => {
    try {
      const createdBoard = await createBoard(data).unwrap();
      dispatch(setCurrentBoard(createdBoard));
    } catch (err) {
      console.log(err);
    }

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
        {isEditing ? "Edit Board" : "Add New Board"}
      </Typography>
      {!isLoading && (
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
              {isEditing ? "Edit Board" : "Create New Board"}
            </Button>
          </Stack>
        </form>
      )}
    </Modal>
  );
};

export default AddEditBoardModal;
