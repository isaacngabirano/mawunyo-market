// Mock payment system that replaces Razorpay integration
import crypto from "crypto";

class MockPaymentGateway {
  constructor() {
    this.orders = {
      create: this.createOrder.bind(this),
    };
    this.payments = {
      refund: this.refundPayment.bind(this),
      fetch: this.fetchPayment.bind(this),
    };
  }

  createOrder(options, callback) {
    // Generate a mock order ID
    const orderId = `mock_order_${Date.now()}`;
    callback(null, { id: orderId });
  }

  refundPayment(payId, options) {
    return new Promise((resolve) => {
      // Simulate successful refund
      resolve({ id: `refund_${Date.now()}`, status: "processed" });
    });
  }

  fetchPayment(paymentId, options, callback) {
    // Return mock payment data
    callback(null, { amount: options.amount || 1000 });
  }
}

// Create mock instance
const instance = new MockPaymentGateway();

export default instance;

// Mock payment verification
export const paymentVery = (razorpayRes) => {
  return new Promise((resolve) => {
    // Always verify payment in mock system
    resolve(true);
  });
};

// Mock refund function
export const refundPayment = ({ payId, price }) => {
  return new Promise((resolve) => {
    // Simulate successful refund
    resolve();
  });
};

// Mock payment generation
export const generateRazorpay = (amount, callback) => {
  const mockOrderId = `mock_order_${Date.now()}`;
  callback(mockOrderId);
};

// Mock payment fetching
export const fetchPayment = (paymentId, callback) => {
  callback(1000); // Mock amount in smallest currency unit
};

// ==============================================================================


// import Razorpay from 'razorpay'
// import crypto from 'crypto'

// var instance = new Razorpay({
//     key_id: process.env.RAZORPAY_ID,
//     key_secret: process.env.RAZORPAY_SECREt
// })

// export default instance

// export const paymentVery = (razorpayRes) => {
//     return new Promise((resolve, reject) => {
//         let body = razorpayRes.razorpay_order_id + "|" + razorpayRes.razorpay_payment_id;

//         let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECREt)
//             .update(body.toString())
//             .digest('hex')

//         if (expectedSignature === razorpayRes.razorpay_signature) {
//             resolve(true)
//         } else {
//             reject()
//         }

//     })
// }

// export const refundPayment = ({ payId, price }) => {
//     return new Promise((resolve, reject) => {
//         instance.payments.refund(payId, {
//             "amount": price * 100,
//             "speed": "normal",
//         }).then((done) => {
//             resolve()
//         }).catch((err) => {
//             reject()
//         })
//     })
// }

// export const generateRazorpay = (amount, callback) => {
//     var options = {
//         amount: amount,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: `${Date.now() + Math.random()}`
//     };
//     instance.orders.create(options, function (err, order) {
//         if (!err) {
//             callback(order.id)
//         } else {
//             callback(null)
//         }
//     });
// }

// export const fetchPayment = (paymentId, callback) => {
//     instance.payments.fetch(paymentId, { "expand[]": "card" }, (err, done) => {
//         if (!err) {
//             callback(done.amount)
//         } else {
//             callback(null)
//         }
//     })
// }
