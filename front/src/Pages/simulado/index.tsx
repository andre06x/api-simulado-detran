import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { REQ_GERAR_SIMULADO } from '../../services/querys';
import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
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
	const [perguntaIndex, setPerguntaIndex] = useState(0);
	const [respostasSalvas, setRespostasSalvas] = useState<TypeRespostasSalvas[]>(
		[],
	);

	const quantidade = 30;
	const { loading, error, data } = useQuery(REQ_GERAR_SIMULADO, {
		variables: { quantidade },
	});

	useEffect(() => {
		if (data) {
			console.log(data);
			const respostasCertas = data.simulado.map((pergunta: TypePergunta) =>
				pergunta.respostas
					.filter(
						(alternativa: TypeAlternativas) => alternativa.correta === true,
					)
					.shift(),
			);
			console.log(respostasCertas);
		}
	}, [data]);

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

		console.log(respostasSalvas);
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

	return (
		<div className="px-3 py-3" style={{ backgroundColor: ' #E9ECEF' }}>
			<div className="container-pergunta">
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
							width={200}
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
							/>
							<span>{alternativas.nome_alternativa}</span>
						</div>
					),
				)}
			</div>

			<div className="d-flex justify-content-between">
				<button className="btn" onClick={() => voltarQuestao()}>
					<BsFillArrowLeftCircleFill color="#17aded" size={30} />
				</button>
				<button className="btn" onClick={() => proximaQuestao()}>
					<BsFillArrowRightCircleFill color="#17aded" size={30} />
				</button>
			</div>
		</div>
	);
};

export { Simulado };
