import React, { useEffect, useState } from "react";
import {
  obtenerEstadisticasPorEdad,
  obtenerEstadisticasPorPronombre,
  obtenerEstadisticasPorGenero,
  obtenerEstadisticasPorComuna,
} from "../services/estadisticas";
import {
  obtenerFormularios
} from "../services/cuestionarios"

interface Estadistica {
  label: string;
  valor: number;
}

interface Cuestionario {
  id: string;
  titulo: string;
}

const Estadisticas = () => {
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [testId, setTestId] = useState<string>("");
  const [porEdad, setPorEdad] = useState<Estadistica[]>([]);
  const [porPronombre, setPorPronombre] = useState<Estadistica[]>([]);
  const [porGenero, setPorGenero] = useState<Estadistica[]>([]);
  const [porComuna, setPorComuna] = useState<Estadistica[]>([]);

  useEffect(() => {
    obtenerFormularios()
      .then((res) => {
        setCuestionarios(res.data),
        console.log(testId)
      })
      .catch((err) => console.error("Error obteniendo cuestionarios", err));

  }, [testId]);

  useEffect(() => {
    obtenerEstadisticasPorEdad(testId)
      .then((res) => {
        
        setPorEdad(res.data)})
      .catch((err) => console.error(err));

    obtenerEstadisticasPorPronombre(testId)
      .then((res) => setPorPronombre(res.data))
      .catch((err) => console.error(err));

    obtenerEstadisticasPorGenero(testId)
      .then((res) => setPorGenero(res.data))
      .catch((err) => console.error(err));

    obtenerEstadisticasPorComuna(testId)
      .then((res) => setPorComuna(res.data))
      .catch((err) => console.error(err));
  }, [testId]);

  return (
    <div>
      <h1>Estadísticas del Test</h1>

      <div>
      <label htmlFor="tipoTest">Selecciona el test:</label>
      <select
        id="tipoTest"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
      >
        {cuestionarios.map((q: Cuestionario) => (
          <option key={q.id} value={q.id}>
            {q.titulo}
          </option>
        ))}
      </select>
      </div>

      <section>
        <h2>Promedio por Edad</h2>
        <ul>
          {porEdad.map((item, index) => (
            <li key={index}>{item.label}: {item.valor}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Promedio por Pronombre</h2>
        <ul>
          {porPronombre.map((item, index) => (
            <li key={index}>{item.label}: {item.valor}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Promedio por Género</h2>
        <ul>
          {porGenero.map((item, index) => (
            <li key={index}>{item.label}: {item.valor}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Conteo por Comuna</h2>
        <ul>
          {porComuna.map((item, index) => (
            <li key={index}>{item.label}: {item.valor}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Estadisticas;
