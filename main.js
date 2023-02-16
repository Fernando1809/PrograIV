const {
    createApp
} = Vue;
var db;
createApp({
    data(){
        return{
            forms:{
                docente:    {mostrar:false},
                alumno:     {mostrar:false},
                materia:    {mostrar:false},
                matricula:  {mostrar:false},
                inscripcion:{mostrar:false},
            }
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms(form).mostrar = true;
            console.log(form, this.forms[form]);
        },
        abrirBD(){
            let indexDB = indexedDB.open('db_sistema_academico',1);
            indexDB.onupgradeneeded=e=>{
                let req = e.target.result,
                    tblalumno = req.createObjectStore('tblalumnos',{keyPath:'idAlumno'});   
                    //tblmateria = req.createObjectStore('tblmaterias',{keyPath:'idMateria'});

                tblalumno.createIndex('idAlumno', 'idAlumno', {unique:true});
                //tblmateria.createIndex('idMateria', 'idMateria', {unique:true});
            };
            indexDB.onsuccess= e=>{
                db = e.target.result;
                this.listarAlumnos();
            };
            indexDB.onerror= e=>{
                console.error( e );
            };
        },
    },
    created() {
        this.abrirBD();
    }
}).mount('#app');