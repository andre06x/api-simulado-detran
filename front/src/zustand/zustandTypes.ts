type UsePerguntasTypes = {
	dataPerguntas: object;
	setarPerguntas?: (data) => void;
};

type UseRespostasSalvas = {
	respostasSalvas?: Array<Object>;
	setRespostasSalvas?: Function;
	limparRespostasSalvas?: Function;
};

type UseTimer = {
	timer: string;
	setTimer: Function;
	limparRespostasSalvas: Function;
};

export { UsePerguntasTypes, UseTimer, UseRespostasSalvas };
