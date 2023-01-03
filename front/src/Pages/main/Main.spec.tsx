import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { client } from '../../services/client';
import { RoutesApp } from '../../router/routes';

import React from 'react';

describe('Main Component', () => {
	it('Render routa main', async () => {
		const { getByText, getByPlaceholderText, debug, getByTitle, findByText } =
			render(
				<ApolloProvider client={client}>
					<RoutesApp />
					<ToastContainer />
				</ApolloProvider>,
			);

		expect(getByText('Simulado PRO')).toBeInTheDocument();
		expect(getByText('Simulado Geral')).toBeInTheDocument();
		expect(getByText('Placas')).toBeInTheDocument();
		expect(getByText('Pesquisar pergunta')).toBeInTheDocument();

		const inputSimuladoGeral = getByPlaceholderText('30');
		userEvent.type(inputSimuladoGeral, '15');

		const button = getByTitle('botao-geral');

		userEvent.click(button);

		// await waitFor(() =>
		// 	expect(screen.getByText('Simulado')).toBeInTheDocument(),
		// );
	});
});

// describe('Main Component', () => {
// 	it('Render componente simulado geral', async () => {
// 		const { getByText, getByPlaceholderText, debug, getByTitle, findByText } =
// 			render(
// 				<React.StrictMode>
// 					<ApolloProvider client={client}>
// 						<RoutesApp />
// 						<ToastContainer />
// 					</ApolloProvider>
// 				</React.StrictMode>,
// 			);

// 		window.history.pushState(
// 			{},
// 			'Test page',
// 			'/simulado?tipo=geral&quantidade=30',
// 		);
// 		await new Promise((r) => setTimeout(r, 3000));

// 		// expect(await findByText('30')).toBeInTheDocument();
// 		debug();
// 	});
// });
