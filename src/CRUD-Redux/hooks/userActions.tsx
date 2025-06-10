import { deleteUserById, createUser, UserWithId, EditUser } from "../store/users/slice.ts";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
    const dispatch = useAppDispatch();
    
    const handleRemoveUser = (id: string) => {
      dispatch(deleteUserById(id))
    }
    const handleCreateUser = (name: string, email: string, github: string) => {
      dispatch(createUser({name, email, github}))
    }
    const handleEditUser = (data: UserWithId) => {
      dispatch(EditUser(data))
    }
    return {handleRemoveUser, handleCreateUser, handleEditUser} 
}