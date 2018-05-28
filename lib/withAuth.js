/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
// import moduleName from '';

let globalUser = null;

export default (
	Page,
	{ loginRequired = true, logoutRequired = false, adminRequired = false } = {},
) =>
	class BaseComponent extends React.Component {
		static propTypes = {
			user: PropTypes.shape({
				id: PropTypes.string,
				isAdmin: PropTypes.bool,
			}),
			isFromServer: PropTypes.bool.isRequired,
		};

		static defaultProps = {
			user: null,
		};
		// getInitialProps() will pass the user prop to any page that my HOC(withAuth) wraps
		static async getInitialProps(ctx) {
			const isFromServer = !!ctx.req; // ensure that context(ctx) is rendered on the server
			/**
			 *  if ctx.req isn't defined in the server, it's undefined on
					the client and we get !!undefined = false
			 * if ctx.req is rendered on the server and exist on the client, we get !!value = true
			 * The first bang (!) converts an object to boolean and denies it. The second bang
			  	denies that boolean.
			 *  Remember, undefined is falsy, meaning !undefined is true
			    and !!undefined is false.
			 */

			const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

			if (isFromServer && user) {
				// Converting Mongo's user._id to a string for the client side
				user._id = user._id.toString();
			}

			const props = { user, isFromServer };

			// Call child component's "getInitialProps", if it's defined
			if (Page.getInitialProps) {
				Object.assign(props, (await Page.getInitialProps(ctx)) || {});
			}

			return props;
		}

		componentDidMount() {
			const { user } = this.props;

			if (this.props.isFromServer) {
				globalUser = this.props.user;
			}

			if (loginRequired && !logoutRequired && !user) {
				Router.push('/public/login', '/login');
				return;
			}

			if (adminRequired && (!user || !user.isAdmin)) {
				Router.push('/');
			}

			if (logoutRequired && user) {
				Router.push('/');
			}
		}
		render() {
			const { user } = this.props;
			if (loginRequired && !logoutRequired && !user) {
				return null;
			}

			if (adminRequired && (!user || !user.isAdmin)) {
				return null;
			}

			if (logoutRequired && user) {
				return null;
			}
			return <Page {...this.props} />;
		}
	};
