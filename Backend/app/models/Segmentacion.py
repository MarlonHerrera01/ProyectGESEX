# models/Segmentacion.py

# Esta clase implementa la lógica de análisis de respuestas
# para asignar una categoría basada en los niveles de homofobia

class Segmentacion:
    @staticmethod
    def calcular_categoria(respuestas: list[dict]) -> dict:
        """
        Analiza las respuestas agrupadas por dimensión (cada una con una lista de números del 1 al 5)
        y retorna una categoría basada en puntajes.
        También imprime los valores textuales asociados.
        """
        texto_respuestas = {
            5: "Totalmente en desacuerdo",
            4: "En desacuerdo",
            3: "Ni de acuerdo ni en desacuerdo",
            2: "De acuerdo",
            1: "Totalmente de acuerdo"
        }

        total_respuestas = 0
        total_puntos = 0

        print("Respuestas recibidas y su significado:")

        #Muestra las respuestas y su significado
        for grupo in respuestas:
            valores = grupo.get("respuestas", [])
            for valor in valores:
                texto = texto_respuestas.get(valor, "Respuesta desconocida")
                puntos = max(0, min(4, valor - 1))
                total_puntos += puntos
                total_respuestas += 1
                print(f"Respuesta: {valor} → {texto} | Puntaje asignado: {puntos}")

        porcentaje = (total_puntos / (total_respuestas * 4)) * 100 if total_respuestas > 0 else 0

        if porcentaje <= 20:
            categoria = "Sin homofobia"
        elif porcentaje <= 45:
            categoria = "Bajo nivel de homofobia"
        elif porcentaje <= 70:
            categoria = "Moderado nivel de homofobia"
        else:
            categoria = "Alto nivel de homofobia"

        return {
            "porcentaje": round(porcentaje, 2),
            "categoria": categoria
        }
