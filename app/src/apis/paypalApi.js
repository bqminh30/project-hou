let baseUrl = "https://api-m.sandbox.paypal.com";
const base64 = require("base-64");

let clientId =
  "Acznkr8xl6vXd6E9vCIP9WGdTToq4BnzBjerQ1DObiYCJfp7yMO11RdpkRcqOCGm-Y1RAoTiPwPTIwYn";
let secretKey =
  "EHLgb25ODJJC_jgB0IdxtoBI1f7ggS7ho3ZoXAhn078clhQLu9s7apppoqZynL4wJlojKcjTlL-EzRoN";

let orderDetail = {
  intent: "CAPTURE",
  "status": "APPROVED",
  "payer": {
    "email_address": "bqminh30@gmail.com"
},
  purchase_units: [
    {
      amount: {
        value: "8",
        currency_code: "USD",
        breakdown: {
          item_total: { value: "7", currency_code: "USD" },
          tax_total: {value: "1", currency_code: "USD"}
        },
      },
      invoice_id: "muesli_invoice_id",
      items: [
        {
          name: "Hafer",
          unit_amount: { value: "3", currency_code: "USD" },
          quantity: "1",
          sku: "haf001",
        },
        {
          name: "Discount",
          unit_amount: { value: "4", currency_code: "USD" },
          quantity: "1",
          sku: "dsc002",
        },
      ],
    },
  ],
  "application_context":{
    "user_action":"PAY_NOW",
    "return_url":"https://example.com/",// Very important
    "cancel_url":"https://example.com/"
},
};

const generateToken = () => {
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + base64.encode(`${clientId}:${secretKey}`)
  );

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: "grant_type=client_credentials",
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v1/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const { access_token } = JSON.parse(result);
        resolve(access_token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createOrder = (token = "") => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };
  console.log("requestOptions", requestOptions);

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v2/checkout/orders", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const capturePayment = (id, token = "") => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result print 3", result);
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
