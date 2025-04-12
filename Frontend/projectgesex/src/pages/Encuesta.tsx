import QuestionCard from "../components/QuestionCard";
import CaracterizacionForm from "../components/CaracterizacionForm";

const Encuesta = () => {
  const preguntas = [
    // 1. Creencias y prejuicios sobre personas LGBTQ+
    "1. Es natural que una familia tenga una madre y un padre como modelo.",
    "2. Las parejas del mismo sexo, o con identidad de género diversa no deberían adoptar menores.",
    "3. La orientación sexual e identidad de género son una decisión personal y puede cambiarse.",
    "4. La homosexualidad y la diversidad en la identidad de género son contrarias a los valores de mi comunidad.",
    "5. La homosexualidad y la diversidad en la identidad de género son contrarias a los valores de mi familia.",

    // 2. Comportamiento y distancia social
    "6. Siento incomodidad si tengo una maestra o un maestro abiertamente homosexual con identidad de género diversa.",
    "7. Siento incomodidad si tengo una compañera o compañero de clase abiertamente homosexual o con identidad de género diversa.",
    "8. Preferiría no compartir vivienda con una persona homosexual o con identidad de género diversa.",
    "9. No me gustaría que mi mejor amiga o amigo fuera homosexual o con identidad de género diversa.",
    "10. Evitaría votar por un candidato político que sea abiertamente homosexual o con identidad de género diversa.",

    // 3. Derechos y equidad
    "11. Todas las personas, sin importar su orientación sexual o su identidad de género, deberían tener los mismos derechos.",
    "12. Es justo que las parejas del mismo sexo o con identidad de género diversa, puedan casarse legalmente.",
    "13. Las personas LGBTQ+ deben poder expresar su afecto en público sin restricciones.",
    "14. La discriminación hacia personas homosexuales o con identidad de género diversa debe sancionarse legalmente.",
  ];

  return (
    <div className="space-y-12 px-4 md:px-10 py-8">
      {/* Formulario de datos personales */}
      <CaracterizacionForm />

      {/* Preguntas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
        {preguntas.map((pregunta, index) => (
          <QuestionCard key={index} question={pregunta} />
        ))}
      </div>
    </div>
  );
};

export default Encuesta;
