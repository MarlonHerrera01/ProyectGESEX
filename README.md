# ProyectGESEX

**ProyectGESEX** es una plataforma web diseñada para apoyar procesos de investigación y sensibilización frente a la homofobia. Permite la realización de pruebas estructuradas a diferentes grupos de participantes (miembros de la comunidad universitaria o habitantes de la ciudad de Manizales), recogiendo información de caracterización, segmentando a los usuarios según su perfil de riesgo, y proporcionando contenido educativo personalizado. El sistema resuelve la necesidad de contar con una herramienta automatizada que permita evaluar actitudes discriminatorias y promover la inclusión mediante el uso de tecnología.

## 🚀 Tecnologías Utilizadas

- **Backend**: Python (FastAPI)
- **Frontend**: React + Vite (HTML, CSS, JavaScript, TypeScript)

## 📁 Estructura del Proyecto

ProyectGESEX/
- ├── Backend/ # Lógica del servidor, API REST (FastAPI)
- ├── Frontend/ # Interfaz de usuario
- ├── .idea/ # Configuración del entorno de desarrollo (IDE)
- ├── package-lock.json
- └── README.md

## Backend - FastAPI
### Requisitos previos
- Python 3.10 o superior
- pip (gestor de paquetes de Python)
- Crear un entorno virtual (recomendado)

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/MarlonHerrera01/ProyectGESEX.git
```
### 2. Crea y activa un entorno virtual
```bash
python -m venv env
source env/bin/activate   # En Windows: env\Scripts\activate
```
Crea un archivo .env con tus variables de entorno si lo ves necesario (tokens, claves, etc.).

### 3. Accede a la carpeta del Backend
```bash
cd ProyectGESEX/Backend
```
### 4. Instala las dependencias
```bash
pip install -r requirements.txt
```
### 5. 🧪 Ejecutar el Backend
```bash
uvicorn app.main:app --reload
```
Una vez el servidor este corriendo: 
- Accede a la API desde: http://127.0.0.1:8000
- Accede a la Documentación Swagger desde : http://127.0.0.1:8000/docs

## Frontend - React + Vite
### Requisitos previos
- Node.js 18.X o superior
- npm (incluido con Node)

## ⚙️ Instalación

### 1. Accede a la carpeta del Frontend
```bash
cd ProyectGESEX/Frontend
```
### 2. Instala las dependencias
```bash
npm install
```
### 3. 🧪 Ejecutar el Frontend
```bash
npm run dev
```
Una vez el servidor este corriendo: 
- Por defecto, se abrirá en: http://localhost:5173

## 📊 Funcionalidades principales
- Creación y gestión de tests con múltiples dimensiones y preguntas.
- Registro de respuestas con datos de caracterización (edad, género, contexto, etc.).
- Generación de estadísticas globales y por pregunta.

## 👥 Autores
- [@MarlonHerrera01](https://github.com/MarlonHerrera01) - Marlon Estiven Aristizabal Herrera (Gestor del proyecto)
- [@SebastianG10](https://github.com/SebastianG10) - Juan Sebastian Garcia Hincapie (Product Owner)
- [@JeYeMC](https://github.com/JeYeMC) - Juan Felipe Marin Carmona (Arquitecto de Software)
- [@Checho0507](https://github.com/Checho0507) - Sergio Henao Arbelaez (Líder de calidad)

