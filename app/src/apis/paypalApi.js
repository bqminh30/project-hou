let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId = 'Acznkr8xl6vXd6E9vCIP9WGdTToq4BnzBjerQ1DObiYCJfp7yMO11RdpkRcqOCGm-Y1RAoTiPwPTIwYn';
let secretKey = 'EHLgb25ODJJC_jgB0IdxtoBI1f7ggS7ho3ZoXAhn078clhQLu9s7apppoqZynL4wJlojKcjTlL-EzRoN';


let orderDetail = {
    "intent": "CAPTURE",
    "purchase_units": [
        {
            "items": [
                {
                    "name": "T-Shirt",
                    "description": "Green XL",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "200.00"
                    }
                }
            ],
            "amount": {
                "currency_code": "USD",
                "value": "200.00",
                "breakdown": {
                    "item_total": {
                        "currency_code": "USD",
                        "value": "200.00"
                    }
                }
            }
        }
    ],
    "redirect_urls": {
        "return_url": "https://be-nodejs-project.vercel.app/process",
        "cancel_url": "https://be-nodejs-project.vercel.app/cancel"
    },
}


const generateToken = () => {
    var headers = new Headers()
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const { access_token } = JSON.parse(result)
            resolve(access_token)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const createOrder = (token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(orderDetail)
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}


export default {
    generateToken,
    createOrder,
    capturePayment
}