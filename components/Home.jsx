import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userNameSlice } from '../store/store'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material'

const Home = () => {
    const [open, setOpen] = useState(true)
    const [name, setName] = useState("")
    const [spinImg, setSpinImg] = useState(false)

    const handleClose = () => {
        dispatch(setUserName(name))
        setSpinImg(true)
        setOpen(false)
    }

    const { setUserName } = userNameSlice.actions

    const dispatch = useDispatch()

    const userName = useSelector(state => state.userName.name)

    useEffect(() => {
        if (userName !== "") {
            setOpen(false)
        }
    }, [])

    return (
        <Box sx={{ m: 2 }}>
            <Box sx={{ textAlign: "center" }}>

                {userName !== "" ?
                    <h2 style={{ marginTop: "30px" }}>
                        {`Welcome, ${userName}`}
                    </h2>
                    :
                    ""
                }

                <img 
                    className={spinImg ? 'puppy-bowl-img' : ''}
                    src="../images/puppybowl.png" 
                    atl="puppy-bowl-image" 
                    style={{ 
                        width:"700px", 
                        marginTop:"30px", 
                        borderRadius:"20px", 
                        boxShadow:"20px 20px 20px gray"
                    }}
                />
                
                <h3 style={{ margin:"30px 0", fontSize:"1.7rem", fontStyle:"italic" }}>to the Puppy Bowl</h3>
            </Box>

            <Dialog open={open} fullWidth>
                <DialogTitle>Welcome</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your name
                    </DialogContentText>
                    <TextField
                        variant="standard"
                        sx={{ my: 2 }}
                        fullWidth
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Home
