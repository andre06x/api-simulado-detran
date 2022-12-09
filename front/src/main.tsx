import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { client } from './services/client';
import { RoutesApp } from './router/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RoutesApp />
		</ApolloProvider>
	</React.StrictMode>,
);
