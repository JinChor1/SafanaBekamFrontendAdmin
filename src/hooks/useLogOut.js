import { useAuthContext } from "./useAuthContext"
import { toast } from 'react-toastify';

export const useLogOut = () => {
    const { dispatch } = useAuthContext()

    const logout =  async (req) => {
        // remove from local storage
        localStorage.removeItem('user')

        // remove from react context
        dispatch({type:'LOGOUT'})

        toast.warning("Logged out!", {
            position: "top-center",
        })
    }

    return { logout }
}