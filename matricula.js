Vue.component('v-select-alumnos', VueSelect.VueSelect);
Vue.component('component-matricula',{
               data() {
                   return {
                       accion:'nuevo',
                       buscar: '',
                       matricula: [],
                       alumnos:[],
                       matricula:{
                              idMatricula : 0,
                              codigo    : '',
                              dui       : '',
                              ciclo     : '',
                              carrera   : '',
                              fecha     : ''
                       }
                   }
                   
               },
               methods:{
                   guardarMatricula(){
                       this.listar();
                       if(this.accion==='nuevo'){
                           this.matricula.idMatricula = new Date().getTime().toString(16);
                           this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
                       }else if(this.accion==='modificar'){
                           let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                           this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
                       }else if(this.accion==='eliminar'){
                           let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                           this.matriculas.splice(index,1);
                       }
                       localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
                       this.nuevoMatricula();
                   },
                   eliminarMatricula(matricula){
                       if( confirm(`Esta seguro de eliminar a ${matricula.nombre}?`) ){
                           this.accion='eliminar';
                           this.matricula=matricula;
                           this.guardarMatricula();
                       }
                   },
                   nuevoMatricula(){
                              this.accion='nuevo';
                              this.matricula.alumno.id=0;
                              this.matricula.registro_alumno.label="";
                              this.matricula.idMatricula='';
                              this.matricula.codigo='';
                              this.matricula.carrera='';
                              this.matricula.dui='';
                              this.matricula.ciclo='';
                              this.matricula.fecha='';
                   },
             
                   modificarMatricula(matricula){
                       this.accion = 'modificar';
                       this.matricula = matricula;
                   },
                   listar(){
                       this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                           .filter(matricula=>matricula.codigo.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
                   }
               },
               template: `
               <div class="row">
               <div class="col-12 col-md-6">
                   <div class="card text-center">
                       <div class="card-header text-bg-dark text-white">MATRICULA</div>
                       <div class="card-body">
                           <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                                <div class="row p-2">
                                <div class="col-3 col-md-2">
                                <div class="col-sm">Código:</div>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input required pattern="[US|SM]{2}[IS|LI]{2}[0-9]{6}" 
                                        title="Ingrese un codigo de alumno de 3 digitos"
                                            v-model="matricula.codigo" type="text" class="form-control" name="txtCodigoAlumno" id="txtCodigoAlumno">
                                </div>
                            </div>
                            <div class="col-3 col-md-2 text-center">
                            <div class="col-sm">Carrera:</div>
                  </div>
                            <div class="row">
                            <div class="col-md-9 col-md-9">
                            <select  required pattern="selected" v-model="matricula.carrera" type="selected" class="form-control" name="txtCarrera" id="txtCarrera">
                            <option disabled value="">Seleccione Carrera</option>
                            <option>Ingenieria en Sistemnas</option>
                                  <option>Tecnico Ingenieria en sistemas</option>
                                  <option>licenciatura en Enfermeria</option>
                                  <option>Licenciatura en Idioma Ingles</option>
                                  <option>Licenciatura en Administracion de empresas turisticas</option>
                                  <option>Licenciatura en Comunicaciones</option>
                                  <option>Licenciatura en Leyes</option>
                                  <option>Licenciatura en Contaduria Publica</option>
                                  <option>Licenciatura en mercadeo y ventas</option>
                                  <option>Licenciatura en mercadotecnia</option>
                                  <option>Tecnico en enfermeria</option>
                          </select>
                            </div>
                        </div>                            
        <div class="row p-2">
            <div class="col-sm">Ciclo a Matricular: </div>
            <div class="col-sm">
                <input required pattern="[I,II,III,IV,V,VI,VII,VIII,IX,X]" v-model="matricula.ciclo" type="text" class="form-control form-control-sm">
            </div>
        </div>
        <div class="row p-2">
            <div class="col-sm">Fecha de la Matricula: </div>
            <div class="col-sm">
                <input v-model="matricula.fecha" type="date" class="form-control form-control-sm">
            </div>
        </div>
        <div class="row p-2">
            <div class="col-sm text-center">
                <input type="submit" value="Guardar" class="btn btn-dark">
                <input type="reset" value="Limpiar" class="btn btn-info">
            </div>
        </div>
        <div class="row p-2">
            <div class="col-sm text-center">
                <div v-if="status" class="alert" v-bind:class="[error ? 'alert-danger' : 'alert-success']">
                    {{ msg }}
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-6">
                           <div class="card text-center">
                               <div class="card-header text-bg-dark text-white">MATRICULAS REALIZADAS</div>
                               <div class="card-body">
                                   <table class="table table-bordered table-hover">
                                   <thead>
                                   <tr>
                                       <th>BUSCAR:</th>
                                       <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                           @keyup="listar()"
                                           placeholder="Buscar por nombre"></th>
                                   </tr>
                        <tr>
                            <th>Codigo</th>
                            <th>Carrera</th>
                            <th>Ciclo Matriculado</th>
                            <th>Fecha de la Matricula</th>
                            <th></th>
                        </tr>
                               </thead>
                               <tbody>
                                   <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                   <td>{{matricula.codigo }}</td>
                                   <td>{{matricula.carrera }}</td>
                                   <td>{{ matricula.ciclo }}</td>
                                   <td>{{ matricula.fecha }}</td>
                                       <td><button class="btn btn-danger" @click="eliminarMatricula(matricula)">ELIMINAR</button></td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
           </div>
               `
             });