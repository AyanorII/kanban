import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DARK_BACKGROUND_COLOR } from "../styles/theme";
import Header from "./Header/Header";
import Main from "./Main";
import Nav from "./Nav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box bgcolor={DARK_BACKGROUND_COLOR} sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Nav />
      <Main>{children}</Main>
    </Box>
  );
}
