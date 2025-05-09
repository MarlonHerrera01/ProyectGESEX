import React, { useEffect, useState } from "react";
import { obtenerFormularios, enviarRespuestas } from "../services/Cuestionarios";
import { obtenerFingerprint } from "../Utils/fingerprint";

const Encuesta = () => {
  const [formularios, setFormularios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState<string | null>(null); // ID del formulario seleccionado
  const [caracterizacion, setCaracterizacion] = useState<{ [key: string]: string }>({});
  const [respuestas, setRespuestas] = useState<{ [key: string]: string }>({}); // Respuestas de las preguntas

  useEffect(() => {
    obtenerFormularios()
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          throw new Error("No se encontraron formularios.");
        }
        setFormularios(response.data);
      })
      .catch((err) => {
        setError(`Error al cargar los formularios: ${err.message}`);
        console.error("Detalles del error:", err);
      });
  }, []);

  const handleCaracterizacionChange = (campo: string, valor: string) => {
    setCaracterizacion((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleRespuestaChange = (preguntaId: string, valor: string) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formularioSeleccionado) {
      alert("Por favor selecciona un formulario.");
      return;
    }

    const formulario = formularios.find(
      (formulario: any) => formulario.id === formularioSeleccionado
    );

    if (!formulario) {
      alert("Formulario no encontrado.");
      return;
    }

    const respuestasPorDimension = formulario.dimensiones.map((dimension: any) => {
      const respuestasDimension = dimension.preguntas.map(
        (_: string, index: number) => {
          const preguntaId = `pregunta-${index + 1}`;
          return parseInt(respuestas[preguntaId] || "0", 10);
        }
      );
      return {
        dimension: dimension.nombre,
        respuestas: respuestasDimension,
      };
    });

    // Esperar a que fingerprint esté disponible
    const fingerprint = await obtenerFingerprint();

    const data = {
      test_id: formularioSeleccionado,
      respuestas: respuestasPorDimension,
      caracterizacion_datos: caracterizacion,
      fecha: new Date().toISOString().split("T")[0],
      fingerprint: fingerprint,
    };

    try {
      const response = await enviarRespuestas(data);
      alert("Respuestas enviadas correctamente.");
      console.log("Respuesta del servidor:", response.data);
      setCaracterizacion({});
      setRespuestas({});
      setFormularioSeleccionado(null);
    } catch (err: any) {
      alert("Hubo un error al enviar las respuestas.");
      console.error("Detalles del error:", err);
    }
  };


  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (formularios.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando cuestionarios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 px-4 md:px-10 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Selecciona un Cuestionario
      </h1>

      {/* Lista de botones para seleccionar el formulario */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {formularios.map((formulario) => (
          <button
            key={formulario.id}
            onClick={() => setFormularioSeleccionado(formulario.id)}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${formularioSeleccionado === formulario.id
              ? "bg-red-700 shadow-lg"
              : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {formulario.caracterizacion_template.tipo_participante}
          </button>
        ))}
      </div>

      {/* Renderizar el formulario seleccionado */}
      {formularioSeleccionado && (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 border rounded-lg shadow-md p-6 bg-white"
        >
          {formularios
            .filter((formulario) => formulario.id === formularioSeleccionado)
            .map((formulario) => (
              <div key={formulario.id}>
                {/* Sección de caracterización */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Información de Caracterización
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formulario.caracterizacion_template.campos_requeridos.map(
                      (campo: string, index: number) => (
                        <div key={index} className="flex flex-col">
                          <label className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
                            {campo.replace(/_/g, " ")}
                          </label>
                          {campo.toLowerCase() === "edad" ? (
                            <select
                              name={campo}
                              value={caracterizacion[campo] || ""}
                              onChange={(e) =>
                                handleCaracterizacionChange(campo, e.target.value)
                              }
                              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="" disabled>
                                Seleccione su rango de edad
                              </option>
                              <option value="15-20">Entre 15 y 20</option>
                              <option value="21-30">Entre 21 y 30</option>
                              <option value="31-40">Entre 31 y 40</option>
                              <option value="41-50">Entre 41 y 50</option>
                              <option value="51-60">Entre 51 y 60</option>
                              <option value="60+">Mayor de 60</option>
                            </select>
                          ) : campo.toLowerCase() === "lugar_procedencia" ? (
                            <select
                              name={campo}
                              value={caracterizacion[campo] || ""}
                              onChange={(e) =>
                                handleCaracterizacionChange(campo, e.target.value)
                              }
                              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="" disabled>
                                Seleccione su lugar de procedencia
                              </option>
                              <option value="urbano">Urbano</option>
                              <option value="rural">Rural</option>
                            </select>
                          ) : campo.toLowerCase() === "pronombre" ? (
                            <select
                              name={campo}
                              value={caracterizacion[campo] || ""}
                              onChange={(e) =>
                                handleCaracterizacionChange(campo, e.target.value)
                              }
                              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="" disabled>
                                Seleccione su pronombre
                              </option>
                              <option value="ella">Ella</option>
                              <option value="el">Él</option>
                              <option value="elle">Elle</option>
                              <option value="prefiero_no_decirlo">
                                Prefiero no decirlo
                              </option>
                            </select>
                          ) : campo.toLowerCase() === "estamento" ? (
                            <select
                              name={campo}
                              value={caracterizacion[campo] || ""}
                              onChange={(e) =>
                                handleCaracterizacionChange(campo, e.target.value)
                              }
                              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="" disabled>
                                Seleccione su estamento
                              </option>
                              <option value="estudiante">Estudiante</option>
                              <option value="profesor">Profesor</option>
                              <option value="empleado">Empleado</option>
                              <option value="otro">Otro</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              name={campo}
                              value={caracterizacion[campo] || ""}
                              onChange={(e) =>
                                handleCaracterizacionChange(campo, e.target.value)
                              }
                              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Ingrese ${campo.replace(/_/g, " ")}`}
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Preguntas organizadas en tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(() => {
                    let contadorGlobal = 1; // Contador global para las preguntas
                    return formulario.dimensiones.map((dimension: any) =>
                      dimension.preguntas.map((pregunta: string, index: number) => {
                        const numeroPregunta = contadorGlobal++; // Incrementar el contador global
                        return (
                          <div
                            key={`${dimension.nombre}-${index}`}
                            className="border rounded-lg shadow-md p-4 bg-white"
                          >
                            <p className="font-semibold mb-4">
                              {numeroPregunta}. {pregunta}
                            </p>
                            <div className="space-y-2">
                              <label className="block">
                                <input
                                  type="radio"
                                  name={`pregunta-${numeroPregunta}`}
                                  value="1"
                                  className="mr-2 accent-red-700"
                                  onChange={(e) =>
                                    handleRespuestaChange(
                                      `pregunta-${numeroPregunta}`,
                                      e.target.value
                                    )
                                  }
                                />
                                Totalmente en desacuerdo
                              </label>
                              <label className="block">
                                <input
                                  type="radio"
                                  name={`pregunta-${numeroPregunta}`}
                                  value="2"
                                  className="mr-2 accent-red-700"
                                  onChange={(e) =>
                                    handleRespuestaChange(
                                      `pregunta-${numeroPregunta}`,
                                      e.target.value
                                    )
                                  }
                                />
                                En desacuerdo
                              </label>
                              <label className="block">
                                <input
                                  type="radio"
                                  name={`pregunta-${numeroPregunta}`}
                                  value="3"
                                  className="mr-2 accent-red-700"
                                  onChange={(e) =>
                                    handleRespuestaChange(
                                      `pregunta-${numeroPregunta}`,
                                      e.target.value
                                    )
                                  }
                                />
                                Neutral
                              </label>
                              <label className="block">
                                <input
                                  type="radio"
                                  name={`pregunta-${numeroPregunta}`}
                                  value="4"
                                  className="mr-2 accent-red-700"
                                  onChange={(e) =>
                                    handleRespuestaChange(
                                      `pregunta-${numeroPregunta}`,
                                      e.target.value
                                    )
                                  }
                                />
                                De acuerdo
                              </label>
                              <label className="block">
                                <input
                                  type="radio"
                                  name={`pregunta-${numeroPregunta}`}
                                  value="5"
                                  className="mr-2 accent-red-700"
                                  onChange={(e) =>
                                    handleRespuestaChange(
                                      `pregunta-${numeroPregunta}`,
                                      e.target.value
                                    )
                                  }
                                />
                                Totalmente de acuerdo
                              </label>
                            </div>
                          </div>
                        );
                      })
                    );
                  })()}
                </div>
              </div>
            ))}
          {/* Botón de envío */}
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-6"
          >
            Enviar Respuestas
          </button>
        </form>
      )}
    </div>
  );
};

export default Encuesta;