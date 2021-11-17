import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import WatchMoviePage from './pages/WatchMoviePage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import {DataProvider} from './context/context';
import './css/App.css';

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/category/category=:category&page=:page" exact component={CategoryPage} />
            <Route path="/detail/category=:category&title=:title" exact component={DetailPage} />
            <Route path="/watchmovie/title=:title&episode=:episode" exact component={WatchMoviePage} />
            <Route path="/search/name=:name&page=:page" exact component={SearchPage} />
            <Route path="/contact" exact component={ContactPage} />
          </Switch>

          <Footer />
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;