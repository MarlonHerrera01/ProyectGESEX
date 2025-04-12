import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Ajusta si cambias de entorno

// 1. Crear estadística
export const obtenerCuestionarios = () => {
  return axios.get(`${API_BASE_URL}/cuestionarios/`);
};