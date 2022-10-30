//domain/.netlify/functions/create-payment-intent
const REACT_APP_STRIPE_SECRET_KEY =
  'sk_test_51KpppUAyTlZOsQoKy9fYYcn0RWpr3sz48BgGXhQw3K5ZzLFOeZhODwkDNPyg4l4UNPzV6skfU5NqIC2JEZuh2LMB00mO0Fnc7v';

const stripe = require('stripe')(REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const { total_amount } = JSON.parse(event.body);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total_amount,
        currency: 'vnd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'create payment intent',
  };
};
