import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import './App.css';
import './stylesheet.scss';
import { useQuery, gql } from '@apollo/client';
import { REQ_PROCURAR_PERGUNTA } from './services/querys';

function App() {
	const palavraChave = 'coletora';

	const [count, setCount] = useState(0);
	const { loading, error, data } = useQuery(REQ_PROCURAR_PERGUNTA, {
		variables: { palavraChave },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	console.log(data);

	return (
		<div>
			<span>oi</span>
		</div>
	);
}

export default App;
