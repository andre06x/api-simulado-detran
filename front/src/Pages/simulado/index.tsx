import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CiClock1 } from 'react-icons/ci';

import { REQ_GERAR_SIMULADO } from '../../services/querys';
import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';

import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import './styles.scss';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

type TypePergunta = {
	titulo: string;
	imagem_url: string;
	respostas: Array<any>;
};

type TypeAlternativas = {
	nome_alternativa: string;
	id: string;
	pergunta_id: string;
	correta: boolean;
};

type TypeRespostasSalvas = {
	pergunta_id: string;
	alternativa_id: string;
	alternativa_marcada: string;
};

const Resultado = ({ data, respostasSalvas, navigate }) => {
	const [status, setStatus] = useState({ rc: 0, re: 0, total: 0 });

	useEffect(() => {
		let rc = 0,
			re = 0,
			total = 0;

		for (let i = 0; i < respostasSalvas.length; i++) {
			const respostaCorreta = data.simulado
				.filter((pergunta) => pergunta.id === respostasSalvas[i].pergunta_id)[0]
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
	}, []);

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
			console.log(perguntaRespondida);
			return (
				<div className="d-flex flex-column">
					<span style={{ color: 'red' }}>Você errou 🙁.</span>
					<span>
						Resposta marcada: {perguntaRespondida.alternativa_marcada}
					</span>
				</div>
			);
		}

		if (respostaEstaCorreta) {
			return <span style={{ color: 'green' }}>Você acertou 😃!</span>;
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
						<h1 onClick={() => novoSimulado()}>NOVO</h1>
						<div>
							<span className="quantidade-questoes">
								{`${status.rc}/${status.re}/${status.total}`}
							</span>
							{verificarAprovacao()}
						</div>
					</div>

					<div className="d-flex flex-column align-items-center">
						<span className="minutos">20:00</span>
					</div>
				</div>
			</div>

			<div className="px-3" style={{ marginTop: -25 }}>
				{data.simulado.map((pergunta, index: number) => (
					<div className="container-simulado">
						<span className="identificador-pergunta">QUESTÃO {index + 1}</span>
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
};

const Questoes = ({
	data,
	perguntaIndex,
	setPerguntaIndex,
	respostasSalvas,
	setRespostasSalvas,
	setComponent,
}) => {
	const pergunta = data.simulado[perguntaIndex];

	const proximaQuestao = () => {
		const QUANTIDADE_DE_PERGUNTAS = data.simulado.length;
		if (QUANTIDADE_DE_PERGUNTAS > perguntaIndex + 1) {
			setPerguntaIndex(perguntaIndex + 1);
		}
	};

	const voltarQuestao = () => {
		if (perguntaIndex > 0) {
			setPerguntaIndex(perguntaIndex - 1);
		}
	};

	const marcarResposta = (alternativa: TypeAlternativas) => {
		const procurarPergunta = respostasSalvas.find(
			(r) => r.pergunta_id === alternativa.pergunta_id,
		);

		if (procurarPergunta) {
			const indexPergunta = respostasSalvas.indexOf(procurarPergunta);

			const novasRespostasSalvas = respostasSalvas
				.filter((r) => r !== undefined)
				.map((item, i) => {
					if (i === indexPergunta) {
						return {
							...item,
							alternativa_id: alternativa.id,
							alternativa_marcada: alternativa.nome_alternativa,
						};
					} else {
						return {
							...item,
						};
					}
				});

			setRespostasSalvas(novasRespostasSalvas);
		}
		if (!procurarPergunta) {
			const objResposta = {
				pergunta_id: alternativa.pergunta_id,
				alternativa_id: alternativa.id,
				alternativa_marcada: alternativa.nome_alternativa,
			};

			setRespostasSalvas([...respostasSalvas, objResposta]);
		}
	};

	const verificarSelecionado = (alternativa: TypeAlternativas) => {
		const procurarPergunta = respostasSalvas.find(
			(r) => r.pergunta_id === alternativa.pergunta_id,
		);

		if (procurarPergunta?.alternativa_id === alternativa.id) {
			return true;
		} else {
			return false;
		}
	};

	const corrigir = () => {
		setComponent('Resultado');
	};

	return (
		<div className="pb-3">
			<div
				className="container-header px-3 pt-3 pb-2"
				style={{ backgroundColor: '#28A956' }}
			>
				<div className="d-flex align-items-center justify-content-between mb-3">
					<div className="d-flex flex-column">
						<h1 className="titulo">Simulado</h1>
						<span className="quantidade-questoes">
							{data.simulado.length} QUESTÕES
						</span>
					</div>

					<div className="d-flex flex-column align-items-center">
						<CiClock1 color="#fff" size={35} />
						<span className="minutos-restantes">20:00</span>
					</div>
				</div>

				<div className="d-flex flex-column pb-5">
					<ProgressBar
						height="7px"
						bgColor="#FFD54F"
						completed={perguntaIndex + 1}
						maxCompleted={data.simulado.length}
						labelClassName="label-progress"
					/>
					<span className="text-end py-2" style={{ color: '#fff' }}>
						{`${perguntaIndex + 1} / ${data.simulado.length}`}
					</span>
				</div>
			</div>

			<div className="px-3" style={{ marginTop: -40 }}>
				<div className="container-simulado">
					<span className="identificador-pergunta">
						QUESTÃO {perguntaIndex + 1}
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
				</div>

				<div>
					{pergunta.respostas.map(
						(alternativas: TypeAlternativas, index: number) => (
							<div
								key={index}
								className="d-flex align-items-center container-alternativa"
								onClick={() => marcarResposta(alternativas)}
							>
								<input
									className="me-2 "
									type="radio"
									name={alternativas.pergunta_id}
									id=""
									checked={verificarSelecionado(alternativas)}
									readOnly
								/>
								<span>{alternativas.nome_alternativa}</span>
							</div>
						),
					)}
				</div>

				<div className="d-flex justify-content-between">
					<button
						className="btn rounded-circle"
						style={{ backgroundColor: '#28A956' }}
						onClick={() => voltarQuestao()}
					>
						<BiLeftArrowAlt color="white" size={35} />
					</button>
					<button
						className="btn rounded"
						style={{
							backgroundColor: '#28A956',
							color: '#fff',
						}}
						onClick={() => corrigir()}
					>
						Corrigir
					</button>
					<button
						className="btn rounded-circle"
						style={{ backgroundColor: '#28A956' }}
						onClick={() => proximaQuestao()}
					>
						<BiRightArrowAlt color="white" size={35} />
					</button>
				</div>
			</div>
		</div>
	);
};

const Simulado = () => {
	const quantidade = 5;
	const [componente, setComponent] = useState('Questoes');

	const [perguntaIndex, setPerguntaIndex] = useState(0);
	const [respostasSalvas, setRespostasSalvas] = useState<TypeRespostasSalvas[]>(
		[],
	);

	const { loading, error, data, refetch } = useQuery(REQ_GERAR_SIMULADO, {
		variables: { quantidade },
	});

	const navigate = useNavigate();
	const componentes = {
		Questoes: (
			<Questoes
				data={data}
				perguntaIndex={perguntaIndex}
				setPerguntaIndex={setPerguntaIndex}
				respostasSalvas={respostasSalvas}
				setRespostasSalvas={setRespostasSalvas}
				setComponent={setComponent}
				navigate={navigate}
			/>
		),
		Resultado: <Resultado data={data} respostasSalvas={respostasSalvas} />,
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return componentes[`${componente}`];
};

export { Simulado };
