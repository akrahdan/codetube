import { PortalContainer } from "portal/layouts/PortalContainer";
import { useEffect } from "react";

import { AllChats} from './chat'

export const Messaging = ({ sideNavToggle, perfNavToggle }) => {
  useEffect(() => {
    sideNavToggle(true)
    perfNavToggle(false)
  })
  return (
    <AllChats />
  )
}

export default Messaging