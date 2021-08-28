import { PortalContainer } from "portal/layouts/PortalContainer";

import { AllChats} from './chat'

export const Messaging = () => {

  return (
    <PortalContainer>
     <main>
      <AllChats />
     </main>
    </PortalContainer>
  )
}

export default Messaging