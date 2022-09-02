import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddTaskButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
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
  );
};

export default AddTaskButton
