import './payment.scss';
import creditCard from 'static/images/creditcard/credit-cards.png';
import paypalLogo from 'static/images/creditcard/paypal.png';
import cx from 'classnames';
import styles from './styles.module.scss';
import { CardPayment } from './card';
import { Paypal } from './paypal';
import { useState } from 'react';
import sslLogo from 'static/images/svg/ssl.svg';
import { ProjectEntityResponse } from 'services/projects';

type PaymentProps = {
  project: ProjectEntityResponse,
  onClose: () => void
}
export const Payment: React.FC<PaymentProps> = ({ onClose, project }) => {
  const [active, setActive] = useState('card')
  const { pricing } = project;
  return (
    <div
      className="falcon-cart falcon-cart--visible falcon-cart--cart"
      id="falcon-cart"
    >
      <div className="falcon-cart__overlay">
        <div className="falcon-cart__content" style={{ minHeight: "0px" }}>
          <div id="falcon-cart-root">
            <div className="cart__container">
              <div className="Ir226rERU4I0qhvuVEpGr cf-theme-light">
                <div className="_38sDPlUeN5UcCxGbUPy5Ok cf-theme-dark">
                  <div className="_3DXDpF-Tilx3Yh_Sr_OtWn cf-opacity--silenced"
                  onClick={onClose}>
                    <svg
                      width="18px"
                      height="18px"
                      viewBox="0 0 18 18"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                      >
                        <g
                          id="Close"
                          transform="translate(1.000000, 1.000000)"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M0.135718093,0.552495969 L15.447504,15.8642819"
                            id="Line-Copy-26"
                          />
                          <path
                            d="M0.135718093,15.8642819 L15.447504,0.552495969"
                            id="Line-Copy-26"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div >
                    <div className="_19eKHHb5cWr0K3_u6jtsx4">
                      <div className="SAw2RY4d2Dl-Vq-CLkY0i">
                        <h2 className="cf-text-h7 cf-mb-1 cf-text--uppercase">
                          {project.title}
                        </h2>
                        <h3 className="cf-text-small cf-opacity--hinted">
                          TOTAL BILLED TODAY:{" "}
                          <span>
                            <span>{`${pricing?.currency}${pricing?.amount}`}</span>
                          </span>
                        </h3>
                        <div className="row no-gutters">
                          <p className="cf-text-small cf-opacity--hinted cf-text--italic">
                            (Plus Applicable Taxes)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="_3EAtF8GJbR2OrVOfiCsmY1">
                  <div className="react-tabs" data-tabs="true">
                    <ul className="react-tabs__tab-list" role="tablist">
                      <li
                        className={cx("react-tabs__tab", {
                            'react-tabs__tab--selected': active == 'card'
                        })}
                        role="tab"
                        onClick = {() => setActive('card')}
                        id="react-tabs-0"
                        aria-selected={active == 'card' ? 'true': 'false'}
                        aria-disabled="false"
                        aria-controls="react-tabs-1"
                      >
                        <img
                          className={styles.cardLogo}
                          src={creditCard}
                        />
                      </li>
                      <li
                        data-ba="braintree-payment-tab"
                        className={cx("react-tabs__tab", {
                            'react-tabs__tab--selected': active == 'paypal'
                        })}
                        role="tab"
                        id="react-tabs-2"
                        onClick = {() => setActive('paypal')}
                        aria-selected={active == 'paypal' ? 'true': 'false'}
                        aria-disabled="false"
                        aria-controls="react-tabs-3"
                        tabIndex={0}
                      >
                        <img
                          className={styles.cardLogo}
                          src={paypalLogo}
                        />
                      </li>
                    </ul>
                    <CardPayment active={active == 'card'} handleClose={onClose} pricing={pricing}/>
                    <Paypal active={active == 'paypal'} pricing={pricing} handleClose={onClose}/>
                  </div>
                </div>
                <div className="_3u-fWiJbiQTFS0AJOnOTrL">
                  <div className="cf-layout">
                    
                    <div className="cf-col">
                      <img
                        className="_3szSKMiTyDz8bbcYnvgfBj"
                        src={sslLogo}
                      />
                      <h4 className="_3-v34i0Y6xpjERyduYVcFD">
                        <span className="_1w_SfteqqYTLiIRIsyMqnc">
                          Have a question?
                        </span>
                        <br />
                        <span className="_3ugz5Mh2waTMrvdl_IILYb">
                          support@codefluent.org
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="falcon-cart__aap-upsell">
          <div className="falcon-cart__close falcon-cart__close--upsell">
            <img src="/assets/refresh/global/modal-close-inverted-07a5d719b0844eb31eba428258619c06a3805d5a24517d3777ceec76fbb9093c.svg" />
          </div>
          <div id="falcon-cart-aap-upsell-root" />
        </div>
        <div className="falcon-cart__gift-options">
          <div className="falcon-cart__close falcon-cart__close--gift">
            <img src="/assets/refresh/global/modal-close-inverted-07a5d719b0844eb31eba428258619c06a3805d5a24517d3777ceec76fbb9093c.svg" />
          </div>
          <div id="falcon-gift-options-root" />
        </div>
      </div>
    </div>
  );
};
