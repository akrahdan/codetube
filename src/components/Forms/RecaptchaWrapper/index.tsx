import React, { PureComponent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export type RecaptchaWrapperProps = {
  publicKey: string;
  onChange?: (token: string) => void;
  onExpired?: () => void;
  size: 'compact' | 'invisible' | 'normal';
};
// Recaptcha prompts will not show up in local dev by default
// In order to have them show up you will need to uncomment local dev keys inside config/recaptcha.yml

export class RecaptchaWrapper extends PureComponent<RecaptchaWrapperProps> {
  static defaultProps = {
    size: 'normal',
    onExpired: () => {},
    onChange: () => {},
  };

  setCaptchaRef = (el: ReCAPTCHA) => {
    this.captcha = el;
  };

  execute = () => {
    this.captcha.execute();
  };

  captcha: ReCAPTCHA;

  render() {
    const { size, publicKey, onChange, onExpired } = this.props;

    return (
      <ReCAPTCHA
        ref={this.setCaptchaRef}
        badge="bottomright"
        size={size}
        onChange={onChange}
        onExpired={onExpired}
        sitekey={publicKey}
      />
    );
  }
}
