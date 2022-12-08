//conexión con la base de datos
const {connection} = require("../config/db");

var serviciosAlumnos = {

     obtenerListadoAlumnos : (request, response) => {
        connection.query("SELECT * FROM alumnos", 
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json(results);
        });
    },

    obtenerListadoCalificacionesAlumnos : (request, response) => {
        connection.query("SELECT a.numero_cuenta, a.nombre, c.descripcion, ac.calificacion " +
        "FROM alumnos a " +
        "INNER JOIN alumnos_calificaciones ac ON a.id  = ac.alumno_id " + 
        "INNER JOIN cursos c ON ac.curso_id = c.id",
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json(results);
        });
    },

    obtenerListadoCalificacionesAlumnosCurso : (request, response) => {
        const cursoId = request.params.cursoId;
        connection.query("SELECT a.numero_cuenta, a.nombre, c.descripcion, ac.calificacion " +
        "FROM alumnos a " +
        "INNER JOIN alumnos_calificaciones ac ON a.id  = ac.alumno_id " + 
        "INNER JOIN cursos c ON ac.curso_id = c.id " +
        "WHERE ac.curso_id = ?",[cursoId],
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json(results);
        });
    },

    
    obtenerListadoCalificacionesAlumnoCurso: (request, response) => {
        const alumnoId = request.params.alumnoId;
        connection.query("SELECT c.descripcion as curso, ac.calificacion " +
        "FROM alumnos_calificaciones ac " + 
        "INNER JOIN cursos c ON ac.curso_id = c.id " + 
        "WHERE ac.alumno_id = ?",[alumnoId],
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json(results);
        });
    },

    obtenerIndicadoresAlumno: (request, response) => {
        const alumnoId = request.params.alumnoId;
        connection.query("SELECT ROUND(AVG(calificacion),2) AS promedio_general,COUNT(IF(calificacion >= 6, 1, NULL)) 'materias_aprobadas',\n"+
        "COUNT(IF(calificacion  < 6, 1, NULL)) 'materias_reprobadas'\n"+
        "FROM alumnos_calificaciones ac\n" + 
        "WHERE alumno_id  = ?",[alumnoId],
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json(results);
        });
    },

    obtenerIndicadoresCurso: (request, response) => {
        const cursoId = request.params.cursoId;
        connection.query("SELECT ROUND(AVG(calificacion),2) AS promedio_general,COUNT(IF(calificacion >= 6, 1, NULL)) 'alumnos_aprobados',\n"+
        "COUNT(IF(calificacion  < 6, 1, NULL)) 'alumnos_reprobados'\n"+
        "FROM alumnos_calificaciones ac\n" + 
        "WHERE curso_id  = ?",[cursoId],
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json(results);
        });
    },

    crearNuevoAlumno : (request, response) => {
        const {nombre, numero_cuenta, apellido_paterno, apellido_materno} = request.body;
        connection.query("INSERT INTO alumnos(nombre, numero_cuenta, apellido_paterno, apellido_materno) VALUES (?,?,?,?) ", 
        [nombre, numero_cuenta, apellido_paterno, apellido_materno],
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(201).json({"mensaje": "Los datos del alumno se registraron correctamente"});
        });
    },

    asignarCalificacionAlumnoMateria : (request, response) => {
        const alumnoId = request.params.alumnoId;
        const cursoId = request.params.cursoId;
        const calificacion = request.params.calificacion;
        connection.query("UPDATE alumnos_calificaciones SET calificacion = ? WHERE alumno_id = ? and  curso_id = ?", 
        [calificacion,alumnoId, cursoId],
        (error, results) => {
            if(error)
                response.status(500).json({"mensaje":"Ocurrió una excepción, intente de nuevo"});

            response.status(200).json({"mensaje":"La calificación del alumno se asignó correctamente"});
        });
    }
};

module.exports = serviciosAlumnos;