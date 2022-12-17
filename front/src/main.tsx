import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { client } from './services/client';
import { RoutesApp } from './router/routes';

import 'bootstrap/dist/css/bootstrap.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RoutesApp />
			<ToastContainer />
		</ApolloProvider>
	</React.StrictMode>,
);
