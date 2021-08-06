import React, { Component } from "react";
import PathMarketingPage from "./PathMarketingPage"; 
import { PortalContainer } from "portal/layouts/PortalContainer";
export class PathRouteSwitcher extends Component {

    renderPage() {

        return (
            <PathMarketingPage isAnonymous isPaidLanding showTrialCTA />
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