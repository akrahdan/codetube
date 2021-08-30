import { theme } from "@codecademy/gamut-styles"
import React, { useEffect } from 'react'
import { routesMeta } from "portal/routes";
import { createRootComponent } from "components/createRootComponent";
import { getRouteMetaForLocation } from "libs/location/routing";
import { selectLocationType } from "state/location/selectors";
import { setCredentials } from 'state/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useGetCurrentUserQuery } from 'services/auth';
import { useGetProfileQuery } from "services/auth";
import { useFetchInstructorInfoQuery } from "services/courses";


export type PortalProps = {
    portalData: unknown,
    statusCode: number
}

export const PortalRouter: React.FC<PortalProps> = ({
    portalData,
    statusCode

}) => {
    const dispatch = useAppDispatch();
    const { data } = useGetCurrentUserQuery()
    const { data: profileQuery } = useGetProfileQuery()
    const { data: instructor } = useFetchInstructorInfoQuery()
    if (data) {
        const token = localStorage.getItem('token');
        const userResponse = {
            user: data,
            token
        }
        dispatch(setCredentials(userResponse))
    }
  
    const locationType = useAppSelector(selectLocationType);
    const { scene: Scene, pageName } = getRouteMetaForLocation(
        routesMeta,
        locationType,
        statusCode
    )

    return (
        <>
            <Scene />
        </>
    )
}



export default createRootComponent(PortalRouter, { theme });

