import React, { useState, useEffect } from 'react';
import { TypeAlternativas, TypePergunta } from '../types/types';
import { usePerguntas, useRespostasSalvas } from '../zustand';

const useStatusResultado = () => {
	const [status, setStatus] = useState({ rc: 0, re: 0, total: 0 });
	const respostasSalvas = useRespostasSalvas(
		(state: any) => state.respostasSalvas,
	);
	const data = usePerguntas((state: any) => state.dataPerguntas);

	useEffect(() => {
		if (data !== null) {
			let rc = 0,
				re = 0,
				total = 0;

			for (let i = 0; i < respostasSalvas.length; i++) {
				const respostaCorreta = data.simulado
					.filter(
						(pergunta: TypePergunta) =>
							pergunta.id === respostasSalvas[i].pergunta_id,
					)[0]
					.respostas.filter(
						(respostas: TypeAlternativas) => respostas.correta === true,
					)[0];

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

	return { status };
};

export { useStatusResultado };
