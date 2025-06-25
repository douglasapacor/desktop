import { Grid } from "@mui/material";
import type { FC } from "react";
import { useAppStateContext } from "../state";
import InicioView from "../views/Inicio";
import BoletinsView from "../views/boletins";
import ClassificadoresView from "../views/classificadores";
import OutrosView from "../views/outros";

const ViewManager: FC = () => {
  const context = useAppStateContext();

  const Render = () => {
    switch (context.view.current) {
      case "inicio":
        return <InicioView />;
      case "boletins":
        return <BoletinsView />;
      case "classificadores":
        return <ClassificadoresView />;
      case "outros":
        return <OutrosView />;
      default:
        return <>nadaa</>;
    }
  };
  return (
    <Grid container>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <div>{Render()}</div>
      </Grid>
    </Grid>
  );
};

export default ViewManager;
