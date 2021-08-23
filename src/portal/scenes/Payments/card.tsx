import classNames from "classnames";
import styles from "./styles.module.scss";
import logo from "static/images/brand/logo/code.png";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { ProjectPricing, useCheckoutWaveMutation } from "services/projects";
import { useAuth } from "store/useAuth";

type CardProps = {
  pricing: ProjectPricing,
  active: boolean,
  handleClose: () => void
}

export const CardPayment: React.FC<CardProps> = ({ active, handleClose, pricing }) => {
  const [checkoutWave] = useCheckoutWaveMutation();
  const { user } = useAuth()
  const config = {
    public_key: "FLWPUBK_TEST-4b961393b29fe0236bb5a0e76351a99b-X",
    tx_ref: `${Date.now()}`,
    amount: Number(pricing?.amount),
    currency: "USD",
    payment_options: "card",
    customer: {
      email: user?.email,
      phonenumber: '+23453444444',
      name: user?.username,
    },
    customizations: {
      title: "Codefluent Payment",
      description: "Payment for items in cart",
      logo
  
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  if(!pricing) return null;
  return (
    <div
      className={classNames("react-tabs__tab-panel", {
        "react-tabs__tab-panel--selected": active,
      })}
      role="tabpanel"
      id="react-tabs-1"
      aria-labelledby="react-tabs-0"
    >
      <p className="cf-text-h6 cf-py-9 cf-text--center cf-invert">
        You will continue to Flutterwave to complete your card payments
      </p>
      <form>
        <div className="cf-forms cf-layout">
          <div className="cf-input cf-col-12">
            <p data-ba="cart-terms" className="cf-text-x-small cf-theme-light">
              By clicking "Place Secure Order", Your payment method will be
              charged the price above to enable you have full access to the
              ordred project.
            </p>
          </div>
          <div className={styles.orderBtn}>
            <button
              onClick={() => {
                handleClose();
                handleFlutterPayment({
                  callback: (response) => {
                    const cart_id = localStorage.getItem('cart_id')
                    checkoutWave({
                      txRef: response.tx_ref,
                      cart_id
                    }).then((res) => {
                      closePaymentModal();
                    });
                    // this will close the modal programmatically
                  },
                  onClose: () => {},
                });
              }}
              className="c-button c-button--full-width c-button--primary c-button--md"
              type="submit"
              data-ba="CompleteOrderButton"
            >
              Place Secure Order
            </button>
            <div className={styles.orderSecurity}>
              <p>
                <svg
                  height="32px"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <desc />
                  <defs />
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="none"
                    strokeWidth={1}
                  >
                    <g>
                      <path d="M16,21.9146472 L16,24.5089948 C16,24.7801695 16.2319336,25 16.5,25 C16.7761424,25 17,24.7721195 17,24.5089948 L17,21.9146472 C17.5825962,21.708729 18,21.1531095 18,20.5 C18,19.6715728 17.3284272,19 16.5,19 C15.6715728,19 15,19.6715728 15,20.5 C15,21.1531095 15.4174038,21.708729 16,21.9146472 L16,21.9146472 Z M9,14.0000125 L9,10.499235 C9,6.35670485 12.3578644,3 16.5,3 C20.6337072,3 24,6.35752188 24,10.499235 L24,14.0000125 C25.6591471,14.0047488 27,15.3503174 27,17.0094776 L27,26.9905224 C27,28.6633689 25.6529197,30 23.991212,30 L9.00878799,30 C7.34559019,30 6,28.652611 6,26.9905224 L6,17.0094776 C6,15.339581 7.34233349,14.0047152 9,14.0000125 L9,14.0000125 L9,14.0000125 Z M12,14 L12,10.5008537 C12,8.0092478 14.0147186,6 16.5,6 C18.9802243,6 21,8.01510082 21,10.5008537 L21,14 L12,14 L12,14 L12,14 Z" />
                    </g>
                  </g>
                </svg>
                Secured with SSL
              </p>
              <p>Satisfaction Guaranteed</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
