import React from 'react';
import { render } from 'react-dom';
import { Route, Switch, Link, HashRouter as Router, useRouteMatch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './components/Home/Home'
import Order from './components/Order/order'
import Dogs from './components/Dogs/dogs'
import DogDetail from './components/DogDetail/DogDetail'
import CreateDog from './components/CreateDog/CreateDog'
import SearchBar from './components/SearchBar/searchBar.jsx'
import LandingPage from './components/LandingPage/LadingPage'

function App() {
  return (
    <div className="App">  
<Nav />
<Order />  
    <Switch>
     <Route exact path="/add"> 
         <CreateDog />
      </Route> 
  
      <Route exact path="/:id">
        <DogDetail />
      </Route>
   
       <Route exact path="/">
       <LandingPage />          
       </Route>  
      
      </Switch>
      {/* <Footer />   */}
    </div>
);   

}

export default App;
