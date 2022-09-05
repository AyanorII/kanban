import { Box, Modal as MuiModal } from "@mui/material";
import { ModalType } from "../lib/types";
import { DARK_GREY_COLOR } from "../styles/theme";

const style = {
  backgroundColor: DARK_GREY_COLOR,
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface Props extends ModalType {
  children: React.ReactNode;
}

const Modal = ({ children, open, onClose }: Props) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
