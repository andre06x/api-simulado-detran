import create from 'zustand';

export const usePerguntas = create((set) => ({
	dataPerguntas: null,
	// @ts-ignore
	setarPerguntas: (data) => set(() => ({ dataPerguntas: data })),
	// @ts-ignore
	limparPerguntas: () => set({ dataPerguntas: [] }),
}));

// @ts-ignore
export const useRespostasSalvas = create((set) => ({
	// @ts-ignore
	respostasSalvas: [],
	// @ts-ignore

	setRespostasSalvas: (data) => set(() => ({ respostasSalvas: data })),
	// @ts-ignore

	limparRespostasSalvas: () => set({ respostasSalvas: [] }),
}));

export const useTimer = create((set) => ({
	timer: '',
	setTimer: (data) => set(() => ({ timer: data })),
	limparRespostasSalvas: () => set({ timer: '' }),
}));
