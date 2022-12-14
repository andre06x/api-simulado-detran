import { gql } from '@apollo/client';

const REQ_GERAR_SIMULADO = gql`
	query Simulado($quantidade: Number!) {
		simulado(quantidade: $quantidade)
			@rest(type: "Simulado", path: "gerar-simulado/{args.quantidade}") {
			id
			titulo
			imagem_url
			frequencia
			data_insercao
			respostas
		}
	}
`;

const REQ_PROCURAR_PERGUNTA = gql`
	query pergunta($palavraChave: String!) {
		simulado(palavraChave: $palavraChave)
			@rest(
				type: "ProcurarPergunta"
				path: "pesquisar-pergunta?palavras_chave={args.palavraChave}&limit=1"
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

const REQ_PERGUNTAS_PLACAS = gql`
	query Placas {
		simulado @rest(type: "ProcurarPergunta", path: "requisitar-placas") {
			id
			titulo
			imagem_url
			frequencia
			data_insercao
			respostas
		}
	}
`;

const REQ_DADOS_GERAIS = gql`
	query DadosGerais {
		dados @rest(type: "DadosGerais", path: "dados-gerais/") {
			quantidade_perguntas
			quantidade_perguntas_placas
			quantidade_request
			ultimo_request
			ultimo_request_dados
			quantidade_erros
			ultimo_erro
			mongo_quantidade_registros_perguntas
		}
	}
`;

export {
	REQ_GERAR_SIMULADO,
	REQ_PROCURAR_PERGUNTA,
	REQ_PERGUNTAS_PLACAS,
	REQ_DADOS_GERAIS,
};
