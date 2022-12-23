import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import ContentLoader from 'react-content-loader';
import { CiClock1 } from 'react-icons/ci';
import ProgressBar from '@ramonak/react-progress-bar';

const Loading = () => {
	return (
		<div className="pb-3">
			<div
				className="container-header px-3 pt-2 pb-2"
				style={{ backgroundColor: '#28A956' }}
			>
				<div className="pb-1">
					<BiLeftArrowAlt color="white" size={35} />
				</div>
				<div className="d-flex align-items-center justify-content-between mb-3">
					<div className="d-flex flex-column">
						<h1 className="titulo">Simulado</h1>
						<span className="quantidade-questoes">
							<ContentLoader
								speed={2}
								width={130}
								height={30}
								backgroundColor="#d9d9d9"
								foregroundColor="#ededed"
							>
								<rect x="0" y="0" rx="" ry="4" width="100%" height="100%" />
							</ContentLoader>
						</span>
					</div>

					<div className="d-flex flex-column align-items-center">
						<CiClock1 color="#fff" size={35} />
						<span className="minutos-restantes">{/* <Timer /> */}</span>
					</div>
				</div>

				<div className="d-flex flex-column pb-5">
					<ProgressBar
						height="7px"
						bgColor="#FFD54F"
						completed={0}
						maxCompleted={0}
						labelClassName="label-progress"
					/>
					<span className="text-end py-2" style={{ color: '#fff' }}>
						<ContentLoader
							speed={2}
							width={50}
							height={20}
							backgroundColor="#d9d9d9"
							foregroundColor="#ededed"
						>
							<rect x="0" y="0" rx="" ry="4" width="100%" height="100%" />
						</ContentLoader>
					</span>
				</div>
			</div>

			<div className="container px-3" style={{ marginTop: -40 }}>
				<div className="container-simulado">
					<span className="identificador-pergunta">
						QUESTÃO{' '}
						<ContentLoader
							speed={2}
							width={50}
							height={20}
							backgroundColor="#d9d9d9"
							foregroundColor="#ededed"
						>
							<rect x="0" y="0" rx="" ry="4" width="100%" height="100%" />
						</ContentLoader>
					</span>
					<ContentLoader
						width={400}
						speed={2}
						height={130}
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<rect x="80" y="33" rx="3" ry="3" width="354" height="15" />
						<rect x="80" y="68" rx="3" ry="3" width="354" height="15" />
						<rect x="80" y="103" rx="3" ry="3" width="100%" height="15" />
					</ContentLoader>
				</div>

				<div>
					<div className="d-flex align-items-center container-alternativa">
						<input className="me-2 " type="radio" id="" readOnly />
						<span>
							<ContentLoader
								width={400}
								speed={2}
								height={60}
								backgroundColor="#f3f3f3"
								foregroundColor="#ecebeb"
							>
								<rect x="40" y="0" rx="3" ry="3" width="354" height="15" />
								<rect x="40" y="40" rx="3" ry="3" width="354" height="15" />
							</ContentLoader>
						</span>
					</div>
				</div>
				<div>
					<div className="d-flex align-items-center container-alternativa">
						<input className="me-2 " type="radio" id="" readOnly />
						<span>
							<ContentLoader
								width={400}
								speed={2}
								height={60}
								backgroundColor="#f3f3f3"
								foregroundColor="#ecebeb"
							>
								<rect x="40" y="0" rx="3" ry="3" width="354" height="15" />
								<rect x="40" y="40" rx="3" ry="3" width="354" height="15" />
							</ContentLoader>
						</span>
					</div>
				</div>
				<div>
					<div className="d-flex align-items-center container-alternativa">
						<input className="me-2 " type="radio" id="" readOnly />
						<span>
							<ContentLoader
								width={400}
								speed={2}
								height={60}
								backgroundColor="#f3f3f3"
								foregroundColor="#ecebeb"
							>
								<rect x="40" y="0" rx="3" ry="3" width="354" height="15" />
								<rect x="40" y="40" rx="3" ry="3" width="354" height="15" />
							</ContentLoader>
						</span>
					</div>
				</div>
				<div>
					<div className="d-flex align-items-center container-alternativa">
						<input className="me-2 " type="radio" id="" readOnly />
						<span>
							<ContentLoader
								width={400}
								speed={2}
								height={60}
								backgroundColor="#f3f3f3"
								foregroundColor="#ecebeb"
							>
								<rect x="40" y="0" rx="3" ry="3" width="354" height="15" />
								<rect x="40" y="40" rx="3" ry="3" width="354" height="15" />
							</ContentLoader>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export { Loading };
