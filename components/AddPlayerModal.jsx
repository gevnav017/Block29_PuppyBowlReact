import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Avatar } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


const AddPlayerModal = ({ openAddModal, setOpenAddModal }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarColor, setSnackbarColor] = useState("error")

    const formInitialState = {
        name: "",
        breed: "",
        status: "",
        image: ""
    }

    const [formData, setFormData] = useState(formInitialState)

    const handleForm = (e) => {
        e.preventDefault()

        fetch('https://fsa-puppy-bowl.herokuapp.com/api/2306-FSA-ET-WEB-PT-SF/players',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    breed: formData.breed,
                    status: formData.status,
                    imageUrl: formData.image
                }),
            }
        )
        .then(response => response.json())
        .catch((err) => {
            console.log(err)
        })

        setFormData(formInitialState)

        setSnackbarMessage("Successfully added player")
        setSnackbarColor("success")
        setOpenSnackbar(true)

        // const postData = async () => {
        //     try {
        //         const response = await fetch(
        //             'https://fsa-puppy-bowl.herokuapp.com/api/2306-FSA-ET-WEB-PT-SF/players',
        //             {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({
        //                     name: formData.name,
        //                     breed: formData.breed,
        //                 }),
        //             }
        //         );
        //         const result = await response.json();
        //         console.log(result);
        //     } catch (err) {
        //         console.error(err);
        //     }

        // }

        // postData()
    }

    const puppyImages = [
        "https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=650%2Cq=40%2Csharpen=1%2Cwidth=956/wp-content/uploads/puppy-day-e1574071869348.jpg",
        "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/02/23142013/Alaskan-Malamute-puppy-laying-down-outdoors.jpg",
        "https://images.squarespace-cdn.com/content/v1/54e7a1a6e4b08db9da801ded/1583002816518-ZH2PH7Y8NY21KG3YYKNL/Screen+Shot+2020-02-26+at+2.33.24+PM.png",
        "https://previews.123rf.com/images/dixi_/dixi_1512/dixi_151200130/50274571-gray-puppy-cane-corso-on-the-grass.jpg"
    ]

    const handleClose = () => {
        setOpenAddModal(false)
    }

    return (
        <div>
            <Dialog open={openAddModal} onClose={handleClose} fullWidth>
                <form onSubmit={(e) => handleForm(e)}>
                    <DialogTitle>Add Player</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.name}
                            onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                        />

                        <TextField
                            margin="dense"
                            label="Breed"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.breed}
                            onChange={(e) => { setFormData({ ...formData, breed: e.target.value }) }}
                        />

                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Status"
                                value={formData.status}
                                onChange={(e) => { setFormData({ ...formData, status: e.target.value }) }}
                            >
                                <MenuItem disabled value="">
                                    <em></em>
                                </MenuItem>
                                <MenuItem value="field">Field</MenuItem>
                                <MenuItem value="bench">Bench</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-standard-label">Puppy Image</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Image"
                                value={formData.image}
                                onChange={(e) => { setFormData({ ...formData, image: e.target.value }) }}
                            >
                                <MenuItem disabled value="">
                                    <em></em>
                                </MenuItem>
                                <MenuItem value={puppyImages[0]}>
                                    <Avatar
                                        src={puppyImages[0]}
                                        sx={{ width: 50, height: 50, mr: 2 }}
                                    />
                                    Puppy 1
                                </MenuItem>
                                <MenuItem value={puppyImages[1]}>
                                    <Avatar
                                        src={puppyImages[1]}
                                        sx={{ width: 50, height: 50, mr: 2 }}
                                    />
                                    Puppy 2
                                </MenuItem>
                                <MenuItem value={puppyImages[2]}>
                                    <Avatar
                                        src={puppyImages[2]}
                                        sx={{ width: 50, height: 50, mr: 2 }}
                                    />
                                    Puppy 3
                                </MenuItem>
                                <MenuItem value={puppyImages[3]}>
                                    <Avatar
                                        src={puppyImages[3]}
                                        sx={{ width: 50, height: 50, mr: 2 }}
                                    />
                                    Puppy 4
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleClose}>Add Player</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={6000}
                onClose={() => {setOpenSnackbar(false)}}
            >
                <Alert severity={snackbarColor}>{snackbarMessage}</Alert>
            </Snackbar>
        </div>
    )
}

export default AddPlayerModal