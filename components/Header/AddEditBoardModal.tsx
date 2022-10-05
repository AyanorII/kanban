import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Board, ModalType, ResponseError } from "../../lib/types";
import {
  BoardPayload,
  useCreateBoardMutation,
  useUpdateBoardMutation
} from "../../stores/api/boardsApi";
import {
  useBoardColumnsQuery,
  useDeleteColumnMutation
} from "../../stores/api/columnsApi";
import { setCurrentBoard } from "../../stores/boardsSlice";
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
    if (board) {
      setValue("name", board.name);
    }
  }, [board]);

  useEffect(() => {
    if (columns?.length) {
      remove();
      columns.forEach(({ name, id }) => {
        append({ name, id });
      });
    }
  }, [columns, isLoading]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    setError,
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
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteColumn] = useDeleteColumnMutation();

  const removeColumn = async (index: number, id: number) => {
    remove(index);
    await deleteColumn(id);
  };

  const onSubmit = async (data: BoardPayload): Promise<void> => {
    console.log(data);
    try {
      if (isEditing) {
        const updatedBoard = await updateBoard({
          id: board!.id,
          ...data,
        }).unwrap();
        dispatch(setCurrentBoard(updatedBoard));
      } else {
        const createdBoard = await createBoard(data).unwrap();
      }
      reset();
      onClose();
    } catch (err) {
      const { data: error, status } = err as ResponseError;
      setError("name", { message: error.message });
    }
  };

  const COLUMNS_PLACEHOLDERS = [
    "e.g Todo",
    "e.g Doing",
    "e.g Done",
    "e.g Urgent",
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" mb={3} onClick={() => remove()}>
        {isEditing ? "Edit Board" : "Add New Board "}
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
                        value={controllerField.value.name}
                        onChange={(e) =>
                          setValue(`columns.${index}`, {
                            ...getValues(`columns.${index}`),
                            name: e.currentTarget.value,
                          })
                        }
                      />
                    )}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      removeColumn(index, getValues(`columns.${index}`)!.id!)
                    }
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
                  name: "",
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
