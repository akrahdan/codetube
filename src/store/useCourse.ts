import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "./hooks";
import { selectCourse } from "state/course/courseSplice";
export const useCourse = () => {
  const course = useAppSelector(selectCourse)
  return useMemo(() => ({ course}), [course])
}