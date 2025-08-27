import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import he from "he";
import parse from "html-react-parser";
import { FC } from "react";
const Highlight: FC<{ img: string; label: string; titulo: string }> = ({
  ...props
}) => {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
      <Card elevation={3}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={props.img} alt="" />
        </CardActionArea>
        <CardContent sx={{ height: 160 }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.label}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {parse(he.decode(props.titulo).replace(/<\/?p>/g, ""))}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Highlight;
