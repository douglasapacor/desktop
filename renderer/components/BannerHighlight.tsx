import { Box, Grid } from "@mui/material";
import he from "he";
import parse from "html-react-parser";
import { FC } from "react";
const BannerHighlight: FC<{
  textImg: string;
}> = (props) => {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
      <Box
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {parse(he.decode(props.textImg))}
      </Box>
    </Grid>
  );
};

export default BannerHighlight;
