import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useBoardsQuery } from "../stores/api/boardsApi";
import { setCurrentBoard } from "../stores/boardsSlice";
import { DARK_BACKGROUND_COLOR } from "../styles/theme";
import Header from "./Header/Header";
import Main from "./Main";
import Nav from "./Nav";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const dispatch = useDispatch();
  const { data: boards, isLoading, error } = useBoardsQuery("");

  useEffect(() => {
    if (boards && !isLoading && !error) {
      dispatch(setCurrentBoard(boards[0]));
    }
  }, [isLoading, error]);

  return (
    <Box bgcolor={DARK_BACKGROUND_COLOR} sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Nav />
      <Main>{children}</Main>
    </Box>
  );
}
