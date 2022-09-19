import { Button, Stack, Typography } from "@mui/material";
import { ModalType } from "../../lib/types";
import Modal from "./Modal";

type DeleteModalProps = {
  onDelete: () => void;
  onCancel: () => void;
  title: string;
  description: string;
} & ModalType;

const DeleteModal = ({
  open,
  onClose,
  onDelete,
  onCancel,
  title,
  description,
}: DeleteModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ width: { xs: "85vw", sm: 400, md: 600 } }}
    >
      <Typography variant="h4" color="error" fontWeight={700} mb={3}>
        {title}
      </Typography>
      <Typography paragraph color="text.secondary" mb={3}>
        {description}
      </Typography>
      <Stack flexDirection="row" gap={2}>
        <Button
          onClick={onDelete}
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
          onClick={onCancel}
          fullWidth
          size="large"
        >
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default DeleteModal;
