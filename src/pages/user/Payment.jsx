import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import { payment } from "../../api/Stripe";
import useEcomStore from "../../store/Ecom_store";
import CheckoutForm from "../../components/user/CheckoutForm";

// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51RM2YiRH21b9sie2pZI7ZG9lFpRu8i8Hg8CZ4GnbtFluU1NavMjKfqpNfF26hooYs2uwhE4jbEA9I8kwQVXPduMf005RVjPeLo")

export default function Payment() {
  const token = useEcomStore((state) => state.token)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    payment(token)
    .then((res) => {
      setClientSecret(res.data.clientSecret)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const appearance = {
    theme: 'stripe'
  }
  const loader = 'auto'
  
  return (
    <div className="h-svh">
      {
        clientSecret && (
          <Elements 
            options={{clientSecret, appearance, loader}}
            stripe={stripePromise}
          >
            <CheckoutForm/>
          </Elements>
        )
      }
    </div>
  )
}

