import { ArrowBack, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Frame from "../components/Frame";

const Boletim: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();
  return (
    <Frame
      loading={loading}
      alerMessage={alertMessage}
      showAlert={showAlert}
      closeAlert={() => {
        setShowAlert(false);
      }}
    >
      <Grid container>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Box
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              display: "flex",
              padding: 2,
            }}
          >
            <Typography sx={{ color: "white" }} variant="h2">
              <strong>Classificadores</strong>
            </Typography>

            <IconButton
              sx={{ height: "40px" }}
              onClick={() => {
                router.push("/home");
              }}
            >
              <ArrowBack sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Box sx={{ width: "100%", paddingInline: 2 }}>
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                background: (theme) => theme.palette.primary.light,
                padding: 1,
              }}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <TableRow>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Data
                      </TableCell>
                      <TableCell
                        sx={{
                          width: { xs: "200px", md: "200px" },
                          color: "white",
                        }}
                      >
                        Título
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        opções
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: "10%" }} align="center">
                        01/01/2025
                      </TableCell>
                      <TableCell sx={{ width: "75%" }}>cell</TableCell>
                      <TableCell sx={{ width: "15%" }} align="center">
                        <IconButton>
                          <MoreHoriz />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Frame>
  );
};

export default Boletim;
