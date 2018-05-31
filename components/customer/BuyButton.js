/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';

import Button from 'material-ui/Button';

import { buyBook } from '../../lib/api/customer';
import notify from '../../lib/notifier';
// Conditional code
import env from '../../lib/env';
// Access the key
const { StripePublishableKey } = env;

const styleBuyButton = {
  margin: '20px 20px 20px 0px',
  font: '14px Muli',
};

class BuyButton extends React.Component {
  // propTypes and defaultProps
  static propTypes = {
    book: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    showModal: PropTypes.bool,
  };

  static defaultProps = {
    book: null,
    user: null,
    showModal: false,
  };
  // Set initial state
  constructor(props) {
    super(props); // make props available inside constructor

    this.state = {
      // !!props.showModal makes sure that when showModal is true in ReadChapter pg
      // and is also true in this component
      showModal: !!props.showModal,
    };
  }
  // Call the buyBook() API and communicate success to the user
  // When a user clicks BuyButton, the code calls the onToken()
  onToken = async (token) => {
    NProgress.start();
    const { book } = this.props;
    // After the user clicks the btn, close the modal(Stripe modal w/ CC form)
    this.setState({ showModal: false });

    try {
      // Then, call and wait for success to fire from buyBook(stripeToken, book)
      await buyBook({ stripeToken: token, id: book._id });
      notify('Success!');
      // Reloads a page from the server
      window.location.reload(true);
      NProgress.done();
    } catch (err) {
      NProgress.done();
      notify(err);
    }
  };
  // If a user is NOT logged in, redirect them back to Google OAuth
  onLoginClicked = () => {
    // user prop from ReadChapter to BuyButton component
    const { user } = this.props;

    if (!user) {
      const redirectUrl = `${window.location.pathname}?buy=1`;
      window.location.href = `/auth/google?redirectUrl=${redirectUrl}`;
    }
  };

  render() {
    // Destructor the constants
    const { book, user } = this.props;
    const { showModal } = this.state;

    if (!book) {
      return null;
    }
    if (!user) { // If a user is NOT logged in, load MaterialUI btn that fires onLoginClicked()
      return (
        <div>
          <Button
            variant="raised"
            style={styleBuyButton}
            color="primary"
            onClick={this.onLoginClicked}
          >
            Buy book for ${book.price}
          </Button>
        </div>
      );
    }

    return (
      // If a user IS logged in, load MaterialUI btn but inside of a StripeCheckout component that requires 2 props
      // stripeKey and token. stripeKey could be grabbed from StripeAPI
      <StripeCheckout
        stripeKey={StripePublishableKey}
        token={this.onToken}
        name={book.name}
        amount={book.price * 100}
        email={user.email}
        desktopShowModal={showModal || null}
      >
        <Button variant="raised" style={styleBuyButton} color="primary">
          Buy book for ${book.price}
        </Button>
      </StripeCheckout>
    );
  }
}

export default BuyButton;

// Resources
// https://github.com/azmenak/react-stripe-checkout
// https://github.com/azmenak/react-stripe-checkout/pull/15
// https://github.com/azmenak/react-stripe-checkout#requirements
// https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
// https://www.w3schools.com/jsref/prop_loc_pathname.asp
