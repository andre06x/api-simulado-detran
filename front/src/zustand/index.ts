import create from 'zustand';

export const usePerguntas = create((set: any) => ({
	dataPerguntas: null,
	// @ts-ignore
	setarPerguntas: (data) => set(() => ({ dataPerguntas: data })),
	limparPerguntas: () => set({ dataPerguntas: [] }),
}));

export const useRespostasSalvas = create((set: any) => ({
	respostasSalvas: [],
	// @ts-ignore
	setRespostasSalvas: (data) => set(() => ({ respostasSalvas: data })),
	limparRespostasSalvas: () => set({ respostasSalvas: [] }),
}));

const useTimer = create((set: any) => ({
	timer: '',
	// @ts-ignore
	setTimer: (data) => set(() => ({ timer: data })),
	limparTimer: () => set({ timer: '' }),
}));

export { useTimer };
