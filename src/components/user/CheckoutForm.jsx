import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import '../../stripe.css'
import { saveOrder } from "../../api/User";
import useEcomStore from "../../store/Ecom_store";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useEcomStore((state) => state.token)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const payload  = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    if (payload.error) {
        setMessage(error.message)
    } else {
        // Create order
        saveOrder(token, payload)
          .then((res) => {
              // console.log(res)
          })
          .catch((err) => {
              console.log(err)
          })
    }
    setIsLoading(false)
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
        <form 
            className="space-y-6"
            id="payment-form" onSubmit={handleSubmit}
        >
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button
              className="stripe-button"
              disabled={isLoading || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">
                {
                  isLoading 
                  ? <div className="spinner" id="spinner"></div>
                  : "Pay now"
                }
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
        <div id="dpm-annotation">
            <p>
                Payment methods are dynamically displayed based on cutomer
                <a
                    href="https://stripe.com/docs/payments/payment-methods/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn more
                </a>
            </p>
        </div>
    </>
  );
}
