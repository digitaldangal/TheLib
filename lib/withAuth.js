/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';

let globalUser = null;

function withAuth(BaseComponent) {
	class App extends React.Component {
		static propTypes = {
			user: PropTypes.shape({
				displayName: PropTypes.string,
				email: PropTypes.string.isRequired,
			}),
			isFromServer: PropTypes.bool.isRequired,
		};

		static defaultProps = {
			user: null,
		};

		static async getInitialProps(ctx) {
			const isFromServer = !!ctx.req; // ensure that context(ctx) is rendered on the server
			// if ctx.req isn;t defined in the server, it's undefined on the client and we get !!undefined = false
      // if ctx.req is rendered on the server and exist on the client, we get !!value = true
      // The first bang (!) converts an object to boolean and denies it. The second bang 
      // denies that boolean. Remember, undefined is falsy, meaning !undefined is true and !!undefined is false.
			const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

			if (isFromServer && user) {
        // Converting Mongo's user._id to a string for the client side
				user._id = user._id.toString();
			}

			const props = { user, isFromServer };

			// Call child component's "getInitialProps", if it's defined
			if (BaseComponent.getInitialProps) {
				Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
			}

			return props;
		}

		componentDidMount() {
			if (this.props.isFromServer) {
				globalUser = this.props.user;
			}
		}

		render() {
			return <BaseComponent {...this.props} />;
		}
	}

	return App;
}

export default withAuth;
