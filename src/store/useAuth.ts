import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "./hooks";
import { selectCurrentUser } from "state/auth/authSlice";
import { selectAvatar } from "state/auth/authSlice";
export const useAuth = () => {
    const user = useAppSelector(selectCurrentUser)
    

    return useMemo(() => ({ user}), [user])
}

export const useAvatar = () => {
    const avatar = useAppSelector(selectAvatar)
    

    return useMemo(() => ({ avatar}), [avatar])
}