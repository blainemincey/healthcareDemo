import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const App = ({ children }) => (
  <>
    <Header />

    <Navigation/>

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
