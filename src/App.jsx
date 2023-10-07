import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Home from "../components/Home";
import Players from "../components/players";
import TeamRoster from "../components/TeamRoster";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // const handleChange = (e) => {
  //   const selectedPlayerIdx = e.target.value;

  //   setSelectedPlayer(
  //     players.find((player) => player.id === selectedPlayerIdx)
  //   );
  // };

  const teamCount = useSelector((state) => state.teamRoster).length;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "gray", minWidth: "500px" }}
      >
        <Toolbar>
          <Button variant="text" color="inherit">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </Button>

          <Button variant="text" color="inherit" sx={{ mr: "auto" }}>
            <Link
              to="/players"
              style={{ color: "white", textDecoration: "none" }}
            >
              Players
            </Link>
          </Button>

          <Button variant="text" color="inherit">
            <Link
              to="/team-roster"
              style={{ color: "white", textDecoration: "none" }}
            >
              Team Roster ({teamCount})
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/players"
          element={<Players players={players} setPlayers={setPlayers} />}
        />

        <Route path="/team-roster" element={<TeamRoster />} />
      </Routes>
    </>
  );
}

export default App;
