import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="container-resultado-vazio px-3" style={{ marginTop: -25 }}>
			<div className="container-simulado">
				<div className="d-flex flex-column align-items-center pt-4 pb-3">
					<span className="pb-4">Página não existe!</span>
					<button
						className="btn rounded mt-3"
						style={{ background: ' #83e2a4b3' }}
						onClick={() => navigate('/')}
					>
						Voltar
					</button>
				</div>
			</div>
		</div>
	);
};

export { NotFound };
