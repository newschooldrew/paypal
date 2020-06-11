const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const request = require('request');

const paypal = require('@paypal/checkout-server-sdk');
  
// Creating an environment
let clientId = "AU0ErApCQ95X84DgRuowQCW0muyyFJJ1w6fRnBw4ed6XqiuA15mCyZNg7NBePykJdl-NAxteKGOB4dPy";
let clientSecret = "ELj8FRFGjhjAZvedgvTvhRZcwfbtXDC0j5jxmMv4F7oVzkQc4BU3JK5LZCQZMwVad-z0X62F8yCOWCxY";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);
app.use(bodyParser.json())

////////////////CREATE INVOICE////////////////

app.post('/send-invoice',(req,res)=>{

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer A21AAFiu2UImpSSTECTSdWLeYUi1SLM-h7kfTLhBRmQZ6NxWmAndUfjnlwmvq6_xDYhtZR8Cx6yqux0ROgOAGneBDGPEYveRA'
        };

        const dataString = {
        "send_to_invoicer": true
        };

        const options = {
            url: 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-UUEV-37B9-827R-T9KS/send',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req.body)
        };

        function callback(error, response, body) {
            console.log("err " + error)
            if(response){
                console.log(response.statusCode)
            }
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }

        request(options, callback);
        res.end()
})

app.post('/create-invoice',(req,res)=>{

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A21AAFiu2UImpSSTECTSdWLeYUi1SLM-h7kfTLhBRmQZ6NxWmAndUfjnlwmvq6_xDYhtZR8Cx6yqux0ROgOAGneBDGPEYveRA'
    };
    
    const dataString = {
        "detail": {
          "invoice_number": "123",
          "reference": "deal-ref",
          "invoice_date": "2020-06-10",
          "currency_code": "USD",
          "note": "Thank you for your business.",
          "term": "No refunds after 30 days.",
          "memo": "This is a long contract",
          "payment_term": {
            "term_type": "DUE_ON_DATE_SPECIFIED",
            "due_date": "2020-06-11"
          }
        },
        "invoicer": {
          "name": {
            "given_name": "David",
            "surname": "Larusso"
          },
          "address": {
            "address_line_1": "1234 First Street",
            "address_line_2": "337673 Hillside Court",
            "admin_area_2": "Anytown",
            "admin_area_1": "CA",
            "postal_code": "98765",
            "country_code": "US"
          },
          "email_address": "sb-mz0ml2223732@business.example.com",
          "phones": [
            {
              "country_code": "001",
              "national_number": "4085551234",
              "phone_type": "MOBILE"
            }
          ],
          "website": "www.test.com",
          "tax_id": "ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy-Jb5SeuGj185MNNw6g",
          "logo_url": "https://example.com/logo.PNG",
          "additional_notes": "2-4"
        },
        "primary_recipients": [
          {
            "billing_info": {
              "name": {
                "given_name": "Stephanie",
                "surname": "Meyers"
              },
              "address": {
                "address_line_1": "1234 Main Street",
                "admin_area_2": "Anytown",
                "admin_area_1": "CA",
                "postal_code": "98765",
                "country_code": "US"
              },
              "email_address": "sb-b9s6y2183020@personal.example.com",
              "phones": [
                {
                  "country_code": "001",
                  "national_number": "4884551234",
                  "phone_type": "HOME"
                }
              ],
              "additional_info_value": "add-info"
            },
            "shipping_info": {
              "name": {
                "given_name": "Stephanie",
                "surname": "Meyers"
              },
              "address": {
                "address_line_1": "1234 Main Street",
                "admin_area_2": "Anytown",
                "admin_area_1": "CA",
                "postal_code": "98765",
                "country_code": "US"
              }
            }
          }
        ],
        "items": [
          {
            "name": "Yoga Mat",
            "description": "Elastic mat to practice yoga.",
            "quantity": "1",
            "unit_amount": {
              "currency_code": "USD",
              "value": "50.00"
            },
            "tax": {
              "name": "Sales Tax",
              "percent": "7.25"
            },
            "discount": {
              "percent": "5"
            },
            "unit_of_measure": "QUANTITY"
          },
          {
            "name": "Yoga t-shirt",
            "quantity": "1",
            "unit_amount": {
              "currency_code": "USD",
              "value": "10.00"
            },
            "tax": {
              "name": "Sales Tax",
              "percent": "7.25"
            },
            "discount": {
              "amount": {
                "currency_code": "USD",
                "value": "5.00"
              }
            },
            "unit_of_measure": "QUANTITY"
          }
        ],
        "configuration": {
          "partial_payment": {
            "allow_partial_payment": true,
            "minimum_amount_due": {
              "currency_code": "USD",
              "value": "20.00"
            }
          },
          "allow_tip": true,
          "tax_calculated_after_discount": true,
          "tax_inclusive": false,
          "template_id": ""
        },
        "amount": {
          "breakdown": {
            "custom": {
              "label": "Packing Charges",
              "amount": {
                "currency_code": "USD",
                "value": "10.00"
              }
            },
            "shipping": {
              "amount": {
                "currency_code": "USD",
                "value": "10.00"
              },
              "tax": {
                "name": "Sales Tax",
                "percent": "7.25"
              }
            },
            "discount": {
              "invoice_discount": {
                "percent": "5"
              }
            }
          }
        }
      }
    
    const options = {
        url: 'https://api.sandbox.paypal.com/v2/invoicing/invoices',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(req.body)
    };

    console.log(typeof options.body)
    
    function callback(err, res, body) {
        console.log("err is " + err)
        if(res){
            console.log(res)
        }
        if (!err && res.statusCode == 200) {
            console.log(body);
        }
    }

        request(options, callback);
        res.end()

    })


////////////////CREATE PLAN////////////////

app.post('/create-plan',(req,res)=>{

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A21AAFiu2UImpSSTECTSdWLeYUi1SLM-h7kfTLhBRmQZ6NxWmAndUfjnlwmvq6_xDYhtZR8Cx6yqux0ROgOAGneBDGPEYveRA',
        'PayPal-Request-Id': 'PLAN-18062019-019'
    };
    
    const dontuse = {
      "product_id": "PROD-4P610727L35047216",
      "name": "Okay Video Streaming Service Plan",
      "description": "Okay Video Streaming Service basic plan",
      "status": "ACTIVE",
      "billing_cycles": [
        {
          "frequency": {
            "interval_unit": "MONTH",
            "interval_count": 1
          },
          "tenure_type": "TRIAL",
          "sequence": 1,
          "total_cycles": 1,
          "pricing_scheme": {
            "fixed_price": {
              "value": "10",
              "currency_code": "USD"
            }
          }
        },
        {
          "frequency": {
            "interval_unit": "MONTH",
            "interval_count": 1
          },
          "tenure_type": "REGULAR",
          "sequence": 2,
          "total_cycles": 12,
          "pricing_scheme": {
            "fixed_price": {
              "value": "12.99",
              "currency_code": "USD"
            }
          }
        }
      ],
      "payment_preferences": {
        "auto_bill_outstanding": true,
        "setup_fee": {
          "value": "10",
          "currency_code": "USD"
        },
        "setup_fee_failure_action": "CONTINUE",
        "payment_failure_threshold": 3
      },
      "taxes": {
        "percentage": "10",
        "inclusive": false
      }
    };
    
    console.log(req.body)

    const options = {
        url: 'https://api.sandbox.paypal.com/v1/billing/plans',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(req.body)
    };
    
    console.log(typeof options.headers)
    console.log(typeof options.body)

    function callback(err, res, body) {
        console.log("err is " + err)
        if(res){
            console.log(res.statusCode)
        }
        if (!err && res.statusCode == 200) {
            console.log("body " + body);
        }
    }
    
    request(options, callback);
    res.end()

})


////////////////POST////////////////

app.post('/create-product',(req,res)=>{
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A21AAFiu2UImpSSTECTSdWLeYUi1SLM-h7kfTLhBRmQZ6NxWmAndUfjnlwmvq6_xDYhtZR8Cx6yqux0ROgOAGneBDGPEYveRA'
    };
    
    const dataString = {
      "name": "Yet Another Video Streaming Service",
      "description": "Yet Another Video streaming service",
      "type": "SERVICE",
      "category": "SOFTWARE",
      "image_url": "https://example.com/streaming.jpg",
      "home_url": "https://example.com/home"
    };
    
    const options = {
        url: 'https://api.sandbox.paypal.com/v1/catalogs/products',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(req.body)
    };
    
    function callback(error, response, body) {
        if(error){
            console.log(error)
        }
        if(response){
            console.log(response)
        }
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    
    request(options, callback);
    res.end()
})

app.post('/webhooks',(req,res)=>{
    console.log('********WEBHOOK ACTIVATED**********')
    console.log(req.body.resource)
    res.end()
})

app.listen(5000,() => console.log("server is running"))