Vue.component('v-select-materia',VueSelect.VueSelect);
Vue.component('v-select-matricula',VueSelect.VueSelect);
Vue.component('component-inscripcion',{
    data:()=>{
        return {
            buscar:'',
            inscripcions:[],
            inscripcion:{
                accion : 'nuevo',
                idInscripcion : '',
                fecha:'',
                
            }
        }
    },
    methods:{
        buscandoInscripcion(){
            this.obtenerInscripcions(this.buscar);
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar el inscripcion ${inscripcion.nombre}?`) ){
                this.inscripcion.accion = 'eliminar';
                this.inscripcion.idInscripcion = inscripcion.idInscripcion;
                this.guardarInscripcion();
            }
            this.nuevoInscripcion();
        },
        modificarInscripcion(datos){
            this.inscripcion = JSON.parse(JSON.stringify(datos));
            this.inscripcion.accion = 'modificar';
        },
        guardarInscripcion(){
            this.obtenerInscripcions();
            let inscripcions = JSON.parse(localStorage.getItem('inscripcions')) || [];
            if(this.inscripcion.accion=="nuevo"){
                this.inscripcion.idInscripcion = generarIdUnicoFecha();
                inscripcions.push(this.inscripcion);
            } else if(this.inscripcion.accion=="modificar"){
                let index = inscripcions.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                inscripcions[index] = this.inscripcion;
            } else if( this.inscripcion.accion=="eliminar" ){
                let index = inscripcions.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                inscripcions.splice(index,1);
            }
            localStorage.setItem('inscripcions', JSON.stringify(inscripcions));
            this.nuevoInscripcion();
            this.obtenerInscripcions();
            this.inscripcion.msg = 'Inscripcion procesado con exito';
        },
        obtenerInscripcions(valor=''){
            this.inscripcions = [];
            let inscripcions = JSON.parse(localStorage.getItem('inscripcions')) || [];
            this.inscripcions = inscripcions.filter(inscripcion=>inscripcion.fecha.toLowerCase().indexOf(valor.toLowerCase())>-1 ||
                                        inscripcion.codigo.indexOf(this.buscar)>-1);
             
            //aqui vemos las docentes 
            this.materias = [];
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            this.materias = materias.map(materia=>{
                return {
                    //id: docente.idCategoria,
                    label: materia.nombre,
                }
            }),
            this.matriculas = [];
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            this.matriculas = matriculas.map(matricula=>{
                return {
                    //id: docente.idCategoria,
                    label: matricula.codigo,
                }
            });
            
        },
        nuevoInscripcion(){
            this.inscripcion.accion = 'nuevo';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.fecha='';
            
            
            
        }
    },
    created(){
        this.obtenerInscripcions();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carInscripcion">
                <div class="card-header bg-secondary">
                    Registro de Inscripcions
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarInscripcion" @reset="nuevoInscripcion">
                        
                        <div class="row p-1">
                            <div class="col col-md-2">fecha de inscripcion :</div>
                            <div class="col col-md-2">
                                <input title="Ingrese la fecha" v-model="inscripcion.fecha" required type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-2">
                            Id_estudiante:
                        </div>
                        <div class="col col-md-3">
                            <v-select-matricula v-model="inscripcion.matricula" 
                                :options="matriculas" placeholder="Seleccione"/>
                        </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-2">
                            Materia 1:
                        </div>
                        <div class="col col-md-3">
                            <v-select-materia v-model="inscripcion.materia" 
                                :options="materias" placeholder="Seleccione"/>
                        </div>
                        </div>
                        <div class="row p-1">
                          <div class="col col-md-2">
                              Materia 2:
                          </div>
                          <div class="col col-md-3">
                              <v-select-materia v-model="inscripcion.materia2" 
                                  :options="materias" placeholder="Seleccione"/>
                          </div>
                        </div>
                        <div class="row p-1">
                          <div class="col col-md-2">
                              Materia 3:
                          </div>
                          <div class="col col-md-3">
                              <v-select-materia v-model="inscripcion.materia3" 
                                  :options="materias" placeholder="Seleccione"/>
                          </div>
                        </div>
                        <div class="row p-1">
                          <div class="col col-md-2">
                              Materia 4:
                          </div>
                          <div class="col col-md-3">
                              <v-select-materia v-model="inscripcion.materia4" 
                                  :options="materias" placeholder="Seleccione"/>
                          </div>
                        </div>
                        <div class="row p-1">
                          <div class="col col-md-2">
                              Materia 5:
                          </div>
                          <div class="col col-md-3">
                              <v-select-materia v-model="inscripcion.materia5" 
                                  :options="materias" placeholder="Seleccione"/>
                          </div>
                        </div>
                        
                       
                       
                        
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="inscripcion.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ inscripcion.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarInscripcion">
                <div class="card-header bg-secondary">
                    Busqueda de Inscripcions
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoInscripcion" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>FECHAS</th>
                                <th>CODIGO</th>
                                <th>MATERIA</th>
                                <th>MATERIA 2</th>
                                <th>MATERIA 3</th>
                                <th>MATERIA 4</th>
                                <th>MATERIA 5</th>
    
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in inscripcions" @click='modificarInscripcion( item )' :key="item.idInscripcion">
                                <td>{{item.fecha}}</td>
                                <td>{{item.matricula.label}}</td>
                                <td>{{item.materia.label}}</td>
                                <td>{{item.materia2.label}}</td>
                                <td>{{item.materia3.label}}</td>
                                <td>{{item.materia4.label}}</td>
                                <td>{{item.materia5.label}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarInscripcion(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});