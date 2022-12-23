type TypePergunta = {
	id: string;
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

export { TypeAlternativas, TypePergunta, TypeRespostasSalvas };
