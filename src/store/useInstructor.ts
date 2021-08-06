import { useMemo } from "react";
import { useAppSelector } from "./hooks";
import { selectInstructor } from "state/instructor/instructorSplice";

export const useInstructor = () => {
    const instructor = useAppSelector(selectInstructor)
    

    return useMemo(() => ({ instructor}), [instructor])
}