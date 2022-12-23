import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { toast } from 'react-toastify';
import ProgressBar from '@ramonak/react-progress-bar';
import { CiClock1 } from 'react-icons/ci';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import { usePerguntas, useRespostasSalvas, useTimer } from '../../zustand';
import { Timer } from '../../Components/Timer';
import { Loading } from './Loading';

import {
	REQ_GERAR_SIMULADO,
	REQ_PERGUNTAS_PLACAS,
	REQ_PROCURAR_PERGUNTA,
} from '../../services/querys';
import './styles.scss';
import { TypeAlternativas, TypeRespostasSalvas } from '../../types/types';

const REQ_OBJ = {
	geral: REQ_GERAR_SIMULADO,
	placas: REQ_PERGUNTAS_PLACAS,
	pesquisa: REQ_PROCURAR_PERGUNTA,
};

const Simulado = () => {
	let [searchParams] = useSearchParams();

	const [perguntaIndex, setPerguntaIndex] = useState(0);

	const dataPerguntas = usePerguntas((state: any) => state.dataPerguntas);
	const setarPerguntas = usePerguntas((state: any) => state.setarPerguntas);
	const timer = useTimer((state: any) => state.timer);

	const respostasSalvas = useRespostasSalvas(
		(state: any) => state.respostasSalvas,
	);
	const setRespostasSalvas = useRespostasSalvas(
		(state: any) => state.setRespostasSalvas,
	);
	const tipo = searchParams.get('tipo');
	const quantidade = searchParams.get('quantidade');
	const palavraChave = searchParams.get('palavraChave');
	const navigate = useNavigate();

	// @ts-ignore
	const VERIFCAR_GRAPHQL = REQ_OBJ[tipo] ? REQ_OBJ[tipo] : REQ_OBJ['geral'];
	const VERIFICAR_QUANTIDADE = quantidade ? quantidade : 30;

	const { loading, error, data } = useQuery(VERIFCAR_GRAPHQL, {
		variables: {
			quantidade: VERIFICAR_QUANTIDADE,
			palavraChave,
		},
	});

	useEffect(() => {
		if (data?.simulado.length > 0) {
			setarPerguntas(data);
		}
	}, [data, dataPerguntas]);

	useEffect(() => {
		if (timer === '60:00') {
			alert(
				'Tempo Expirado. Você será redirecionado para a página de resultados',
			);
			navigate('/resultado');
		}
	}, [timer]);

	if (loading) return <Loading />;
	if (error) return <p>Error : {error.message}</p>;

	const pergunta = data.simulado[perguntaIndex];

	const proximaQuestao = () => {
		const QUANTIDADE_DE_PERGUNTAS = data.simulado.length;

		if (QUANTIDADE_DE_PERGUNTAS > perguntaIndex + 1) {
			setPerguntaIndex(perguntaIndex + 1);
		}

		if (QUANTIDADE_DE_PERGUNTAS === perguntaIndex + 1) {
			toast.success('Simulado completo! Realize a correção.');
		}
	};

	const voltarQuestao = () => {
		if (perguntaIndex > 0) {
			setPerguntaIndex(perguntaIndex - 1);
		}
	};

	const marcarResposta = (alternativa: TypeAlternativas) => {
		const procurarPergunta = respostasSalvas.find(
			(r: TypeRespostasSalvas) => r.pergunta_id === alternativa.pergunta_id,
		);

		if (procurarPergunta) {
			const indexPergunta = respostasSalvas.indexOf(procurarPergunta);

			const novasRespostasSalvas = respostasSalvas
				.filter((r: TypeRespostasSalvas) => r !== undefined)
				.map((item: TypeRespostasSalvas, i: number) => {
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
			(r: TypeRespostasSalvas) => r.pergunta_id === alternativa.pergunta_id,
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

	if (data.simulado.length < 1) {
		return (
			<div
				className="container-resultado-vazio px-3"
				style={{ marginTop: -25 }}
			>
				<div className="container-simulado d-flex flex-column">
					<div className="pt-4 pb-3">
						<span className="pb-4">Nenhuma pesquisa encontrada</span>
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

	return (
		<div className="pb-3">
			<div
				className="container-header px-3 pt-2 pb-2"
				style={{ backgroundColor: '#28A956' }}
			>
				<div className="py-2" onClick={() => navigate('/')}>
					<BiLeftArrowAlt color="white" size={35} />
				</div>
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

			<div className="container px-3" style={{ marginTop: -40 }}>
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
