import { deprecatedColors, platformColors } from '@codecademy/gamut-styles';
import cx from 'classnames';
import React, { Component } from 'react';

import styles from './styles.module.scss';

export const LOADING_COLORS = [
  deprecatedColors.purple[200],
  platformColors.purple[200],
  platformColors.purple[300],
  platformColors.purple[400],
  platformColors.purple[500],
  deprecatedColors.blue[300],
];

export type LoadingScreenProps = {
  loadingColor?: string;
  hiddenObject?: object | string | null;
  stretchToFit?: boolean;
  className?: string;
};

export class LoadingScreen extends Component<LoadingScreenProps> {
  background = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.props.hiddenObject && this.background.current) {
      this.background.current.style.opacity = '0';
    }
  }

  componentDidUpdate(prevProps: LoadingScreenProps) {
    if (this.props.hiddenObject && !prevProps.hiddenObject) {
      window.requestAnimationFrame(this.tryFadeOutBackground);
    }
  }

  tryFadeOutBackground = () => {
    if (!this.background.current) {
      setTimeout(this.tryFadeOutBackground);
      return;
    }

    this.background.current.style.transition = 'opacity 0.8s';
    this.background.current.style.opacity = '0';
  };

  render() {
    const { loadingColor, stretchToFit, className } = this.props;
    return (
      <div
        className={cx(
          styles.loadingScreen,
          stretchToFit && styles.stretchToFit,
          className
        )}
        style={{
          backgroundColor: loadingColor || LOADING_COLORS[0],
        }}
        ref={this.background}
      />
    );
  }
}
