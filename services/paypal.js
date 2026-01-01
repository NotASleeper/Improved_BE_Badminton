const axios = require("axios");
require("dotenv").config();

async function generateAccessToken() {
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });

  return response.data.access_token;
}

const PaymentPaypal = async (orderid, totalprice, returnurl, res) => {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (totalprice / 27000).toFixed(2).toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: (totalprice / 27000).toFixed(2).toString(),
              },
            },
          },
        },
      ],
      application_context: {
        return_url: `${returnurl}/api/v1/payment/paypal/check-payment-paypal?orderid=${orderid}`,
        cancel_url: `http://localhost:3030/paymentfailed?orderId=${orderid}`,
        shipping_preference: "NO_SHIPPING", // Không yêu cầu địa chỉ giao hàng
        user_action: "PAY_NOW", // Hiển thị nút thanh toán ngay
        brand_name: "BadmintonGear", // Tên thương hiệu của bạn
      },
    }),
  });

  return res
    .status(201)
    .send(
      `"${response.data.links.find((link) => link.rel === "approve").href}"`
    );
};

const capturePayment = async (orderid) => {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderid}/capture`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log("Capture response:", response.data);
  return response.data;
};

module.exports = {
  PaymentPaypal,
  capturePayment,
};
