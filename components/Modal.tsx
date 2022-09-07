import {
  Box,
  Modal as MuiModal,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { ModalType } from "../lib/types";
import { DARK_GREY_COLOR } from "../styles/theme";

interface Props extends ModalType {
  children: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
}

const Modal = ({ children, open, onClose, sx }: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const style: SxProps<Theme> = {
    backgroundColor: DARK_GREY_COLOR,
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 350 : 400,
    borderRadius: "8px",
    boxShadow: 24,
    p: isMobile ? 2 : 4,
    maxHeight: "90vh",
    overflow: "auto",
    ...sx,
  };

  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
