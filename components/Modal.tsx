import { Box, ClickAwayListener, Modal as MuiModal } from "@mui/material";
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

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const Modal = ({ children, open, onClose }: Props) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <ClickAwayListener onClickAway={onClose}>
        <Box sx={style}>{children}</Box>
      </ClickAwayListener>
    </MuiModal>
  );
};

export default Modal;
