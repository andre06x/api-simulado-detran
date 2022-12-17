import { gql } from '@apollo/client';
import { client } from '../../services/client';

const verificarPalavras = async (palavras: string) => {
	console.log(palavras);

	const query = gql`
	query pergunta{
		simulado
			@rest(
				type: "ProcurarPergunta"
				path: "pesquisar-pergunta?palavras_chave=${palavras}&limit=1"
			) {
			id
			titulo
			imagem_url
			frequencia
			data_insercao
			respostas
		}
	}
`;

	const response = await client.query({ query });

	const quantidade_questoes = response.data.simulado;
	if (quantidade_questoes.length > 0) {
		return true;
	} else {
		return false;
	}
};

export { verificarPalavras };
