import { configureStore, createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
    name: 'teamRoster',
    initialState: [],
    reducers: {
        addToTeamRoster: (state, action)  => {
            state.push(action.payload)
        },
        removeFromTeamRoster: (state, action) => {
            const teamArrayIdx = action.payload
            state.splice(teamArrayIdx, 1)
        }
    }
})

export const userNameSlice = createSlice({
    name: 'userName',
    initialState: {name: ""},
    reducers: {
        setUserName: (state, action) => {
            const name = action.payload
            state.name = name
        }
    }
})

const store = configureStore({
    reducer: {
        teamRoster: playersSlice.reducer,
        userName: userNameSlice.reducer
    }
})

export default store

window.store = store