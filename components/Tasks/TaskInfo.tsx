import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Card,
  Checkbox as MuiCheckbox,
  IconButton,
  InputLabel,
  Menu as MuiMenu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Column, Subtask, Task } from "../../lib/types";
import { useBoardColumnsQuery } from "../../stores/api/columnsApi";
import {
  useSubtasksQuery,
  useUpdateSubtaskCompletedMutation,
} from "../../stores/api/subtasksApi";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../stores/api/tasksApi";
import { RootState } from "../../stores/store";
import { DARK_BACKGROUND_COLOR, PRIMARY_COLOR } from "../../styles/theme";
import Modal from "../Modal";
import AddEditTaskModal from "./AddEditTaskModal";

type Props = {
  task: Task;
  completedSubtasks: Subtask[];
};

const TaskInfo = ({ task, completedSubtasks }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { title, description } = task;

  const { data: subtasks, isLoading, error } = useSubtasksQuery(task);
  const [updateTask] = useUpdateTaskMutation();

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const { data: columns } = useBoardColumnsQuery(currentBoard || skipToken);

  return (
    <>
      {/* ----------------------------- Header ----------------------------- */}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <IconButton onClick={handleMenu} sx={{ paddingRight: 0 }}>
          <MoreVertIcon sx={{ color: "text.secondary" }} />
        </IconButton>
        <Menu
          open={isMenuOpen}
          handleClose={handleClose}
          anchorEl={anchorEl}
          task={task}
        />
      </Stack>
      {/* ----------------------------- Header ----------------------------- */}
      {/*---------------------------- Description -------------------------- */}
      <Typography
        variant="body2"
        color="text.secondary"
        letterSpacing="0.6px"
        lineHeight={2}
        mb={2}
      >
        {description}
      </Typography>
      {/*---------------------------- Description -------------------------- */}
      <Stack gap={3}>
        {/* --------------------------- Subtasks --------------------------- */}
        {subtasks && (
          <div>
            <Typography variant="body1" mb={2} fontWeight={600}>
              Subtasks ({completedSubtasks.length} of {subtasks.length})
            </Typography>
            <Stack gap={1.5}>
              {/* Created a copy of subtasks to be able to sort it. Redux doesn't allow to mutate the state. */}
              {[...subtasks]
                .sort((a, b) => a.id - b.id)
                .map((subtask) => (
                  <Checkbox
                    key={subtask.id}
                    subtask={subtask}
                    subtasks={subtasks}
                    completedSubtasks={completedSubtasks}
                  />
                ))}
            </Stack>
          </div>
        )}
        {/* --------------------------- Subtasks --------------------------- */}
        {/* ------------------------ Current Status ------------------------ */}
        <Stack gap={2}>
          <InputLabel>Current Status</InputLabel>
          <TextField
            onChange={async (e) => {
              const newStatus = e.target.value;
              const response = await updateTask({
                ...task,
                status: newStatus,
              });
            }}
            select
            fullWidth
            defaultValue={task.status}
          >
            {columns?.map((column: Column) => {
              const { id, name } = column;

              return (
                <MenuItem key={id} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
        {/* ------------------------ Current Status ------------------------ */}
      </Stack>
    </>
  );
};

export default TaskInfo;

type CheckboxProps = {
  subtask: Subtask;
  subtasks: Subtask[];
  completedSubtasks: Subtask[];
};

const Checkbox = ({ subtask, subtasks }: CheckboxProps) => {
  const { completed, title } = subtask;
  const [checked, setChecked] = useState(completed);

  const [updateSubtask] = useUpdateSubtaskCompletedMutation();

  const handleClick = async () => {
    setChecked(!checked);

    try {
      await updateSubtask({
        ...subtask,
        completed: !checked,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  return (
    <Card sx={{ bgcolor: DARK_BACKGROUND_COLOR }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={1}
        p={1}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: `${PRIMARY_COLOR}80`,
          },
        }}
      >
        <MuiCheckbox checked={checked} sx={{ color: "white" }} />
        <Typography
          variant="body1"
          color={checked ? "text.secondary" : "text.primary"}
          fontWeight={600}
          mb={0}
          letterSpacing="0.5px"
          sx={{ textDecoration: checked ? "line-through" : "none" }}
        >
          {title}
        </Typography>
      </Stack>
    </Card>
  );
};

type MenuProps = {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  task: Task;
};

const Menu = ({ open, handleClose, anchorEl, task }: MenuProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [deleteTask, { isError, error }] = useDeleteTaskMutation();

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenEditTaskModal = () => {
    setIsEditTaskModalOpen(true);
  };

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  const handleDeleteTask = async (task: Task) => {
    const response = await deleteTask(task);

    if (isError) {
      console.error(error);
    } else {
      console.log(response);
    }
    handleCloseDeleteModal();
  };

  const handleClickEdit = () => {
    handleClose();
    handleOpenEditTaskModal();
  };

  const handleClickDelete = () => {
    handleClose();
    handleOpenDeleteModal();
  };

  return (
    <>
      <AddEditTaskModal
        open={isEditTaskModalOpen}
        onClose={handleCloseEditTaskModal}
        task={task}
      />
      <MuiMenu
        id="task-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: "150px" },
        }}
      >
        <MenuItem onClick={handleClickEdit}>
          <Typography paragraph fontWeight={600} color="text.secondary" mb={0}>
            Edit Task
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClickDelete}>
          <Typography paragraph fontWeight={600} color="error" mb={0}>
            Delete Task
          </Typography>
        </MenuItem>
      </MuiMenu>
      <Modal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        sx={{ width: { xs: "85vw", sm: 400, md: 600 } }}
      >
        <Typography variant="h5" color="error" fontWeight={700} mb={3}>
          Delete this task?
        </Typography>
        <Typography paragraph color="text.secondary" mb={3}>
          Are you sure you want to delete the &apos;{task.title}&apos; and its
          subtasks? This action cannot be reversed.
        </Typography>
        <Stack flexDirection="row" gap={2}>
          <Button
            onClick={() => {
              handleDeleteTask(task);
            }}
            variant="contained"
            color="error"
            fullWidth
            size="large"
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDeleteModal}
            fullWidth
            size="large"
          >
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
