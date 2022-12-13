import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerguntas, useRespostasSalvas, useTimer } from '../../zustand';
import './styles.scss';

const Resultado = () => {
	const [status, setStatus] = useState({ rc: 0, re: 0, total: 0 });

	const data = usePerguntas((state) => state.dataPerguntas);
	const respostasSalvas = useRespostasSalvas((state) => state.respostasSalvas);
	const limparRespostasSalvas = useRespostasSalvas(
		(state) => state.limparRespostasSalvas,
	);

	const timer = useTimer((state) => state.timer);

	useEffect(() => {
		if (data !== null) {
			let rc = 0,
				re = 0,
				total = 0;

			for (let i = 0; i < respostasSalvas.length; i++) {
				const respostaCorreta = data.simulado
					.filter(
						(pergunta) => pergunta.id === respostasSalvas[i].pergunta_id,
					)[0]
					.respostas.filter((respostas) => respostas.correta === true)[0];

				const respostaEstaCorreta =
					respostaCorreta.id === respostasSalvas[i].alternativa_id;

				if (respostaEstaCorreta) {
					rc += 1;
				}
			}
			total = data.simulado.length;
			re = total - rc;

			const objStatus = {
				rc,
				re,
				total,
			};

			console.log();
			setStatus(objStatus);
		}
	}, []);

	useEffect(() => {
		console.log(respostasSalvas);
	}, [respostasSalvas]);

	const navigate = useNavigate();

	if (data === null) {
		return (
			<div
				className="container-resultado-vazio px-3"
				style={{ marginTop: -25 }}
			>
				<div className="container-simulado">
					<div className="pt-4 pb-3">
						<span className="pb-4">Nenhum simulado encontrado!</span>
						<button
							className="btn rounded mt-3"
							style={{ background: ' #83e2a4b3' }}
							onClick={() => navigate('/simulado')}
						>
							Voltar
						</button>
					</div>
				</div>
			</div>
		);
	}
	if (data !== null) {
		const respostaCorreta = (perguntaItem) => {
			const respostaCorreta = data.simulado
				.filter((pergunta) => pergunta.id === perguntaItem.id)[0]
				.respostas.filter((respostas) => respostas.correta === true)
				.shift();

			//console.log(respostaCorreta);
			return respostaCorreta.nome_alternativa;
		};

		const procurarResposta = (perguntaItem) => {
			const respostaCorreta = data.simulado
				.filter((pergunta) => pergunta.id === perguntaItem.id)[0]
				.respostas.filter((respostas) => respostas.correta === true)[0];

			const perguntaRespondida = respostasSalvas.find(
				(r) => r.pergunta_id === perguntaItem.id,
			);

			if (!perguntaRespondida) {
				return <span>Não respondeu 😶</span>;
			}

			const respostaEstaCorreta =
				respostaCorreta.id === perguntaRespondida.alternativa_id;

			if (!respostaEstaCorreta) {
				return (
					<div className="d-flex flex-column">
						<span style={{ color: 'red' }}>Você errou. 🙁</span>
						<span>
							Resposta marcada: {perguntaRespondida.alternativa_marcada}
						</span>
					</div>
				);
			}

			if (respostaEstaCorreta) {
				return <span style={{ color: 'green' }}>Você acertou! </span>;
			}
		};

		const verificarAprovacao = () => {
			const aprovado = status.rc > (70 / 100) * status.total;
			if (aprovado) {
				return (
					<span className="fw-bold ms-2" style={{ color: '#fff' }}>
						APROVADO!
					</span>
				);
			} else {
				return <span className="ms-2 fw-bold">REPROVADO!</span>;
			}
		};

		const novoSimulado = () => {
			navigate('/simulado');
		};

		return (
			<div className="pb-3">
				<div
					className="container-header px-3 pt-3 pb-4"
					style={{ backgroundColor: '#28A956' }}
				>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<div className="d-flex flex-column">
							<h1 className="titulo">RESULTADO</h1>
							{/* <h1 onClick={() => novoSimulado()}>NOVO</h1> */}
							<div>
								<span className="quantidade-questoes">
									{`${status.rc}/${status.re}/${status.total}`}
								</span>
								{verificarAprovacao()}
							</div>
						</div>

						<div className="d-flex flex-column align-items-center">
							<span className="minutos">{timer}</span>
							<button
								className="btn"
								onClick={() => {
									limparRespostasSalvas();
									navigate(-1);
								}}
							>
								Novo simulado
							</button>
						</div>
					</div>
				</div>

				<div className="px-3" style={{ marginTop: -25 }}>
					{data.simulado.map((pergunta, index: number) => (
						<div className="container-simulado">
							<span className="identificador-pergunta">
								QUESTÃO {index + 1}
							</span>
							<p>{pergunta.titulo}</p>
							{pergunta.imagem_url ? (
								<div>
									<img
										src={pergunta.imagem_url}
										alt=""
										className="mb-1"
										width={180}
										height={100}
									/>
								</div>
							) : null}

							<div className="d-flex flex-column pt-4 pb-3">
								<span>{procurarResposta(pergunta)}</span>
								<span>Resposta Correta: {respostaCorreta(pergunta)}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
};

export { Resultado };
