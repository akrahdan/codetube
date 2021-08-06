import { getRouteMetaForLocation } from "libs/location/routing";
import { routesCommunication } from "portal/routes";
import { selectLocationType, selectLocationPathName } from "state/location/selectors";
import { useAppSelector } from "store/hooks";
import Messages from './messages';
export const Communication = () => {
    
    const locationPath = useAppSelector(selectLocationPathName)

    const { scene: Scene}   =   getRouteMetaForLocation(routesCommunication, locationPath)
    return (
        <div className="responsive_container app--responsive_container__secondary_nav_bar--active--2j202">
            <Scene />
        </div>
    );
}

export default Communication;