import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const main = (id) => {
  ReactDOM.render(<App />, document.getElementById(id));
}

export default main;
