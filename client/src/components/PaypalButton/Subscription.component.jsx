import React from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios'

class Example extends React.Component{
  render() {
    return (
      <PayPalButton
      createSubscription={(data, actions) => {
          return actions.subscription.create({
              'plan_id': 'P-5LH82761FX200252CL3QRGRI'
            });          
        }}
        options={{clientId: "AU0ErApCQ95X84DgRuowQCW0muyyFJJ1w6fRnBw4ed6XqiuA15mCyZNg7NBePykJdl-NAxteKGOB4dPy", vault: true}}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
            // Show a success message to your buyer
            alert("Subscription completed");
 
            // OPTIONAL: Call your server to save the subscription
            axios.post("/success", data);
            

        }}

      />
    );
  }
}
export default Example