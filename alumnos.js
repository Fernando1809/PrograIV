Vue.component('component-alumnos',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            alumnos: [],
            alumno:{
              idAlumno: '',
              codigo: '',
              nombre: '',
              apellido: '',
              genero :'',
              dui :'',
              fechaN :'',
              direccion :'',
              telefono :'',
              
            }
        }
    },
    methods:{
        guardarAlumno(){
            this.listar();
            if(this.accion==='nuevo'){
                this.alumno.idAlumno = new Date().getTime().toString(16);
                this.alumnos.push( JSON.parse( JSON.stringify(this.alumno) ) );
            }else if(this.accion==='modificar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos[index] = JSON.parse( JSON.stringify(this.alumno) );
            }else if(this.accion==='eliminar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos.splice(index,1);
            }
            localStorage.setItem("alumnos", JSON.stringify(this.alumnos) );
            fetch(`private/modulos/alumnos/alumnos.php?accion=${this.accion}&alumnos=${JSON.stringify(this.alumno)}`)
                       .then(resp=>resp.json)
                       .then(resp=>{
                        console.log(resp);
                       });
            this.nuevoAlumno();
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar a ${alumno.nombre}?`) ){
                this.accion='eliminar';
                this.alumno=alumno;
                this.guardarAlumno();
            }
        },
        nuevoAlumno(){
          this.accion = 'nuevo';
          this.alumno.idAlumno = '';
          this.alumno.codigo = '';
          this.alumno.nombre = '';
          this.alumno.apellido = '';
          this.alumno.genero = '';
          this.alumno.dui = '';
          this.alumno.fechaN = '';
          this.alumno.direccion = '';
          this.alumno.telefono = '';
        },
  
        modificarAlumno(alumno){
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        listar(){
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]" )
                .filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
                if(this.alumnos.lenght<=0 && this.buscar.trim().lenght<=0 ){
                 fetch('private/modulos/alumnos/alumnos.php?accion=consultar')
                 .then(resp=>resp.json())
                 .then(resp=>{
                     this.docentes=resp;
                     localStorage.setItem("alumnos", JSON.stringify(this.alumnos) );
                });
            }
       }
   },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card text-center">
                    <div class="card-header bg-primary text-white">REGISTRO DE ALUMNOS</div>
                    <div class="card-body">
                        <form id="frmAlumno" @reset.prevent="nuevoAlumno" v-on:submit.prevent="guardarAlumno">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoAlumno">CODIGO:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[US|SM]{2}[IS|LI]{2}[0-9]{6}" 
                                        title="Ingrese un codigo de alumno de 3 digitos"
                                            v-model="alumno.codigo" type="text" class="form-control" name="txtCodigoAlumno" id="txtCodigoAlumno">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreAlumno">NOMBRE:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="alumno.nombre" type="text" class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
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
                                    <input required pattern="[0-9]{8}-[0-9]{1}"
                                        v-model="alumno.dui" type="text" class="form-control" name="txtDuiAlumno" id="txtDuiAlumno">
                                </div>
                            </div>
              <div class="row p-1">
                  <div class="col-3 col-md-2">
                      <label for="txtFechaNAlumno">FECHA DE NACIMIENTO:</label>
                  </div>
                  <div class="col-9 col-md-6">
                      <input required pattern="[0-9]{2}" v-model="alumno.fechaN" type="date" class="form-control"
                          name="txtFechaNAlumno" id="txtFechaNAlumno">
                  </div>
              </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtDireccionAlumno">DIRECCION:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="alumno.direccion" type="text" class="form-control" name="txtDireccionAlumno" id="txtDireccionAlumno">
                                </div>
                            </div>
                            <div class="row p-1">
                                                   <div class="col-3 col-md-2">
                                                       <label for="txtTelefonoAlumno">TELEFONO:</label>
                                                   </div>
                                                   <div class="col-9 col-md-6">
                                                       <input title="Ingrese un numero correcto" 
                                                       v-model="alumno.telefono" type="text" class="form-control" name="txtTelefonoAlumno" id="txtTelefonoAlumno">                                        
                                                   </div>
                                               </div> 
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card text-center">
                    <div class="card-header bg-primary text-white">LISTADO DE ALUMNOS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>GENERO</th>
                                <th>DUI</th>
                                <th>FECHA DE NACIMIENTO</th>
                                <th>DIRECCION</th>
                                <th>TELEFONO</th>
                                <th>ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="alumno in alumnos" :key="alumno.idAlumno" @click="modificarAlumno(alumno)" >
                                <td>{{alumno.codigo }}</td>
                                <td>{{ alumno.nombre }}</td>
                                <td>{{ alumno.genero }}</td>
                                <td>{{ alumno.dui }}</td>
                                <td>{{ alumno.fechaN }}</td>
                                <td>{{ alumno.direccion }}</td>
                                <td>{{ alumno.telefono }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarAlumno(alumno)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
  });