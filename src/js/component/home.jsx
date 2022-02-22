import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/styles/index.scss";
import {
	Button,
	Container,
	Form,
	Modal,
	ModalBody,
	ModalFooter,
	Row,
	Table
} from "reactstrap";

const dataTarea = [{ id: 1, tarea: "Lavar mascota", fecha: "12 / 12 / 2021" }];
//create your first component
const Home = () => {
	const [data, setData] = useState(dataTarea);
	const [modalEliminar, setModalEliminar] = useState(false);
	const [tareaSeleccionada, setTareaSeleccionada] = useState({
		id: "",
		tarea: "",
		fecha: ""
	});
	const seleccionarTarea = (elemento, caso) => {
		setTareaSeleccionada(elemento);
		caso === "Eliminar" && setModalEliminar(true);
	};
	const handleChange = e => {
		const { name, value } = e.target;
		setTareaSeleccionada(prevState => ({
			...prevState,
			[name]: value
		}));
	};
	const eliminar = () => {
		const filtrado = data.filter(
			tarea => tarea.id !== tareaSeleccionada.id
		);
		setData(filtrado);
		setModalEliminar(false);
	};

	const limpiarSetTareaSeleccionada = () => {
		setTareaSeleccionada(null);
	};

	const insertar = () => {
		const valorIsertar = tareaSeleccionada;
		valorIsertar.id = data[data.length - 1].id + 1;
		/* const dataNueva = data;
		dataNueva.push(valorIsertar); */
		setData([...data, valorIsertar]);
	};
	return (
		<>
			<Container className="p-4 col-8">
				<Row>
					<h1 className="d-flex justify-content-center">TODO List</h1>
				</Row>
				<Row>
					<Form className="border border-warning">
						<div className="mb-3">
							<label className="form-label">ID</label>
							<input
								className="form-control"
								id="id"
								name=""
								value={data.length + 1}
								onChange={handleChange}
								disabled
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Tarea</label>
							<input
								className="form-control"
								id="tarea"
								name="tarea"
								placeholder="¿Qué tarea debe realizar?"
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Fecha</label>
							<input
								className="form-control"
								name="fecha"
								id="fecha"
								placeholder="XX/XX/XXXX"
								onChange={handleChange}
							/>
						</div>
						<div className="d-flex justify-content-center m-2">
							<Button
								className="btn btn-success d-flex justify-content-center"
								onClick={() => insertar()}>
								Insertar Tarea
							</Button>
						</div>
					</Form>
				</Row>
			</Container>
			<Container className="col-8">
				<Row>
					<Table className="table-warning mt-3">
						<thead>
							<tr>
								<th>ID</th>
								<th>Tarea</th>
								<th>Fecha</th>
								<th>Accion</th>
							</tr>
						</thead>
						<tbody>
							{data.length === 0
								? "Cree una tarea con el boton verde por favor..."
								: data.map(elemento => {
										return (
											<tr
												className="table-light"
												key={elemento.id}>
												<td>{elemento.id}</td>
												<td>{elemento.tarea}</td>
												<td>{elemento.fecha}</td>
												<td>
													{/* <Button className="btn btn-primary">
												Editar
											</Button>
											{"  "} */}
													<Button
														className="btn btn-danger"
														onClick={() =>
															seleccionarTarea(
																elemento,
																"Eliminar"
															)
														}>
														Eliminar
													</Button>
													<Modal
														isOpen={modalEliminar}>
														<ModalBody>
															Estás Seguro que
															deseas eliminar
															Tarea:{" "}
															{tareaSeleccionada &&
																tareaSeleccionada.tarea}
														</ModalBody>
														<ModalFooter>
															<button
																className="btn btn-danger"
																onClick={() =>
																	eliminar(
																		elemento.id
																	)
																}>
																Sí
															</button>
															<button
																className="btn btn-secondary"
																onClick={() =>
																	setModalEliminar(
																		false
																	)
																}>
																No
															</button>
														</ModalFooter>
													</Modal>
												</td>
											</tr>
										);
								  })}
						</tbody>
					</Table>
				</Row>
			</Container>
		</>
	);
};

export default Home;
