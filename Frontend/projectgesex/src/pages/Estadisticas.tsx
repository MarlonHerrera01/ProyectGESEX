import React, { useEffect, useState } from "react";
import { obtenerEstadisticasPorEdad, obtenerEstadisticasPorPronombre, obtenerEstadisticasPorGenero, obtenerEstadisticasPorComuna } from "../services/estadisticas";
import { obtenerCuestionarios } from "../services/cuestionarios";
import PromediosPorDimension from "../components/PromediosPorDimension";  // Importar el componente Promedios
import DistribucionDimension from "../components/DistribucionPorDimension"; // Importar el componente Distribución

interface Cuestionario {
  id: string;
  titulo: string;
  caracterizacion_template: {
    tipo_participante: "universitario" | "habitante";
  };
}

const Estadisticas = () => {
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [testId, setTestId] = useState<string>("");
  const [tipoParticipante, setTipoParticipante] = useState<"universitario" | "habitante" | "">("");

  useEffect(() => {
    obtenerCuestionarios()
      .then((res) => {
        setCuestionarios(res.data);
      })
      .catch((err) => console.error("Error obteniendo cuestionarios", err));
  }, []);

  const handleChange = (id: string) => {
    setTestId(id);
    const seleccionado = cuestionarios.find((q) => q.id === id);
    if (seleccionado) {
      setTipoParticipante(seleccionado.caracterizacion_template?.tipo_participante || "");
    } else {
      setTipoParticipante("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Estadísticas del Test</h1>

      <div className="mb-6">
        <label htmlFor="tipoTest" className="block text-lg font-medium mb-1">
          Selecciona el test:
        </label>
        <select
          id="tipoTest"
          value={testId}
          onChange={(e) => handleChange(e.target.value)}
          className="bg-gray-100 rounded-xl p-3 text-base border border-gray-300 mt-2 transition duration-300 ease-in-out hover:bg-gray-200 cursor-pointer"
        >
          <option value="" disabled>
            -- Selecciona un test --
          </option>
          {cuestionarios.map((q) => (
            <option key={q.id} value={q.id}>
              {q.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Grid 3x2 con los títulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">Promedios por Dimensión</h2>
          {testId && <PromediosPorDimension testId={testId} />}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">Distribución por Dimensión</h2>
          {testId && <DistribucionDimension testId={testId} />}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">
            Comparación por Tipo de Participante
          </h2>
          {/* Aquí puedes agregar el componente correspondiente para la comparación */}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">Promedio por Edad</h2>
          {/* Aquí puedes agregar el componente de Promedio por Edad */}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">Promedio por Pronombre</h2>
          {/* Aquí puedes agregar el componente de Promedio por Pronombre */}
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-xl font-semibold">Promedio por Género</h2>
          {/* Aquí puedes agregar el componente de Promedio por Género */}
        </div>
      </div>

      {/* Componente extra solo si es habitante */}
      {tipoParticipante === "habitante" && (
        <div className="bg-white shadow-md rounded-xl p-4 mt-4">
          <h2 className="text-xl font-semibold">Conteo por Comuna</h2>
          {/* Aquí puedes agregar el componente de Conteo por Comuna */}
        </div>
      )}
    </div>
  );
};

export default Estadisticas;
