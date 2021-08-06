import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "./hooks";
import { selectPlayer } from "state/player/playerSlice";


export const usePlayer = () => {
    const player = useAppSelector(selectPlayer)
    

    return useMemo(() => ({ player}), [player])
}