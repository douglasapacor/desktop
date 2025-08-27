import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BannerHighlight from "../components/BannerHighlight";
import Frame from "../components/Frame";
import Highlight from "../components/Highlight";
import { useCtx } from "../context";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [banners, setBanners] = useState<{ img: string; link: string }[]>([]);
  const [links, setLinks] = useState<
    {
      idlink: number;
      tipo: string;
      id: number;
      ordem: number;
      label: string;
      content: { id: number; titulo: string; img: string }[];
    }[]
  >([]);
  const [publicidade, setPublicidade] = useState<
    {
      idpublicidade: number;
      texto: string;
      ordem: number;
    }[]
  >([]);
  const ctx = useCtx();
  const router = useRouter();

  const StartItems = (params: {
    destaques: {
      idlink: number;
      tipo: string;
      id: number;
      ordem: number;
      label: string;
      content: { id: number; titulo: string; img: string }[];
    }[];
    publicidades: { idpublicidade: number; texto: string; ordem: number }[];
  }) => {
    let bannerIndex = 0;

    const itensWithBanners = params.destaques.map((dtq, i) => {
      const elements = [
        <Highlight
          key={`highlight-item-${i}`}
          img={dtq.content ? dtq.content[0].img : ""}
          label={dtq.label}
          titulo={dtq.content ? dtq.content[0].titulo : ""}
        />,
      ];

      if ((i + 1) % 3 === 0 && bannerIndex < params.publicidades.length) {
        elements.push(
          <BannerHighlight
            key={`banner-${bannerIndex}`}
            textImg={params.publicidades[bannerIndex].texto}
          />
        );
        bannerIndex++;
      }

      if (bannerIndex >= params.publicidades.length) {
        bannerIndex = 0;
      }

      return elements;
    });

    return <>{itensWithBanners}</>;
  };

  const main = async () => {
    if (!router.isReady) return;

    try {
      setLoading(true);
      const response = await window.ipc.invoke("request:home", {});

      if (!response.success)
        throw new Error(
          "Houve um erro, Infelismente não podemos recuperar as informações do servidor"
        );

      setBanners(
        response.data.banners.map((item) => ({
          img: item.img,
          link: item.link,
        }))
      );
      setLinks(response.data.links);
      setPublicidade(response.data.publicidade);
      setLoading(false);
      setInterval(() => {
        if (activeStep < banners.length) {
          setActiveStep((step) => step + 1);
        } else if (activeStep === banners.length - 1) {
          setActiveStep(0);
        }
      }, 10000);
    } catch (error: any) {
      setAlertMessage(error.message);
      setShowAlert(true);
    } finally {
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    }
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <Frame
      loading={loading}
      alerMessage={alertMessage}
      showAlert={showAlert}
      closeAlert={() => {
        setShowAlert(false);
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "90px",
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
          alignItems: "center",
          paddingRight: 2,
          paddingLeft: 2,
          background: "#B0BEC5",
        }}
      >
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => {
            router.push("/boletim");
          }}
        >
          Boletim
        </Button>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => {
            router.push("/classificador");
          }}
        >
          Classificadores
        </Button>
        {ctx.usuario && (
          <Button
            sx={{ width: "200px" }}
            variant="contained"
            onClick={() => {
              router.push("/favorito");
            }}
          >
            Favoritos
          </Button>
        )}
      </Box>

      <div
        style={{
          display: "flex",
          transform: `translateX(-${activeStep * 100}%`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {banners.map((b, index) => (
          <Box
            key={`key-banner-app-${index}`}
            sx={{
              minWidth: "100%",
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
              src={b.img}
            />
          </Box>
        ))}
      </div>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <button
          style={{
            color: "white",
            background: "none",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            if (activeStep > 0) {
              setActiveStep((step) => step - 1);
            } else if (activeStep === 0) {
              setActiveStep(banners.length - 1);
            }
          }}
        >
          ❮
        </button>

        <div
          style={{
            color: "white",
            background: "none",
            border: "none",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {banners.map((ban, index) => {
            if (activeStep === index) {
              return (
                <button
                  key={`button-carousel-item-${index}`}
                  style={{
                    color: "white",
                    background: "none",
                    border: "none",
                  }}
                >
                  ●
                </button>
              );
            } else {
              return (
                <button
                  key={`button-carousel-item-${index}`}
                  style={{
                    color: "white",
                    background: "none",
                    border: "none",
                  }}
                >
                  •
                </button>
              );
            }
          })}
        </div>

        <button
          style={{
            color: "white",
            background: "none",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            if (activeStep < banners.length - 1) {
              setActiveStep((step) => step + 1);
            } else if (activeStep === banners.length - 1) {
              setActiveStep(0);
            }
          }}
        >
          ❯
        </button>
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          paddingTop: "20px",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          DESTAQUES
        </Typography>
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Paper sx={{ p: 1 }}>
          <Grid container spacing={2}>
            {<StartItems destaques={links} publicidades={publicidade} />}
          </Grid>
        </Paper>
      </Box>
    </Frame>
  );
};

export default Home;
