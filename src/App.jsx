import "./styles.css";
import { useState } from "react";
import Listado from "./componentes/Listado";
import Formulario from "./componentes/Formulario";
import Buscador from "./componentes/Buscador";
import Alert from "./componentes/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { BaseColaboradores } from "./assets/BaseColaboradores";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App() {
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);
  const [alert, setAlert] = useState({
    error: "",
    msg: "",
    color: "",
  });
  const [search, setSearch] = useState("");

  const handleSubmit = (nuevoColaborador) => {
    const colaboradorFinal = { ...nuevoColaborador, id: Date.now() };
    setColaboradores([...colaboradores, colaboradorFinal]);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const colaboradorFiltrados = colaboradores.filter((colaborador) => {
    if (
      colaborador.nombre.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.correo.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.edad.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.cargo.toLowerCase().includes(search.toLowerCase()) ||
      colaborador.telefono.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  return (
    <div className="mx-5">
      <h1 className="text-start">Listado de Colaboradores</h1>
      <Row>
        <Col sm={4} >
        <Buscador search={search} onChange={handleChange} />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={8}>
          <Listado colaboradores={colaboradorFiltrados} />
        </Col>
        <Col sm={6} md={3} className="border rounded text-center ms-4 me-2">
          <h2>Agregar Colaborador</h2>
          <Formulario onSubmit={handleSubmit} setAlert={setAlert} />
          {alert.msg && <Alert color={alert.color}>{alert.msg}</Alert>}
        </Col>
      </Row>
    </div>
  );
}
