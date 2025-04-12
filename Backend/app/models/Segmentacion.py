# models/Segmentacion.py

# Esta clase implementa la lógica de análisis de respuestas
# para asignar una categoría basada en los niveles de homofobia

class Segmentacion:
    @staticmethod
    def calcular_categoria(respuestas: list[str]) -> dict:
        """
        Analiza las respuestas y retorna una categoría basada en puntajes.
        """
        puntajes = {
            "Muy positiva": 0,
            "Positiva": 1,
            "Neutral": 2,
            "Negativa": 3,
            "Muy negativa": 4
        }
        print(respuestas, type(respuestas), "Print respuestas")
        total = len(respuestas)
        total_puntos = sum([puntajes.get(r, 2) for r in respuestas])
        porcentaje = (total_puntos / (total * 4)) * 100

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
