import React from 'react';
import { useState, useEffect } from 'react';
import { useTimer } from '../../zustand';

const Timer = () => {
	const [cronometro, setCronometro] = useState(0);
	const setTimer = useTimer((state: any) => state.setTimer);

	useEffect(() => {
		const interval = setInterval(() => {
			setCronometro((time) => time + 1000);
		}, 1000);
		// getTime(tempoExpiracao1h as unknown),

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const minutosPassados = ('0' + Math.floor((cronometro / 60000) % 60)).slice(
			-2,
		);

		const segundosPassados = ('0' + Math.floor((cronometro / 1000) % 60)).slice(
			-2,
		);

		const tempoPassado = `${minutosPassados}:${segundosPassados}`;
		setTimer(tempoPassado);
	}, [cronometro]);

	return (
		<div className="timer">
			<span className="digits">
				{('0' + Math.floor((cronometro / 60000) % 60)).slice(-2)}:
			</span>
			<span className="digits">
				{('0' + Math.floor((cronometro / 1000) % 60)).slice(-2)}
			</span>
		</div>
	);
};

export { Timer };
