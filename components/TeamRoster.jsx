import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playersSlice } from "../store/store";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Snackbar, Alert } from "@mui/material";

const TeamRoster = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("error");

  const teamRoster = useSelector((state) => state.teamRoster);

  const playersInTeam = useSelector((state) => state.teamRoster);
  const { removeFromTeamRoster } = playersSlice.actions;
  const dispatch = useDispatch();

  const handleRemove = (playerId) => {
    const teamArrayIdx = playersInTeam.findIndex(
      (player) => player.id === playerId
    );

    dispatch(removeFromTeamRoster(teamArrayIdx));

    setSnackbarColor('success')
    setSnackbarMessage("Successfully removed from the team")
    setOpenSnackbar(true)
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
        }}
      >
        <h1 style={{ margin: "10px 0" }}>Team</h1>

        {teamRoster.map((player) => (
          <Card
            key={player.id}
            sx={{ display: "flex", width: "35%", minWidth: "500px", my: 1 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={player.imageUrl}
              alt="puppy-image"
            />
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <Typography component="div" variant="h5">
                  {player.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <strong>Breed: </strong> {player.breed}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <Button sx={{ m: 1 }} onClick={() => handleRemove(player.id)}>
                  Remove
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert severity={snackbarColor}>{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default TeamRoster;
