/* eslint-disable */
import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

import MenuDrop from './MenuDrop';

import { styleToolbar, styleRaisedButton } from './SharedStyles';

const optionsMenuCustomer = [
	{
		text: 'My books',
		href: '/customer/my-books',
		as: '/my-books',
	},
	{
		text: 'Log out',
		href: '/logout',
	},
];

const optionsMenuAdmin = [
	{
		text: 'Admin',
		href: '/admin',
	},
	{
		text: 'Log out',
		href: '/logout',
	},
];

function Header({ user, hideHeader, redirectUrl }) {
	return (
		<div
			style={{
				overflow: 'hidden',
				position: 'relative',
				display: 'block',
				top: hideHeader ? '-64px' : '0px',
				transition: 'top 0.5s ease-in',
			}}
		>
			<Toolbar style={styleToolbar}>
				<Grid container direction="row" justify="space-around" alignItems="center">
					<Grid item sm={6} xs={1} style={{ textAlign: 'left' }}>
						{!user ? (
							<Link prefetch href="/">
								<Avatar
									src="https://storage.googleapis.com/thelib/thelib.png"
									alt="The Lib logo"
									style={{ margin: '0px auto 0px 10px', cursor: 'pointer' }}
								/>
							</Link>
						) : null}
					</Grid>
					<Grid item sm={2} xs={2} style={{ textAlign: 'right' }}>
						{user && user.isAdmin && !user.isGithubConnected ? (
							<Hidden smDown>
								<a href="/auth/github">
									<Button variant="raised" color="primary" style={styleRaisedButton}>
										Connect Github
									</Button>
								</a>
							</Hidden>
						) : null}
					</Grid>
					<Grid item sm={4} xs={9} style={{ textAlign: 'right' }}>
						{user ? (
							<div style={{ whiteSpace: ' nowrap' }}>
								{!user.isAdmin ? (
									<MenuDrop
										options={optionsMenuCustomer}
										src={user.avatarUrl}
										alt={user.displayName}
									/>
								) : null}
								{user.isAdmin ? (
									<MenuDrop
										options={optionsMenuAdmin}
										src={user.avatarUrl}
										alt={user.displayName}
									/>
								) : null}
							</div>
						) : (
							<Link
								prefetch
								href={{ pathname: '/public/login', asPath: '/login', query: { redirectUrl } }}
							>
								<a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
							</Link>
						)}
					</Grid>
				</Grid>
			</Toolbar>
		</div>
	);
}
// Types of props
Header.propTypes = {
	user: PropTypes.shape({
		avatarUrl: PropTypes.string,
		displayName: PropTypes.string,
	}),
	hideHeader: PropTypes.bool,
	redirectUrl: PropTypes.string,
};

Header.defaultProps = {
	user: null,
	hideHeader: false,
	redirectUrl: '',
};

export default Header;

// https://github.com/zeit/next.js/#routing
// https://eslint.org/docs/rules/object-shorthand