import React from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios'

class Example extends React.Component {
    render() {
      return (
        <PayPalButton
        style={{shape:'pill'}}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: "USD",
                  value: "0.01"
                }
              }]
            })
          }}
          onApprove={(data, actions) => {
            console.log(actions)
            // Capture the funds from the transaction
            return actions.order.capture().then(function(details) {
              // Show a success message to your buyer
              alert("Transaction completed by " + details.payer.name.given_name);
              // OPTIONAL: Call your server to save the transaction
              axios.post("/success", details)
            });
          }}
        />
      );
    }
  }
export default Example