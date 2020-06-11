import React, { Component } from 'react'
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

class PaypalButton extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          showButtons: false,
          loading: true,
          paid: false
        };
    
        window.React = React;
        window.ReactDOM = ReactDOM;
      }

      componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    
        if (isScriptLoaded && isScriptLoadSucceed) {
          PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
          this.setState({ loading: false, showButtons: true });
        }
      }
    
      componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    
        const scriptJustLoaded =
          !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;
    
        if (scriptJustLoaded) {
          if (isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", {
              React,
              ReactDOM
            });
            this.setState({ loading: false, showButtons: true });
          }
        }
      }

      createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "shirt",
              amount: {
                currency_code: "USD",
                value: 20
              }
            }
          ]
        });
      };
    
      onApprove = (data, actions) => {
        actions.order.capture().then(details => {
          const paymentData = {
            payerID: data.payerID,
            orderID: data.orderID
          };
          console.log("Payment Approved: ", paymentData);
          this.setState({ showButtons: false, paid: true });
        });
      };

      render() {
        const { showButtons, loading, paid } = this.state;
    
        return (
          <div className="main">
    
            {showButtons && (
              <div>
                <div>
                  <h2>Items: Stuff</h2>
                  <h2>Total checkout Amount $200</h2>
                </div>
    
                <PayPalButton
                  createOrder={(data, actions) => this.createOrder(data, actions)}
                  onApprove={(data, actions) => this.onApprove(data, actions)}
                />
              </div>
            )}
    
            {paid && (
              <div className="main">
                <h2>
                    You just bought it
                </h2>
              </div>
            )}
          </div>
        );
      }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${AU0ErApCQ95X84DgRuowQCW0muyyFJJ1w6fRnBw4ed6XqiuA15mCyZNg7NBePykJdl-NAxteKGOB4dPy}`)(PaypalButton);