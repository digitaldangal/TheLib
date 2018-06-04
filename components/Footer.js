import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';

import { styleToolbar } from './SharedStyles';

function Footer() {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <span>© 2018 The Lib</span>
          <a
            style={{ padding: '0px 20px' }}
            href="https://github.com/ambition101"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </Grid>
      </Toolbar>
    </div>
  );
}

export default Footer;
