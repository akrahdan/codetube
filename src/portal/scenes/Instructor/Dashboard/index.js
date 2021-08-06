import { useState } from "react";

import { Sidebar } from "./Sidebar";
import { Courses } from "./Courses";
import { Communication } from "./Communication";
import { routesDashboard } from "portal/routes";
import { getRouteMetaForLocation } from "libs/location/routing";
import { selectLocationPathName } from "state/location/selectors";
import { selectCurrentPath } from "state/instructor/instructorSplice";
import { useAppSelector } from "store/hooks";
import { NavBar } from "./navbar";
import "./instructor.scss";

export const Dashboard = () => {
  const locationPath = useAppSelector(selectLocationPathName);
  const [sideNav, setSideNav] = useState(false)
  const [perfNav, setPerfNav] = useState(false)
  const { scene: Scene } = getRouteMetaForLocation(
    routesDashboard,
    locationPath
  );
  return (
    <div className="main-content-container">
      <NavBar />
      <div className="main-content">
        <div className="page-frame page-frame--ia">
          <Sidebar sideOpen= {sideNav} perfOpen = {perfNav}/>
          <div className="main_container">
            <Scene sideNavToggle={(value ) => setSideNav(value)}
             perfNavToggle={(value ) => setPerfNav(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
