import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";

const InicioView = () => {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [enderecos, setEnderecos] = useState<string[]>([]);

  useLayoutEffect(() => {
    setTotal(3);
    setEnderecos([
      "https://inrpublicacoes.com.br/site/banners/1747150011.jpg",
      "https://inrpublicacoes.com.br/site/banners/1710425165.jpg",
      "https://inrpublicacoes.com.br/site/banners/1645183820.jpg",
    ]);
  }, []);

  const showSlide = (index: number) => {
    if (index >= total) {
      setCurrent(0);
    } else if (index < 0) {
      setCurrent(total - 1);
    } else {
      setCurrent(index);
    }
  };

  const nextSlide = () => {
    showSlide(current + 1);
  };

  const prevSlide = () => {
    showSlide(current - 1);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              transform: `translateX(-${current * 100}%`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {enderecos.map((item, index) => (
              <div
                key={`banner-inicio-n-${index}`}
                style={{
                  minWidth: "100%",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "2rem",
                }}
              >
                <img
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    display: "block",
                    height: "100%",
                    verticalAlign: "middle",
                    overflowClipMargin: "content-box",
                    overflow: "clip",
                  }}
                  src={item}
                />
              </div>
            ))}
          </div>

          <button
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              left: "10px",
            }}
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              right: "10px",
            }}
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: "flex", justifyContent: "center", paddingY: 2 }}>
          <Typography variant="h6">DESTAQUES</Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Container>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <div style={{ padding: 1 }}>
                <Card elevation={3}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        "https://inrpublicacoes.com.br/site/banners/1747150011.jpg"
                      }
                      alt=""
                    />
                  </CardActionArea>
                  <CardContent sx={{ height: 160 }}>
                    <Typography gutterBottom variant="body2" component="div">
                      <strong>Noticia</strong>
                    </Typography>
                    {/* <Typography gutterBottom variant="h5" component="div">
                      Titulo do destaque
                    </Typography> */}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Lorem ipsum dollor emet sirus bazilus et varem sor ignus
                      trandemir valantes
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default InicioView;
