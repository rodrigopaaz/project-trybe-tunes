import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import emptyUser from '../music.png';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: '',
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

  render() {
    const { usuario, loading } = this.state;
    if (loading) { return (<Carregando />); }
    return (
      <div className="main" data-testid="page-profile">
        <Header />
        <div className="album_list">
          <div className="main__album_header">
            <div className="search">
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
            </div>
          </div>
          <div className="favorites__result_profile">
            <p>
              <p>Name</p>
              <p>{usuario.name}</p>
            </p>
            <p>
              <p>E-mail</p>
              <p>{usuario.email}</p>
            </p>
            <p>
              <p>Description</p>
              <p>{usuario.description}</p>
            </p>
            <Link
              to="../profile/edit"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
