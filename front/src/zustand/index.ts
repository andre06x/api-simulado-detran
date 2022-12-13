import create from 'zustand';

export const usePerguntas = create((set) => ({
	dataPerguntas: null,
	setarPerguntas: (data) => set((state) => ({ dataPerguntas: data })),
	limparPerguntas: () => set({ dataPerguntas: [] }),
}));

export const useRespostasSalvas = create((set) => ({
	respostasSalvas: [],
	setRespostasSalvas: (data) => set((state) => ({ respostasSalvas: data })),
	limparRespostasSalvas: () => set({ respostasSalvas: [] }),
}));

export const useTimer = create((set) => ({
	timer: '',
	setTimer: (data) => set((state) => ({ timer: data })),
	limparRespostasSalvas: () => set({ timer: '' }),
}));
