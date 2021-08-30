import { PortalContainer } from "portal/layouts/PortalContainer"
import ComposeMessage from "./compose"
export const CreateMessage = ({ sideNavToggle, perfNavToggle }) => {

  return (
      <PortalContainer>
          <ComposeMessage  sideNavToggle={sideNavToggle} perfNavToggle={perfNavToggle}/>
      </PortalContainer>
  )
}

export default CreateMessage;