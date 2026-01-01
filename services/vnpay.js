const {
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
} = require("vnpay");
require("dotenv").config();

const paymentVNPAY = async (orderid, totalprice, returnurl, res) => {
  const vnpay = new VNPay({
    tmnCode: process.env.VNPAY_TMN_CODE, // Your TMN code
    secureSecret: process.env.VNPAY_SECRET, // Your secure secret
    vnpayHost: "https://sandbox.vnpayment.vn", // VNPAY host URL
    testMode: true, // Set to false for production
    hashAlgorithm: "SHA512", // Hash algorithm to use
    loggerFn: ignoreLogger, // Use ignoreLogger to disable logging
  });

  console.log("VNPay Tmncode .env:", process.env.VNPAY_TMN_CODE);
  console.log("VNPay Secure Secret .env:", process.env.VNPAY_SECRET);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow's date

  const vnpayResponse = await vnpay.buildPaymentUrl({
    vnp_Amount: totalprice, // Amount in VND
    vnp_IpAddr: "127.0.0.1",
    vnp_TxnRef: orderid, // Unique transaction reference
    vnp_OrderInfo: `Payment for order ${orderid}`, // Description of the transaction
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: `${returnurl}/api/v1/payment/check-payment-vnpay`,
    vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
    vnp_CreateDate: dateFormat(new Date()), // Current date in yyyymmddHHmmss format
    vnp_ExpireDate: dateFormat(tomorrow),
  });

  return res.status(201).json(vnpayResponse);
};

module.exports = {
  paymentVNPAY,
};
