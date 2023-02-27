//const { createApp } = Vue; //Es exclusivo de la v3 de Vue.js
var db;
//createApp({
var app = new Vue({
    el: "#app",
    data: {
        forms:{
            docente     : {mostrar:false},
            alumno      : {mostrar:false},
            materia     : {mostrar:false},
            matricula   : {mostrar:false},
            inscripcion : {mostrar:false},
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        },
        abrirBD(){
            let indexDB = indexedDB.open('db_sistema_academico',1);
            indexDB.onupgradeneeded=e=>{
                let req = e.target.result,
                    tbldocente = req.createObjectStore('tbldocentes', {keyPath:'idDocente'}),
                    tblalumno = req.createObjectStore('tblalumnos',{keyPath:'idAlumno'}),
                    tblmateria = req.createObjectStore('tblmaterias',{keyPath:'idMateria'});

                tbldocente.createIndex('idDocente', 'idDocente', {unique:true});
                tblalumno.createIndex('idAlumno', 'idAlumno', {unique:true});
                tblmateria.createIndex('idMateria', 'idMateria', {unique:true});
            };
            indexDB.onsuccess= e=>{
                db = e.target.result;
            };
            indexDB.onerror= e=>{
                console.error( e );
            };
        }, 
    },
    created() {
        this.abrirBD();
    }
});