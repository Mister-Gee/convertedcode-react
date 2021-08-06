import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import MenuProvider from 'react-flexible-sliding-menu';
import SideNav from './Pages/Components/SideNav';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <MenuProvider MenuComponent={SideNav}>
      <ParallaxProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ParallaxProvider>
    </MenuProvider>
  </Router>,
  document.getElementById('root')
);

