import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserId = string;

export interface User {
    name?: string;
    email?: string;
    github?: string;
    status?: string;
}

export interface UserWithId extends User {
    id?: string;
}

const defaultState: UserWithId[] = [
    {
    id: "1",
    name: 'John Doe',
    status: 'Live',
    email: 'example@gmail.com',
    github: 'leo'
  },
  {
    id: "2",
    name: 'joe Doehn',
    status: 'Offline',
    email: 'joe@gmail.com',
    github: 'midudev'
  },
  {
    id: "3",
    name: 'Amanda Botez',
    status: 'Live',
    email: 'Amanda@gmail.com',
    github: 'Amanda'
  },
  {
    id: "4",
    name: 'Joe Anderson',
    status: 'Offline',
    email: 'Anderson@gmail.com',
    github: 'Anderson'
  }
]


const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("redux-state");
  if(persistedState) return JSON.parse(persistedState).users;
  return defaultState
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
      deleteUserById: (state, action: PayloadAction<UserId>) => {
        const id = action.payload;
        return state.filter(user => user.id !== id)
      },
      createUser: (state, action: PayloadAction<User>) => {
        const stat = Math.random();
        const ans = stat > 0.5 ? "Live" : "Offline"; 
        const id = String(state.length + 1)
        return [...state, {id, status: ans, ...action.payload}]
      },
      rollbackUser: (state, action: PayloadAction<UserWithId>) => {
        const isUserSeted = state.some(user => user.id == action.payload.id) 
        if(!isUserSeted) {
          return [...state, action.payload]
        }
      },
      EditUser: (state, action: PayloadAction<UserWithId>) => {
        const user = state.findIndex(user => user.id == action.payload.id)
        const newUser = {
          ...state[user],
          ...action.payload
        }
        state[user] = newUser
      }
    }
})

export default usersSlice.reducer

export const {deleteUserById, createUser, rollbackUser, EditUser} = usersSlice.actions