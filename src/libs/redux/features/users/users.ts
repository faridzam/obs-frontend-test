import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

export interface UserState {
  users : User[];
  rowsPerPage: number;
  page: number;
}

const initialState: UserState = {
  users : [],
  rowsPerPage: 10,
  page: 0,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      try {
        state.users = action.payload
      } catch (error) {
        console.log(error)
      }
    },
    addUser: (state, action: PayloadAction<User>) => {
      try {
        state.users.push(action.payload)
      } catch (error) {
        console.log(error)
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload
    },
  },
})

export const {setUser, addUser, setPage, setRowsPerPage} = userSlice.actions
export const userReducer = userSlice.reducer