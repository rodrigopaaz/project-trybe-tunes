import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';
import emptyUser from '../music.png';
import check from '../Check.png';
import error from '../error.png';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ usuario: user });
    this.setState({ loading: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { usuario } = this.state;
    usuario[name] = value;
    this.setState({
      usuario,
    });
  };

  checkName = (value) => value.length >= 2;

  checkDescription = (value) => value.length >= Number('10');

  validMail = (value) => {
    const checkValue = /\S+@\S+\.\S+/;
    return checkValue.test(value);
  };

  checkData = () => {
    const { usuario } = this.state;
    const { email, name, description, image } = usuario;
    const validName = this.checkName(name);
    const validEmail = this.validMail(email);
    const validDescription = this.checkDescription(description);
    const validImage = image.length > 0;
    return validName && validEmail && validDescription && validImage;
  };

  updateUser = async () => {
    const { history } = this.props;
    const { usuario } = this.state;
    this.setState({ loading: true });
    await updateUser(usuario);
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { usuario, loading } = this.state;
    if (loading) { return (<Carregando />); }
    return (
      <div className="main" data-testid="page-profile-edit">
        <Header />
        <div className="album_list">
          <div className="main__album_header">
            {!usuario.image
              ? (
                <img
                  data-testid="profile-image"
                  src={ emptyUser }
                  alt="userVazio"
                  className="perfil"
                />)
              : (
                <img
                  data-testid="profile-image"
                  src={ usuario.image }
                  alt="user"
                  className="perfil"
                />)}
            <label
              htmlFor="image"
            >
              <input
                id="image"
                name="image"
                type="text"
                data-testid="edit-input-image"
                value={ usuario.image }
                onChange={ this.handleChange }
                placeholder="Insira o link de uma imagem"
              />
            </label>
          </div>
          <div className="favorites__result_profile">
            <label htmlFor="name">
              Name
              <input
                placeholder="Insira seu nome"
                id="name"
                name="name"
                type="text"
                data-testid="edit-input-name"
                value={ usuario.name }
                onChange={ this.handleChange }

              />
            </label>
            {this.checkName(usuario.name)
              ? <img src={ check } alt="b" className="check" />
              : <img src={ error } alt="b" className="error" />}

            <label
              htmlFor="email"
            >
              Email:
              <input
                placeholder="Insira seu email"
                id="email"
                name="email"
                type="text"
                value={ usuario.email }
                onChange={ this.handleChange }
                data-testid="edit-input-email"
              />
            </label>
            {this.validMail(usuario.email)
              ? <img src={ check } alt="b" className="check" />
              : <img src={ error } alt="b" className="error" />}
            <label
              htmlFor="description"
            >
              Description:
              <textarea
                placeholder="Nos conte um pouco sobre você"
                name="description"
                type="text"
                data-testid="edit-input-description"
                value={ usuario.description }
                onChange={ this.handleChange }
              />
            </label>
            {this.checkDescription(usuario.description)
              ? <img src={ check } alt="b" className="check" />
              : <img src={ error } alt="b" className="error" />}
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ !this.checkData() }
              onClick={ this.updateUser }
            >
              Save

            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default ProfileEdit;
