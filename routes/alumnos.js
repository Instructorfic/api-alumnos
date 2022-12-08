const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const servicioAlumnos = require("../services/alumnos");
//Obtener el listado de alumnos inscritos en todos los cursos
app.route("/alumnos").get(servicioAlumnos.obtenerListadoAlumnos);

//Obtener el listado de las calificaciones de los alumnos inscritos en todos los cursos 
app.route("/alumnos/calificaciones").get(servicioAlumnos.obtenerListadoCalificacionesAlumnos);

//Obtener el listado de las calificaciones de los alumnos inscritos en un curso 
app.route("/alumnos/curso/:cursoId/calificaciones").get(servicioAlumnos.obtenerListadoCalificacionesAlumnosCurso);

//Obtener el listado de calificaciones de un alumno
app.route("/alumnos/:alumnoId/calificaciones").get(servicioAlumnos.obtenerListadoCalificacionesAlumnoCurso);

//Obtener los indicadores de un alumno
app.route("/alumnos/:alumnoId/indicadores").get(servicioAlumnos.obtenerIndicadoresAlumno);

//Obtener los indicadores por curso
app.route("/alumnos/curso/:cursoId/indicadores").get(servicioAlumnos.obtenerIndicadoresCurso);

//Dar de alta un alumno
app.route("/alumnos").post(servicioAlumnos.crearNuevoAlumno);

//Asignar la calificación de un curso a un alumno
app.route("/alumnos/:alumnoId/curso/:cursoId/calificacion/:calificacion").put(servicioAlumnos.asignarCalificacionAlumnoMateria);

module.exports = app;