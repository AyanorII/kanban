import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AddEditTaskModal from "./AddEditTaskModal";

const AddTaskButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddEditTaskModal open={open} onClose={handleClose} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<AddIcon />}
        sx={{
          ".MuiButton-startIcon": {
            marginLeft: { xs: 0, md: -0.5 },
            marginRight: { xs: 0, md: 0.5 },
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
    </>
  );
};

export default AddTaskButton;
