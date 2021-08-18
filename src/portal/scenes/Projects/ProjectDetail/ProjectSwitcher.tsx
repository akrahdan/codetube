import React, { Component } from "react";
import { ProjectDetail } from "./ProjectDetail"; 
import { PortalContainer } from "portal/layouts/PortalContainer";
export class ProjectSwitcher extends Component {

    renderPage() {

        return (
            <ProjectDetail isAnonymous isPaidLanding showTrialCTA />
        )

    }

    render() {
        return (
            <PortalContainer>
                {this.renderPage()}
            </PortalContainer>
        )
    }
}