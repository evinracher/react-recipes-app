import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Timer from './pages/Timer';
import './App.css';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import Offline from './components/Offline';

// ID random
ReactGA.initialize('UA-000000-01');

const history = createBrowserHistory();

history.listen(function (location) {
  ReactGA.pageview(window.location.pathname + window.location.search);
});

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <header>
            <Link to="/">
              Recipes <Offline>Offline</Offline>
            </Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}
