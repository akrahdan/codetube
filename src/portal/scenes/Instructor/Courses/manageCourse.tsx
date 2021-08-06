
import { getRouteMetaForLocation } from "libs/location/routing";
import { selectLocationPayload } from "state/location/selectors";
import { routesManageCourse } from 'portal/routes';

import { CourseManageHeader } from './header/courseManageHeader';
import  { ManageSidebar } from './Sidebar/ManageSidebar'

import './course.scss';

import { useAppSelector } from 'store/hooks';
export const CreateCourse = () => {
    const locationPayload = useAppSelector(selectLocationPayload)
   const { scene: Scene} = getRouteMetaForLocation(routesManageCourse, locationPayload.slug)
    return (
        
        <div className="ia">
            <CourseManageHeader />
            <div className="course_manage app--container--7qJMh">
              <ManageSidebar courseId={locationPayload.id} />
              <div className="app--content--3vcMt">
                 <Scene />
              </div>
            </div>
        </div>

    );
}

export default CreateCourse