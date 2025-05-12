import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import '../../stripe.css'
import { saveOrder } from "../../api/User";
import useEcomStore from "../../store/Ecom_store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useEcomStore((state) => state.token)
  const clearCart = useEcomStore((state) => state.clearCart)
  const navigate = useNavigate()

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

    console.log('payload', payload)
    if (payload.error) {
      setMessage(payload.error.message)
      toast.error(payload.error.message)
    } 
    else if (payload.paymentIntent.status === 'succeeded') {
      // Create order
      saveOrder(token, payload)
        .then((res) => {
          clearCart()// ลบสินค้าในตะกร้าแค่ใน local storage
          toast.success('ชำระเงินเรียบร้อย')
          navigate('/user/history')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    else {
      console.log('Something wrong')
      toast.warning('ชำระเงินไม่สำเร็จ')
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
