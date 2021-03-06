import stripe from 'stripe';

export function stripeCharge({
  amount, token, buyerEmail,
}) {
  const dev = process.env.NODE_ENV !== 'production';
  const API_KEY = dev ? process.env.Stripe_Test_SecretKey : process.env.Stripe_Live_SecretKey;
  const client = stripe(API_KEY);
  // create charge
  return client.charges.create({
    amount,
    currency: 'usd',
    source: token,
    receipt_email: buyerEmail,
    description: 'Payment for your book at thelib.tech',
  });
}

// Resources
// https://github.com/stripe/stripe-node#usage
// https://stripe.com/docs/api/node#charges
