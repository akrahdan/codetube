"use strict";
exports.__esModule = true;
exports.Card = void 0;
var gamut_styles_1 = require("@codecademy/gamut-styles");
var styled_1 = require("@emotion/styled");
var Box_1 = require("../Box");
var cardVariants = gamut_styles_1.variant({
    base: {
        border: 1,
        borderRadius: '2px'
    },
    variants: {
        yellow: {
            bg: 'yellow',
            textColor: 'navy'
        },
        navy: {
            bg: 'navy',
            textColor: 'white',
            '&:hover': {
                outline: '1px solid currentColor'
            }
        },
        white: {
            bg: 'white',
            textColor: 'navy'
        },
        hyper: {
            bg: 'hyper',
            textColor: 'white'
        }
    }
});
var shadowVariants = gamut_styles_1.variant({
    prop: 'shadow',
    base: {
        border: 1,
        borderRadius: '2px',
        position: 'relative',
        boxShadow: "0px 0px 0 " + gamut_styles_1.theme.colors.navy,
        transition: 'box-shadow 200ms ease, transform 200ms ease'
    },
    variants: {
        small: {
            '&:hover': {
                transform: 'translate(2px, -2px)',
                boxShadow: "-4px 4px 0 " + gamut_styles_1.theme.colors.navy
            }
        },
        medium: {
            '&:hover': {
                transform: 'translate(4px, -4px)',
                boxShadow: "-8px 8px 0 " + gamut_styles_1.theme.colors.navy
            }
        }
    }
});
exports.Card = styled_1["default"](Box_1.Box)(cardVariants, shadowVariants);
exports.Card.defaultProps = {
    p: 16,
    variant: 'white'
};
