Vue.componet('componet-alumnos',{
    data() {
        return {
            db:'',				
            accion: 'nuevo',
            buscar: '',
            alumnos: [],
            alumno: {
                idAlumno: '',
                codigo: '',
                nombre: '',
                apellido: '',
                genero :'',
                dui :'',
                edad :'',
                telefono :'',
                direccion :'',
            }
        }
    },
    methods: {
        guardarAlumno() {
            this.listarAlumnos();
           let store = this.abrirStore('tblalumnos', 'readwrite');
            if(this.accion==='nuevo'){
                this.alumno.idAlumno = new Date().getTime().toString(16);
                this.alumnos.push( JSON.parse( JSON.stringify(this.alumno) ) );
            }else if(this.accion==='modificar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumno[index] = JSON.parse(JSON.stringify(this.alumno));
            }else if(this.accion=='eliminar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos.slice(index,1);
            }
            localStorage.setItem("alumnos", JSON.stringify(this.alumnos) );
            this.nuevoAlumno();
        },
        eliminarAlumno(alumno) {
            if( confirm(`Esta seguro de eliminar a ${alumno.nombre}?`) ){
                this.accion='eliminar';
                this.alumno=alumno;
                this.guardarAlumno();
            }
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.apellido = '';
            this.alumno.genero = '';
            this.alumno.dui = '';
            this.alumno.edad = '';
            this.alumno.telefono = '';
            this.alumno.direccion = '';
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        listarAlumnos() {
            let store = this.abrirStore('tblalumnos', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.alumnos = data.result
                    .filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        alumno.codigo.indexOf(this.buscar)>-1);
            };
        },
         abrirStore(store, modo){
            let tx = this.db.transaction(store, modo); //modo = readonly || writeonly
            return tx.objectStore(store);
        },
        
    },
    template: ` <div class="row">
    <div class="col-12 col-md-9">
        <div class="card text-bg-info text-center ">
            <div class="card-header bg-primary text-white">REGISTRO DE ALUMNOS</div>
            <div class="card-body">
                <form id="frmAlumno" @reset.prevent="nuevoAlumno" v-on:submit.prevent="guardarAlumno">
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtCodigoAlumno">CODIGO:</label>
                        </div>
                        <div class="col-9 col-md-6">
                        <input required pattern="^[US|SM]{2}[IS|LI|LA]{2}[0-9]{6}$"
                            title="Ingrese un codigo de alumno valido" placeholder="CODIGO" v-model="alumno.codigo" type="text"
                            class="form-control" name="txtCodigoAlumno" id="txtCodigoAlumno">
                    </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtNombreAlumno">NOMBRE:</label>
                </div>
                <div class="col-9 col-md-6">
                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" placeholder="NOMBRE" v-model="alumno.nombre" type="text"
                        class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtApellidoAlumno">APELLIDO:</label>
                </div>
                <div class="col-9 col-md-6">
                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" placeholder="APELLIDO"v-model="alumno.apellido" type="text"
                        class="form-control" name="txtAlumnoAlumno" id="txtAlumnoAlumno">
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtGeneroAlumno">GENERO:</label>
                </div>
                <div class="col-9 col-md-6">
                        <select  required pattern="selected" v-model="alumno.genero" type="selected" class="form-control" name="txtGeneroAlumno" id="txtGeneroAlumno">
                            <option disabled value="">Seleccione genero</option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>No binario</option>
                          </select>
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtDuiAlumno">DUI:</label>
                </div>
                <div class="col-9 col-md-6">
                    <input required pattern="[0-9|-]{10}" placeholder="00000000-0" v-model="alumno.dui" type="text" class="form-control"
                        name="txtDuiAlumno" id="txtDuiAlumno">
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtEdadAlumno">FECHA DE NACIMIENTO:</label>
                </div>
                <div class="col-9 col-md-6">
                    <input required pattern="[0-9]{2}" v-model="alumno.edad" type="date" class="form-control"
                        name="txtEdadAlumno" id="txtEdadAlumno">
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtTelefonoAlumno">TELEFONO:</label>
                </div>
                <div class="col-9 col-md-6">
                    <input required pattern="[0-9|-]{9}" placeholder="1234-5678" v-model="alumno.telefono" type="text"
                        class="form-control" name="txtTelefonoAlumno" id="txtTelefonoAlumno">
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-2">
                    <label for="txtDireccionAlumno">MUNICIPIO</label>
                </div>
                <div class="col-9 col-md-6">
                    <input placeholder="Municipio" v-model="alumno.direccion" type="text" class="form-control" name="txtDireccionAlumno"
                        id="txtDireccionAlumno">
                </div>
            </div>
            <div class="row p-1">
                <div class="col-3 col-md-3">
                    <input class="btn btn-success" type="submit" value="Guardar">
                </div>
                <div class="col-9 col-md-9">
                    <input class="btn btn-warning" type="reset" value="Nuevo">
                </div>
            </div>
            </form>
        </div>
    </div>
</div>
</div>
<br>
<div class="col-12 col-md-10">
    <div class="card border-primary">
        <div class="card-header bg-dark text-center text-white">LISTADO DE ALUMNOS</div>
        <div class="card-body">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>BUSCAR:</th>
                        <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                @keyup="listarAlumnos()" placeholder="Buscar por nombre"></th>
                    </tr>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>GENERO</th>
                        <th>DUI</th>
                        <th>FECHA DE NACIMIENTO</th>
                        <th>TELEFONO</th>
                        <th>MUNICIPIO</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="alumno in alumnos" :key="alumno.idAlumno" @click="modificarAlumno(alumno)">
                        <td>{{alumno.codigo }}</td>
                        <td>{{ alumno.nombre }}</td>
                        <td>{{ alumno.apellido }}</td>
                        <td>{{ alumno.genero }}</td>
                        <td>{{ alumno.dui }}</td>
                        <td>{{ alumno.edad }}</td>
                        <td>{{ alumno.telefono }}</td>
                        <td>{{ alumno.direccion }}</td>
                        
                        <td><button class="btn btn-danger" @click="eliminarAlumno(alumno)">ELIMINAR</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>`
});
