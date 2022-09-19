import { Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ModalType } from "../../lib/types";
import {
  AddColumnPayload,
  useAddColumnMutation,
} from "../../stores/api/columnsApi";
import { RootState } from "../../stores/store";
import { DARK_GREY_COLOR } from "../../styles/theme";
import Input from "../Input";
import Modal from "../Modal/Modal";
import { COLUMN_WIDTH } from "./Column";

type Props = {};

const AddColumn = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        onClick={handleOpen}
        sx={{
          bgcolor: DARK_GREY_COLOR,
          width: COLUMN_WIDTH,
          marginTop: "48px",
          cursor: "pointer",
        }}
      >
        <Stack height="100%" justifyContent="center" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            + New Column
          </Typography>
        </Stack>
      </Paper>
      <AddColumnModal open={open} onClose={handleClose} />
    </>
  );
};
export default AddColumn;

const AddColumnModal = ({ open, onClose }: ModalType) => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const defaultValues: AddColumnPayload = {
    name: "",
    boardId: currentBoard?.id || 0,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    currentBoard && setValue("boardId", currentBoard.id);
  }, [currentBoard]);

  const [addColumn, { error, isLoading }] = useAddColumnMutation();

  const onSubmit = async (data: AddColumnPayload) => {
    console.log(data);

    await addColumn(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" mb={3}>
        Add new column
      </Typography>
      {currentBoard && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <Input
              control={control}
              name="name"
              label="Column name"
              error={Boolean(errors.name)}
              errorMessage={errors.name?.message}
              placeholder="Urgent tasks"
              rules={{
                required: {
                  value: true,
                  message: "Column name can't be blank",
                },
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add column
            </Button>
          </Stack>
        </form>
      )}
    </Modal>
  );
};
