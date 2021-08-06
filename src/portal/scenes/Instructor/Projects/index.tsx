import { Component } from "react";
import { platformTheme } from "@codecademy/gamut-styles";
import { PlatformContainer } from "../Container";
import ManageProject from "./manageProject";
import { createRootComponent } from "components/createRootComponent";
export class ProjectPlatform extends Component {

    render() {
        const SceneComponent = ManageProject
        return (
            <PlatformContainer >
                <SceneComponent />
            </PlatformContainer>
        )
    }
}

export default createRootComponent(ProjectPlatform, { theme: platformTheme })