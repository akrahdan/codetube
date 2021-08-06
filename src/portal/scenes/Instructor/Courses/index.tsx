import { Component } from "react";
import { platformTheme } from "@codecademy/gamut-styles";
import { PlatformContainer } from "../Container";
import CreateCourse from "./manageCourse";
import { createRootComponent } from "components/createRootComponent";
export class CoursePlatform extends Component {

    render() {
        const SceneComponent = CreateCourse
        return (
            <PlatformContainer >
                <SceneComponent />
            </PlatformContainer>
        )
    }
}

export default createRootComponent(CoursePlatform, { theme: platformTheme })