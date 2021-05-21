import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import React  from 'react';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from "@material-ui/core";
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Rating from './pages/Rating/Rating';
import Search from './components/Search/Search';
function App() {
  return (
    <BrowserRouter>
    <Header />
    <div className="App">
    <Container>
    <Search/>
      <Switch>
        <Route path='/' component={Movies} exact/>
        <Route path='/series' component={Series}/>
        <Route path='/rating' component={Rating}/>
      </Switch>
    </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
