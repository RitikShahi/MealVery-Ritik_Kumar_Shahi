import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: JSON.parse(localStorage.getItem('user'))
    },
    reducers: {
        addUser(state, action) {
            state.userInfo = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },

        removeUser(state, action) {
            state.userInfo = null
            localStorage.removeItem('user')
        }
    }
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer