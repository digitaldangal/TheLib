import PropTypes from 'prop-types';

import Head from 'next/head';

import withLayout from '../lib/withLayout';

const Index = ({ user }) => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index page</title>
      <meta name="description" content="This is SEO description of Index page" />
    </Head>
    <p>Content on Index page</p>
    <p>Email: {user.email}</p>
  </div>
);

// Static method that passes data to a page by populating the props of my component
Index.getInitialProps = async ({ query }) => ({ user: query.user });

// Passing user prop to Index
Index.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withLayout(Index);
