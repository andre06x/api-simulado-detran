import React, { InputHTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const Main = () => {
	const [formulario, setFormulario] = useState({
		quantidade: 30,
		palavras: '',
	});
	const navigate = useNavigate();

	const changeForm = (event) => {
		setFormulario({ ...formulario, [event.target.name]: event.target.value });
	};

	const simulado = (tipo: string) => {
		switch (tipo) {
			case 'geral':
				navigate(`/simulado?tipo=geral&quantidade=${formulario.quantidade}`);
				break;
			case 'placas':
				navigate(`/simulado?tipo=placas`);
				break;

			default:
				'';
		}
		if (tipo !== 'pergunta') {
		}
	};

	return (
		<div>
			<div
				className="container-header px-3 pt-3 pb-2"
				style={{ backgroundColor: '#28A956' }}
			>
				<div className="d-flex align-items-center justify-content-between mb-3">
					<div className="d-flex flex-column">
						<h1 className="titulo p-2">Simulado PRO</h1>
					</div>

					<div className="d-flex flex-column align-items-center">
						<span className="minutos-restantes"></span>
					</div>
				</div>
			</div>

			<div className="px-3" style={{ marginTop: -15 }}>
				<div className="container-simulado" style={{ borderRadius: 3 }}>
					<p>
						O Simulado Pro ajuda na preparação do candidato para a prova teórica
						do detran rj, que é composto de 30 questões de múltipla escolha e
						tem duração de 60 minutos.
					</p>
				</div>
				<div className="d-flex flex-column">
					<div
						className="btn  py-3 mb-3 d-flex justify-content-between align-items-center"
						style={{
							backgroundColor: '#fff',
							boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
						}}
					>
						<div className="d-flex flex-column text-start">
							<span className="text-muted">Simulado Geral</span>

							<div className="d-flex">
								<label
									style={{ color: '#b8b8b8', fontSize: 14 }}
									className="form-label me-2 text-muted"
								>
									quantidade
								</label>
								<input
									name="quantidade"
									value={formulario.quantidade}
									onChange={changeForm}
									className=""
									style={{ width: 30, height: 30 }}
									type="text"
								/>
							</div>
						</div>

						<div
							className="rounded d-flex justify-content-center align-items-center"
							onClick={() => simulado('geral')}
							style={{ backgroundColor: '#28A956', width: 50, height: 50 }}
						>
							<BiRightArrowAlt size={35} color="#fff" />
						</div>
					</div>

					<div
						className="btn  py-3 mb-3 d-flex justify-content-between align-items-center"
						style={{
							backgroundColor: '#fff',
							boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
						}}
					>
						<div className="d-flex flex-column text-start">
							<span className="text-muted">Placas</span>
						</div>

						<div
							className="rounded d-flex justify-content-center align-items-center"
							onClick={() => simulado('placas')}
							style={{ backgroundColor: '#28A956', width: 50, height: 50 }}
						>
							<BiRightArrowAlt size={35} color="#fff" />
						</div>
					</div>

					<div
						className="btn py-3 mb-3 d-flex justify-content-between align-items-center"
						style={{
							backgroundColor: '#fff',
							boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
						}}
					>
						<div className="d-flex flex-column text-start">
							<span className="text-muted">Pesquisar pergunta</span>

							<div className="d-flex">
								<label
									style={{ color: '#b8b8b8', fontSize: 14 }}
									className="form-label me-2 text-muted"
								>
									palavras
								</label>
								<input
									className=""
									name="palavras"
									value={formulario.palavras}
									onChange={changeForm}
									style={{ width: 200, height: 30 }}
									type="text"
								/>
							</div>
						</div>

						<div
							className="rounded d-flex justify-content-center align-items-center"
							style={{ backgroundColor: '#28A956', width: 50, height: 50 }}
						>
							<BiRightArrowAlt size={35} color="#fff" />
						</div>
					</div>
				</div>
			</div>
		</div>

		// <div className="container-main px-3">
		// 	<div className="container-simulado">
		// 		<div className="pt-4 pb-3">
		// 			<span className="pb-4">Bem vindo!</span>
		// 			<p>
		// 				O Simulado Pro ajuda na preparação do candidato para a prova teórica
		// 				do detran rj, que é composto de 30 questões de múltipla escolha e
		// 				tem duração de 60 minutos.
		// 			</p>

		// 			<ul>
		// 				<li>Questões gerais</li>
		// 				<li>Somente placas</li>
		// 				<li>Pesquisar questões</li>
		// 			</ul>
		// 			<button
		// 				className="btn rounded mt-3"
		// 				style={{ background: ' #83e2a4b3' }}
		// 				onClick={() => navigate('/simulado')}
		// 			>
		// 				Voltar
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export { Main };
