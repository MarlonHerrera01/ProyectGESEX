import { useState } from "react";

const CaracterizacionForm = () => {
  const [form, setForm] = useState({
    correo: "",
    edad: "",
    procedencia: "",
    estrato: "",
    estamento: "",
    programa: "",
    departamento: "",
    dependencia: "",
    pronombre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Caracterización del Participante</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={form.correo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <select name="edad" value={form.edad} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Edad</option>
          <option>Entre 15 y 20</option>
          <option>Entre 21 y 30</option>
          <option>Entre 31 y 40</option>
          <option>Entre 41 y 50</option>
          <option>Entre 51 y 60</option>
          <option>Mayor de 60</option>
        </select>

        <select name="procedencia" value={form.procedencia} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Lugar de procedencia</option>
          <option>Urbano</option>
          <option>Rural</option>
        </select>

        <input
          type="text"
          name="estrato"
          placeholder="Estrato socioeconómico"
          value={form.estrato}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <select name="estamento" value={form.estamento} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Estamento</option>
          <option>Estudiante</option>
          <option>Profesor</option>
          <option>Empleado</option>
          <option>Otro</option>
        </select>

        <input
          type="text"
          name="programa"
          placeholder="Programa académico"
          value={form.programa}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          name="departamento"
          placeholder="Departamento de adscripción"
          value={form.departamento}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          name="dependencia"
          placeholder="Dependencia o área"
          value={form.dependencia}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Pronombre con el que se identifica:</label>
        <div className="flex flex-wrap gap-4">
          {["Ella", "Él", "Elle", "Prefiero no decirlo"].map((p) => (
            <label key={p} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="pronombre"
                value={p}
                checked={form.pronombre === p}
                onChange={handleChange}
              />
              {p}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaracterizacionForm;
