import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useBoardColumnsQuery } from "../../stores/api/columnsApi";
import { RootState } from "../../stores/store";
import AddEditTaskModal from "./AddEditTaskModal";
import { MEDIUM_GREY_COLOR } from "../../styles/theme";

const AddTaskButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const { data: columns } = useBoardColumnsQuery(currentBoard || skipToken);

  return (
    <>
      <AddEditTaskModal open={open} onClose={handleClose} />
      {columns && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          disabled={!columns.length}
          startIcon={<AddIcon />}
          sx={{
            ".MuiButton-startIcon": {
              marginLeft: { xs: 0, md: -0.5 },
              marginRight: { xs: 0, md: 0.5 },
            },
            "&:disabled": {
              backgroundColor: MEDIUM_GREY_COLOR,
            },
          }}
        >
          <Typography
            variant="body1"
            fontWeight="inherit"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Add new task
          </Typography>
        </Button>
      )}
    </>
  );
};

export default AddTaskButton;
