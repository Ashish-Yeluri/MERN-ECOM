import {createSlice} from '@reduxjs/toolkit'

let initialState = {
  user: null,
  isAuthenticated: false
}

let userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setIsAuthencated(state, action) {
      state.isAuthenticated = action.payload
    }
  }
})

export default userSlice.reducer

export let {setUser, setIsAuthencated} = userSlice.actions