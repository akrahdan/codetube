import { HTMLProps } from "react";
import { ClassNamesProps } from "@emotion/react";

export interface BaseTrackLinkProps {
    data: {

    }
    onClick?: HTMLProps<HTMLButtonElement>['onClick'];
    href?: string;
    target?: string;
    asButton?: boolean;
    className?: string;
}


