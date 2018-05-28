/* eslint-disable */
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

// `openSnackBarFn()` was created to access `openSnackBar()` from anywhere in this app
let openSnackbarFn;

class Notifier extends React.Component {
	// open and message props from MaterialUI component props
	state = {
	  open: false, // Snackbar closed
	  message: '',
	};

	componentDidMount() {
	  openSnackbarFn = this.openSnackbar;
	}

	handleSnackbarRequestClose = () => {
	  this.setState({
	    open: false, // close Snackbar when a user clicks away
	    message: '',
	  });
	};

	// `openSnackBar()` does 2 things via state:
	// 1: Opens Snackbar `open:true`
	// 2: Pass a message prop to Snackbar component
	openSnackbar = ({ message }) => {
	  this.setState({ open: true, message });
	};

	render() {
	  const message = (
	    // Using `dangerouslySetInnerHTML=...` to allow me and others(devs)
	    // to use HTML code inside the Snackbars message prop
  <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: this.state.message }} />
	  );

	  return (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    message={message}
    autoHideDuration={5000}
    onClose={this.handleSnackbarRequestClose}
    open={this.state.open}
    SnackbarContentProps={{
					'aria-describedby': 'snackbar-message-id',
				}}
  />
	  );
	}
}

export function openSnackbar({ message }) {
  openSnackbarFn({ message });
}

export default Notifier;

// MaterialUI Props -  https://material-ui.com/api/snackbar/
// anchorOrigin (specifies Snackbar location)
// autoHideDuration (specifies Snackbar duration in ms)
// SnackbarContentProps (binds the Snackbar to an element that contains its message)
