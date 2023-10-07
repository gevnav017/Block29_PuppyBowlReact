import React, { useState } from "react";
import { Button, DialogContentText, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { playersSlice } from "../store/store";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const SinglePlayerModal = ({ selectedPlayer, openModal, setOpenModal }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarColor, setSnackbarColor] = useState("error")

    const { addToTeamRoster } = playersSlice.actions

    const team = useSelector(state => state.teamRoster)
    const alreadyInTeam = team.find(player => player.id === selectedPlayer.id) !== undefined

    const dispatch = useDispatch()

    const addToTeam = () => {
        if (alreadyInTeam) {
            setSnackbarMessage("Already in team")
            setSnackbarColor("error")
            setOpenSnackbar(true)
            return
        }
        
        dispatch(addToTeamRoster(selectedPlayer))
        setSnackbarMessage("Drafted to team")
        setSnackbarColor("success")
        setOpenSnackbar(true)
        setOpenModal(false)
    }

    const removePlayer = (id) => {

        fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2306-FSA-ET-WEB-PT-SF/players/${id}`,
            {
                method: 'DELETE'
            }
        )
            .then(response => response.json())
            .catch((err) => {
                console.log(err)
            })

        setOpenModal(false)

        setSnackbarMessage("Successfully removed player")
        setSnackbarColor("success")
        setOpenSnackbar(true)
    }

    return (
        <>
            <div>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={openModal}
                    onClose={() => { setOpenModal(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            className="playerAvatar"
                            src={selectedPlayer.imageUrl}
                            sx={{ width: 75, height: 75, mr: 2 }}
                        />
                        {selectedPlayer.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ m: 2 }}>
                            <strong>Breed: </strong> {selectedPlayer.breed}
                        </DialogContentText>
                        <DialogContentText sx={{ m: 2 }}>
                            <strong>Status: </strong> {selectedPlayer.status}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: 'red', mr: 'auto' }} onClick={() => removePlayer(selectedPlayer.id)}>
                            Remove Player
                        </Button>
                        <Button onClick={() => { setOpenModal(false) }}>Close</Button>
                        <Button onClick={addToTeam}>
                            Add to Team
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Snackbar
                open={openSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={6000}
                onClose={() => {setOpenSnackbar(false)}}
            >
                <Alert severity={snackbarColor}>{snackbarMessage}</Alert>
            </Snackbar>
        </>
    )
}

export default SinglePlayerModal