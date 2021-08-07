import classNames from "classnames";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
export const Paypal = ({ active }) => {
  return (
    <div
      className={classNames("react-tabs__tab-panel", {
        "react-tabs__tab-panel--selected": active,
      })}
      role="tabpanel"
      id="react-tabs-3"
      aria-labelledby="react-tabs-2"
    >
      <div>
        <p className="cf-text-h6 cf-py-9 cf-text--center cf-invert">
          You will continue to PayPal to complete your purchase
        </p>
        <div className="cf-input cf-col-12">
          <p className="cf-text-x-small cf-theme-light">
            By completing your order through PayPal, you will have full access
            to to the assigned project and live classes.
          </p>
        </div>
        <div className="cf-my-4">
          <PayPalButtons
            fundingSource={FUNDING.PAYPAL}
            style={{ color: "black", shape: "pill", label: "checkout" }}
          />
        </div>
      </div>
    </div>
  );
};
