import classNames from "classnames";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js/types/components/buttons'
import { useEffect, useState } from "react";
import { ProjectPricing, useCheckoutMutation } from "services/projects";
type PaypalProps = {
  active: boolean,
  handleClose: () => void,
  pricing: ProjectPricing
}
export const Paypal: React.FC<PaypalProps> = ({ active, handleClose, pricing }) => {
  //const [amount, setAmount] = useState("43.00");
  const [orderID, setOrderID] = useState("");
  const [onApproveMessage, setOnApproveMessage] = useState("");
  const [onErrorMessage, setOnErrorMessage] = useState("");
  const [checkout] = useCheckoutMutation()
  const createOrder = (
    data: Record<string, unknown>,
    actions: CreateOrderActions
  ) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: pricing?.amount,
            },
          },
        ],
      })
      .then((orderID) => {

        return orderID;

      });
  }

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    const cart_id = localStorage.getItem('cart_id')
    return checkout({
        orderID: data.orderID,
        cart_id
      }).then((res) => {
        console.log(res)
        setOrderID(orderID);
        // handleClose()
       

      })
    
  }

  const onError = (err: Record<string, unknown>) => {
    setOnErrorMessage(err.toString());
    console.log('Error: ', err.toString())

  }

 
 if(!pricing) return null;

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
            createOrder={createOrder}
            onApprove={onApprove}
            
            onError={onError}
            forceReRender={[pricing?.amount]}
          />
        </div>
      </div>
    </div>
  );
};
