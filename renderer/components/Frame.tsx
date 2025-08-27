import { AccountCircle, Close, NotificationAdd } from "@mui/icons-material";
import { Box, IconButton, Modal, Snackbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { useCtx } from "../context";

const Frame: FC<{
  children?: ReactNode;
  loading?: boolean;
  showAlert?: boolean;
  alerMessage?: string;
  closeAlert?: () => void;
}> = ({ ...props }) => {
  const ctx = useCtx();
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: (theme) => theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          paddingRight: 2,
          paddingLeft: 2,
          background: (theme) => theme.palette.primary.light,
        }}
      >
        <Typography variant="caption">
          <strong>versão 0.3.0</strong>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {ctx.usuario ? (
            <Typography variant="body2">
              Seja Bem-vindo <strong>{ctx.usuario.nome}</strong>
            </Typography>
          ) : (
            <Typography variant="body2">Seja Bem-vindo</Typography>
          )}

          <IconButton>
            <AccountCircle />
          </IconButton>

          <IconButton>
            <NotificationAdd />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}
      >
        {props.children}
      </Box>

      <Modal open={props.loading}>
        <Box
          sx={{
            position: "absolute",
            width: "70%",
            height: "80%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "1px solid #000",
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image src="/loading.gif" width={180} height={180} alt="" />
          <Typography variant="h6">Aguarde</Typography>
        </Box>
      </Modal>

      <Snackbar
        open={props.showAlert}
        autoHideDuration={6000}
        onClose={() => {
          props.closeAlert && props.closeAlert();
        }}
        message={props.alerMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              props.closeAlert && props.closeAlert();
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Frame;
