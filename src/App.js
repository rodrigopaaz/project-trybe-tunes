import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div className="main__app">
        <Switch>
          <Route
            exact
            path="/project-trybe-tunes"
            component={ Login }
          />
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            exact
            path="/search"
            component={ Search }
          />
          <Route
            exact
            path="/album/:id"
            component={ Album }
          />
          <Route
            exact
            path="/favorites"
            component={ Favorites }
          />
          <Route
            exact
            path="/profile"
            component={ Profile }
          />
          <Route
            exact
            path="/profile/edit"
            component={ ProfileEdit }
          />
          <Route
            path="*"
            component={ NotFound }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
