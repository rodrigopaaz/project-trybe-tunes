import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      loading: false,
      songs: [],
    };
  }

  async componentDidMount() {
    await this.musicFilter();
  }

  musicFilter = async () => {
    const { match: { params } } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(params.id);
    this.setState({ loading: false });
    this.setState({ artist: musics[0] });
    this.setState({ songs: musics });
  };

  fetchSongs = () => console.log('fetch');

  render() {
    const { artist, loading, songs } = this.state;
    if (loading) { return (<Carregando />); }
    return (
      <div className="main" data-testid="page-album">
        <Header />
        <div className="album_list">
          <div className="main__album_header">
            <div className="search">
              <img
                src={ artist.artworkUrl100 }
                alt="imagem"
                srcSet=""
                className="artist_image"
              />
              <p data-testid="artist-name">{artist.artistName }</p>
              <p data-testid="album-name">{artist.collectionName }</p>
            </div>
          </div>
          <div className="favorites__result">
            { songs.map((element, key) => (
              key >= 1 ? <MusicCard
                key={ key }
                previewUrl={ element.previewUrl }
                img={ element.artworkUrl100 }
                songName={ element.trackName }
                trackId={ element.trackId }
                element={ element }
                fetchSongs={ this.fetchSongs }
              />
                : null
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
});

export default Album;
