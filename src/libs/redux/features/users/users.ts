import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

export interface UserState {
  users: User[];
  rowsPerPage: number;
  page: number;
}

const initialState: UserState = {
  users: [] as User[],
  rowsPerPage: 10,
  page: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      try {
        state.users = action.payload;
      } catch (error) {
        console.log(error);
      }
    },
    addUser: (state, action: PayloadAction<User>) => {
      try {
        state.users.push({ ...action.payload, id: Math.random() });
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      try {
        const userIndex = [...state.users].findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[userIndex] = action.payload;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      try {
        state.users = [
          ...state.users.filter((user) => user.id !== action.payload),
        ];
      } catch (error) {
        console.log(error);
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  setUser,
  addUser,
  updateUser,
  deleteUser,
  setPage,
  setRowsPerPage,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
