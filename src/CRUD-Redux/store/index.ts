import { configureStore, Middleware } from "@reduxjs/toolkit";
import usersReducer, {rollbackUser} from './users/slice.ts'
import { toast } from "sonner";

const presistenceMiddle: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem("redux-state", JSON.stringify(store.getState()))
}

const syncWithDB: Middleware = (store) => (next) => (action) => {
  const {type, payload} = action
  const previousState = store.getState()
  next(action)
  
  if(type === "users/deleteUserById"){
    const userToRemove = previousState.users.find(user => user.id == payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok) toast.success(`Usuario ${payload} eliminado con exito`)
    })
    .catch(err => {
      toast.error(`No se ha podido eliminar al usuario ${payload}`)
      if(userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.log(err)
    })
  }

}

export const store = configureStore ({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(presistenceMiddle, syncWithDB)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch