import { theme } from "@codecademy/gamut-styles"
import React, { useEffect } from 'react'
import { routesMeta } from "portal/routes";
import { createRootComponent } from "components/createRootComponent";
import { getRouteMetaForLocation } from "libs/location/routing";
import { createReduxBinder } from "libs/reduxBinder";
import { selectLocationType } from "state/location/selectors";
import { setCredentials } from 'state/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useGetCurrentUserQuery } from 'services/auth';
import { useGetProfileQuery } from "services/auth";
import { SignupSection } from 'portal/scenes/SignupSection';
import { SiginSection } from 'portal/scenes/SignupSection/SigninSection';
import { SignupModal } from 'portal/scenes/Modal/SignupModal';
import { Payment } from 'portal/scenes/Payments'
import { Modal } from 'portal/scenes/Modal';
import { selectModal } from 'state/modals/modalSlice';
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
    const modal = useAppSelector(selectModal)

    const locationType = useAppSelector(selectLocationType);
    const { scene: Scene, pageName } = getRouteMetaForLocation(
        routesMeta,
        locationType,
        statusCode
    )

    return (
        <>
            <Scene />
            {/* {modal == 'signup' && <SignupModal onClose>
                <SignupSection />
            </SignupModal>}

            {modal == 'login' && <SignupModal >
                <SiginSection />
            </SignupModal>} */}
        </>
    )
}



export default createRootComponent(PortalRouter, { theme });

