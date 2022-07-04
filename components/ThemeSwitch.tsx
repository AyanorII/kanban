import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Container, Grid, Paper, Stack, Switch } from "@mui/material";

type Props = {
  toggleTheme: () => void;
};

const ThemeSwitch = ({toggleTheme}: Props) => {
  return (
    <Container>
      <Paper sx={{ width: "100%", bgcolor: "body.background" }}>
        <Stack alignItems="center" justifyContent="center">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs="auto" alignItems="center" display="flex">
              <WbSunnyIcon sx={{ color: "text.light" }} />
            </Grid>
            <Grid item xs="auto">
              <Switch onChange={toggleTheme} sx={{ bgcolor: "primary" }} />
            </Grid>
            <Grid item xs="auto" alignItems="center" display="flex">
              <NightlightRoundIcon sx={{ color: "text.light" }} />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ThemeSwitch;
