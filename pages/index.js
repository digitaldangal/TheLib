/* eslint-disable */
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';


import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  styleBigAvatar,
  styleRaisedButton,
  styleHomepageFeature,
  styleH1,
} from '../components/SharedStyles';

import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';

const styleTeamMember = {
  textAlign: 'center',
  padding: '10px 5%',
};

const Index = ({ user }) => (
  <div>
    <Head>
      <title>The Lib</title>
      <meta
        name="description"
        content="Open source web app built with modern JavaScript stack: React, Material UI, Next, Express, Mongoose, and MongoDB. Integrated with AWS SES, Github, Google OAuth, Stripe, and MailChimp."
      />
    </Head>
    <Header user={user} />
    <div style={{ padding: '10px 8%', fontSize: '15px' }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
          <br />
          <h1 style={styleH1}>The Lib</h1>
          <p>
            <br /> Built with React, Next, Express, Material-UI, Mongoose, and MongoDB.
          </p>
          <p style={{ textAlign: 'center' }}>
            
          <a
            href="https://github.com/ambition101/thelib"
            target="_blank"
            rel="noopener noreferrer"
            >
              <Button variant="raised" color="secondary" style={styleRaisedButton}>
                Github
              </Button>
            </a>
          </p>
        </Grid>
      </Grid>

            <h1 style={styleH1}>How can you use this app?</h1>
						
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> To publish documentation or books for your staff and customers </b>
          </p>
          <p>
          Write documentation and books in Markdown. Write with your favorite text editor that supports .md files and sync
            content using Github.
          </p>
        </Grid>
      </Grid>
      <br />

      <h1 style={styleH1}>The Team</h1>
      <br />
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://storage.googleapis.com/thelib/rubenvargas"
            style={styleBigAvatar}
            alt="Rube Vargas"
          />
          <p>
            <a href="https://github.com/ambition101" target="_blank" rel="noopener noreferrer">
              Ruben Vargas
            </a>
            <br />
            Miami, FL
          </p>
          <p>
            JavaScript Developer
          </p>
        </Grid>
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://storage.googleapis.com/thelib/neww.jpg"
            style={styleBigAvatar}
            alt="Ruben Vargas"
          />
          <p>
            <a href="Ruben Vargas" target="_blank" rel="noopener noreferrer">
              Ruben Vargas
            </a>
            <br />
           Miami, FL
          </p>
          <p>
            QA
          </p>
        </Grid>
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://storage.googleapis.com/thelib/ruben.jpg"
            style={styleBigAvatar}
            alt="Ruben Vargas"
          />
          <p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Ruben Vargas
            </a>
            <br />
            Miami, FL
          </p>
          <p>
            UX/UI
          </p>
        </Grid>
      </Grid>

      <br />
    </div>
    <Footer />
  </div>
);

Index.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withAuth(withLayout(Index, { noHeader: true }), { loginRequired: false });
