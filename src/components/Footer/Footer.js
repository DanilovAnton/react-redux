import React, { Fragment, PureComponent } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import './Footer.css';

const MESSAGE = 'Вы гость в этой системе';

class Footer extends PureComponent {
  render() {
    return (
      <AuthConsumer>
        {({ email, isAuthorized }) => (
          <p className="footer-message t-footer">
            {isAuthorized ? `Вы вошли как ${email}` : MESSAGE}
          </p>
        )}
      </AuthConsumer>
    );
  }
}

export default Footer;
