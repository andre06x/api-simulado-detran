import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStatusResultado } from '../../hooks/useStatusResultado';
import { TypeAlternativas, TypePergunta } from '../../types/types';
import { usePerguntas, useRespostasSalvas, useTimer } from '../../zustand';
import './styles.scss';

const Resultado = () => {
	const { status } = useStatusResultado();
	const data = usePerguntas((state: any) => state.dataPerguntas);
	const respostasSalvas = useRespostasSalvas(
		(state: any) => state.respostasSalvas,
	);
	const limparRespostasSalvas = useRespostasSalvas(
		(state: any) => state.limparRespostasSalvas,
	);

	const timer = useTimer((state: any) => state.timer);
	const limparTimer = useTimer((state: any) => state.limparTimer);

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
					<div className="d-flex flex-column align-items-center pt-4 pb-3">
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
	} else {
		const respostaCorreta = (perguntaItem: TypePergunta) => {
			const respostaCorreta = data.simulado
				.filter((pergunta: TypePergunta) => pergunta.id === perguntaItem.id)[0]
				.respostas.filter(
					(respostas: TypeAlternativas) => respostas.correta === true,
				)
				.shift();

			//console.log(respostaCorreta);
			return respostaCorreta.nome_alternativa;
		};

		const procurarResposta = (perguntaItem: TypePergunta) => {
			const respostaCorreta = data.simulado
				.filter((pergunta: TypePergunta) => pergunta.id === perguntaItem.id)[0]
				.respostas.filter(
					(respostas: TypeAlternativas) => respostas.correta === true,
				)[0];

			const perguntaRespondida = respostasSalvas.find(
				(r: TypeAlternativas) => r.pergunta_id === perguntaItem.id,
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
			const aprovado = status.rc >= (70 / 100) * status.total;
			if (aprovado) {
				return (
					<span className="fw-bold text-end" style={{ color: '#fff' }}>
						APROVADO!
					</span>
				);
			} else {
				return <span className="text-end fw-bold text-light">REPROVADO!</span>;
			}
		};

		const novoSimulado = () => {
			limparRespostasSalvas();
			navigate(-1);
			limparTimer();
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
								<button
									className="btn border text-light fw-bold"
									onClick={() => novoSimulado()}
								>
									NOVO SIMULADO
								</button>
							</div>
						</div>

						<div className="d-flex flex-column ">
							{verificarAprovacao()}
							<span className="ms-1 quantidade-questoes text-end">
								{`${status.rc}/${status.re}/${status.total}`}
							</span>
							<span className="minutos text-end">{timer}</span>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="px-3" style={{ marginTop: -25 }}>
						{data.simulado.map((pergunta: TypePergunta, index: number) => (
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
			</div>
		);
	}
};

export { Resultado };
