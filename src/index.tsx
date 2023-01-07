import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Slice from './reducer'

const store = configureStore({ reducer: Slice.reducer });

require('dotenv').config();

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);