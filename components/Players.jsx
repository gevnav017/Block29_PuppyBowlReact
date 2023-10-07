import React, { useState, useEffect } from "react";
import SinglePlayerModal from "./SinglePlayerModal";
import AddPlayerModal from "./AddPlayerModal";
import Avatar from '@mui/material/Avatar';
import { Typography, Box, Button } from "@mui/material";

const Players = ({ players, setPlayers }) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)

    useEffect(() => {
        fetch("https://fsa-puppy-bowl.herokuapp.com/api/2306-FSA-ET-WEB-PT-SF/players")
        .then(response => response.json())
        .then(data => setPlayers(data.data.players))
        .catch((err) => {
            console.log(err)
        })
    }, [players])

    const handleSinglePlayerClick = (player) => {
        setSelectedPlayer(player)
        setOpenModal(true)
    }

    return (
        <>
            <Box sx={{ mt: 2, textAlign: "center" }}>
                <h1>Players</h1>
            </Box>

            <Box sx={{ mx:3, my:2, display:'flex', justifyContent:'end' }}>
                <Button variant="outlined" onClick={() => {setOpenAddModal(true)}}>+ Add Player</Button>
            </Box>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                height: "93vh"
            }}
            >

                {players && players.map(player =>
                    <div key={player.id}
                        style={{
                            width: "25%",
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                            margin: "2%"
                        }}
                        onClick={() => {handleSinglePlayerClick(player)}}
                    >
                        <Avatar
                            className="playerAvatar"
                            alt={player.name}
                            src={player.imageUrl}
                            sx={{ width: 150, height: 150 }}
                        />
                        <Typography
                            sx={{
                                position: "absolute",
                                top: "100%"
                            }}
                        >
                            {player.name}
                        </Typography>
                    </div>
                )}
            </div>

            <SinglePlayerModal selectedPlayer={selectedPlayer} openModal={openModal} setOpenModal={setOpenModal} />

            <AddPlayerModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
        </>
    )
}

export default Players