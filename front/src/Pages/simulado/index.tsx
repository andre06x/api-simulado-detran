import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { CiClock1 } from 'react-icons/ci';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import ProgressBar from '@ramonak/react-progress-bar';

import { REQ_GERAR_SIMULADO } from '../../services/querys';

import { usePerguntas, useRespostasSalvas } from '../../zustand';
import { Timer } from '../../Components/Timer';

import './styles.scss';
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

const Simulado = () => {
	const quantidade = 5;

	const [perguntaIndex, setPerguntaIndex] = useState(0);

	const dataPerguntas = usePerguntas((state) => state.dataPerguntas);
	const setarPerguntas = usePerguntas((state) => state.setarPerguntas);

	const respostasSalvas = useRespostasSalvas((state) => state.respostasSalvas);
	const setRespostasSalvas = useRespostasSalvas(
		(state) => state.setRespostasSalvas,
	);

	const { loading, error, data } = useQuery(REQ_GERAR_SIMULADO, {
		variables: { quantidade },
		fetchPolicy: 'network-only',
	});

	useEffect(() => {
		console.log(data);
		if (data?.simulado.length > 0) {
			setarPerguntas(data);
		}
	}, [data, dataPerguntas]);

	const navigate = useNavigate();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

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
		navigate('/resultado');
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
						<span className="minutos-restantes">
							<Timer />
						</span>
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

export { Simulado };
