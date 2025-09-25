import {
  AccountCircle,
  Close,
  Key,
  Notifications,
  Send,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
import { useCtx } from "../context";
import theme from "../styles/theme";

const Frame: FC<{
  children?: ReactNode;
  loading?: boolean;
  showAlert?: boolean;
  alerMessage?: string;
  closeAlert?: () => void;
}> = ({ ...props }) => {
  const [version, setVersion] = useState("verificando...");
  const [showLogin, setShowLogin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      type: "CL",
      title: "Classificador",
      description: "novo classificador disponívels",
    },
    {
      id: 2,
      type: "BE",
      title: "Boletim",
      description: "novo boletim disponívels",
    },
  ]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("asdsaasd");
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notificationsOpen = Boolean(anchorEl);

  const ctx = useCtx();

  const handleClickNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const changeVisibility = () => {
    setShowPass((passVisible) => !passVisible);
  };

  const getVersion = async () => {
    const response = await window.ipc.invoke("request:version", {});
    setVersion(response);
  };

  const login = async () => {
    try {
      const response = await window.ipc.invoke("request:login", {});
    } catch (error: any) {}
  };

  useEffect(() => {
    getVersion();
  }, []);

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
          <strong>versão {version}</strong>
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

          <IconButton
            onClick={() => {
              setShowLogin((showLogin) => !showLogin);
            }}
          >
            <AccountCircle />
          </IconButton>

          <IconButton onClick={handleClickNotifications}>
            <Notifications />
          </IconButton>

          <Menu
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={notificationsOpen}
            anchorEl={anchorEl}
            onClose={handleNotificationsClose}
            slotProps={{
              list: {
                "aria-labelledby": "lock-button",
                role: "listbox",
              },
            }}
          >
            {notificationList.map((notification, index) => (
              <MenuItem key={`${index}-${notification.id}`}>
                <Box sx={{ width: "300px" }}>
                  <Grid container>
                    <Grid size={2}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {notification.type === "BE" ? (
                          <Icon>home</Icon>
                        ) : (
                          <Icon>send</Icon>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={10}>
                      <Grid container>
                        <Grid size={12}>
                          <Typography fontSize={10}>titulo</Typography>
                        </Grid>
                        <Grid size={12}>
                          <Typography fontSize={12}>
                            <strong>descrição</strong>
                          </Typography>
                        </Grid>
                        <Grid size={12}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "end",
                              alignContent: "center",
                            }}
                          >
                            <Typography fontSize={8}>
                              23/09/2025 13:35
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </MenuItem>
            ))}
          </Menu>
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

      <Modal open={showLogin}>
        <>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              right: "28%",
              transform: "translate(-50%, -50%)",
              background: theme.palette.primary.contrastText,
              borderRadius: "50%",
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
            }}
          >
            <IconButton
              color="error"
              onClick={() => {
                setShowLogin(false);
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: "30%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Box
                    sx={{
                      width: "100%",
                      paddingTop: 2,
                      paddingBottom: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={"/inr_logo.png"}
                      alt="INR logo"
                      width={200}
                      height={100}
                    />
                  </Box>
                </Grid>

                <Grid size={12}>
                  <TextField
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    fullWidth
                    label="Usuário"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    label="senha"
                    type={showPass ? "text" : "password"}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Key />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" onClick={changeVisibility}>
                              {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <Button
                    fullWidth
                    endIcon={<Send />}
                    variant="contained"
                    onClick={login}
                  >
                    Login
                  </Button>
                </Grid>

                <Grid size={12}>
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {showLoginErrorMessage && (
                      <Typography variant="caption" color="error">
                        {loginErrorMessage}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </>
      </Modal>

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
