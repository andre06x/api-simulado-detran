import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';

import { DadosGerais } from '../Pages/dadosGerais';
import { Main } from '../Pages/main';
import { NotFound } from '../Pages/notFound';
import { Resultado } from '../Pages/resultado';
import { Simulado } from '../Pages/simulado';

const RoutesApp = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/simulado*" element={<Simulado />} />
				<Route path="/resultado" element={<Resultado />} />

				<Route path="/dados-gerais" element={<DadosGerais />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export { RoutesApp };
