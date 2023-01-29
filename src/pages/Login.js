import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import logo from '../logo.png';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      checkLength: true,
      user: '',
      loading: false,
    };
  }

  fetchUser = async () => {
    const { history } = this.props;
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({ name: user });
    history.push('/search');
  };

  checkLogin = (event) => {
    const { target } = event;
    this.setState({ user: target.value });
    return target.value.length >= Number('3')
      ? this.setState({ checkLength: false })
      : this.setState({ checkLength: true });
  };

  render() {
    const { user, checkLength, loading } = this.state;
    if (loading) { return (<Carregando />); }
    return (
      <div className="main" data-testid="page-login">
        <div className="mainLogin">
          <div className="form__login">
            <img src={ logo } alt="" srcSet="" />
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                data-testid="login-name-input"
                value={ user }
                onChange={ this.checkLogin }
                placeholder="Qual o seu nome?"
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              id="name"
              disabled={ checkLength }
              onClick={ this.fetchUser }
            >
              Entrar
            </button>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
Login.propTypes = ({
  login: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default Login;
