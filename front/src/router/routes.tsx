import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';

import { DadosGerais } from '../Pages/dadosGerais';
import { Main } from '../Pages/main';
import { Placas } from '../Pages/placas/placas';
import { ProcurarPergunta } from '../Pages/procurarPergunta';
import { Resultado } from '../Pages/resultado';
import { Simulado } from '../Pages/simulado';

const RoutesApp = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/simulado*" element={<Simulado />} />
				<Route path="/resultado" element={<Resultado />} />

				<Route path="/pergunta" element={<ProcurarPergunta />} />
				<Route path="/placas" element={<Placas />} />
				<Route path="/dados-gerais" element={<DadosGerais />} />
				<Route path="*" element={<div>Not found</div>} />
			</Routes>
		</BrowserRouter>
	);
};

export { RoutesApp };
