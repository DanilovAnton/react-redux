import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

const USER = {
  PASSWORD: '123',
  LOGIN: 'stu@dent.com'
};
const MESSAGE = 'Email или пароль введён не верно';

class AuthProvider extends PureComponent {
  state = {
    email: '',
    authorizeError: '',
    isAuthorized: false
  };

  logout = () => {
    this.setState({ email: false, isAuthorized: false });
  };

  authorize = (email, password) => {
    if (USER.LOGIN === email && USER.PASSWORD === password) {
      this.setState({ isAuthorized: true, email, authorizeError: '' });
    } else {
      this.setState({ authorizeError: MESSAGE });
    }
  };

  getProviderValue = () => {
    const state = this.state;
    return {
      ...state,
      authorize: this.authorize,
      logout: this.logout,
      getProviderValue: this.getProviderValue
    };
  };


  render() {
    const { children } = this.props;

    return <Provider value={this.getProviderValue()}>{children}</Provider>;
  }
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
