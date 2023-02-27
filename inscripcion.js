Vue.component('v-select-matricula', VueSelect.VueSelect);
Vue.component('component-inscripcion',{
               data:()=>{
                   return {
                       accion : 'nuevo',
                       msg    : '',
                       status : false,
                       error  : false,
                       buscar : "",
                       inscripcion:{
                           idInscripcion  : 0,
                           matricula : {
                               id : 0,
                               label : '' 
                           },
                           codigo        : '',
                           materia1      : '',
                           materia2      : '',
                           materia3      : '',
                           materia4      : '',
                           materia5      : '',
                           fechaIns      :''
                       },
                       inscripcion:[],
                       matricula:[]
                 
                   }
               },
               methods:{
                   buscandoInscripcion(){
                       this.inscripcion = this.inscripcion.filter((element,index,inscripcion) => element.materia1.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.codigo.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.materia2.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.materia3.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.materia4.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 );
                       if( this.buscar.length<=0){
                           this.obtenerDatos();
                       }
                   },
                   buscandoCodigoInscripcion(store){
                       let buscarCodigo = new Promise( (resolver,rechazar)=>{
                           let index = store.index("codigo"),
                               data = index.get(this.inscripcion.codigo);
                           data.onsuccess=evt=>{
                               resolver(data);
                           };
                           data.onerror=evt=>{
                               rechazar(data);
                           };
                       });
                       return buscarCodigo;
                   },
                   async guardarInscripcion(){
                       let store = this.abrirStore("tblinscripcion",'readwrite'),
                           duplicado = false;
                       if( this.accion=='nuevo' ){
                           this.inscripcion.idInscripcion = generarIdUnicoDesdeFecha();
                           
                           let data = await this.buscandoCodigoInscripcion(store);
                           duplicado = data.result!=undefined;
                       }
                       if( duplicado==false){
                           let query = store.put(this.inscripcion);
                           query.onsuccess=event=>{
                               this.obtenerDatos();
                               this.limpiar();
                               
                               this.mostrarMsg('INSCRIPCIÓN GUARDADA CON ÉXITO',false);
                           };
                           query.onerror=event=>{
                               this.mostrarMsg('HUBO UN ERROR AL GUARDAR',true);
                               console.log( event );
                           };
                       } else{
                           this.mostrarMsg('CÓDIGO DUPLICADO',true);
                       }
                   },
                   mostrarMsg(msg, error){
                       this.status = true;
                       this.msg = msg;
                       this.error = error;
                       this.quitarMsg(3);
                   },
                   quitarMsg(time){
                       setTimeout(()=>{
                           this.status=false;
                           this.msg = '';
                           this.error = false;
                       }, time*1000);
                   },
                   obtenerDatos(){
                       let store = this.abrirStore('tblinscripcion','readonly'),
                           data = store.getAll();
                       data.onsuccess=resp=>{
                           this.inscripcion = data.result;
                       };
           
                       let storeMatricula = this.abrirStore('tblmatricula','readonly'),
                           dataMatricula = storeMatricula.getAll();
                       this.matricula = [];
                       dataMatricula.onsuccess=resp=>{
                           dataMatricula.result.forEach(element => {
                               this.matricula.push({id:element.idMatricula, label:element.codigo});
                           });
           
                   
                       };
                   },
           
                   mostrarInscripcion(insc){
                       this.inscripcion = insc;
                       this.accion='modificar';
                   },
           
                   limpiar(){
                       this.accion='nuevo';
                       this.inscripcion.matricula.id=0;
                       this.inscripcion.matricula.label="";
           
                       this.inscripcion.idInscripcion='';
                       this.inscripcion.codigo='';
                       this.inscripcion.materia1='';
                       this.inscripcion.materia2='';
                       this.inscripcion.materia3='';
                       this.inscripcion.materia4='';
                       this.inscripcion.materia5='';
                       this.inscripcion.fechaIns='';
                       this.obtenerDatos();
                   },
                   eliminarInscripcion(insc){
                       if( confirm(`¿ESTA SEGURO DE ELIMINAR LA INSCRIPCION DEL ESTUDIANTE?:  ${insc.codigo}`) ){
                           let store = this.abrirStore("tblinscripcion",'readwrite'),
                               req = store.delete(insc.idInscripcion);
                           req.onsuccess=resp=>{
                               this.mostrarMsg('FUE ELIMINADO CON ÉXITO',true);
                               this.obtenerDatos();
                           };
                           req.onerror=resp=>{
                               this.mostrarMsg('HUBO UN ERROR AL ELIMINARLO',true);
                               console.log( resp );
                           };
                       }
                   },
                   abrirStore(store,modo){
                       let tx = db.transaction(store,modo);
                       return tx.objectStore(store);
                   }
               },
               created(){
                   //this.obtenerDatos();
               },
               template:`
               <div class="row">
               <div class="col-12 col-md-6">
                   <div class="card text-center">
                       <div class="card-header text-bg-secondary text-white">INSCRIPCION DE MATERIAS</div>
                       <div class="card-body">
                               <div class="row p-2">
                                   <div class="col-sm">CODIGO ALUMNO:</div>
                                   <div class="col-sm">
                                       <v-select-matricula v-model="inscripcion.matricula" :options="matricula" placeholder="Seleccione"/>
                                   </div>
                               </div>
                               <div class="row p-2">
                               <div class="col-sm">Materia I:</div>
                               <div class="col-sm">
                                   <input v-model="inscripcion.materia1" type="text" class="form-control form-control-sm"/>
                               </div>
                             </div> 
                             <div class="row p-2">
                               <div class="col-sm">Materia II:</div>
                               <div class="col-sm">
                                   <input v-model="inscripcion.materia2" type="text" class="form-control form-control-sm"/>
                               </div>
                             </div>
                             <div class="row p-2">
                             <div class="col-sm">Materia III:</div>
                             <div class="col-sm">
                                 <input v-model="inscripcion.materia3" type="text" class="form-control form-control-sm"/>
                             </div>
                           </div>
                           <div class="row p-2">
                           <div class="col-sm">Materia IV:</div>
                           <div class="col-sm">
                               <input v-model="inscripcion.materia4" type="text" class="form-control form-control-sm"/>
                           </div>
                         </div>
                         <div class="row p-2">
                           <div class="col-sm">Materia V:</div>
                           <div class="col-sm">
                               <input v-model="inscripcion.materia5" type="text" class="form-control form-control-sm"/>
                           </div>
                         </div>
                           <div class="row p-2">
                            <div class="col-sm">Fecha de Inscripción:</div>
                               <div class="col-sm">
                                <input v-model="inscripcion.fechaIns" required type="date" class="form-control form-control-sm" >
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
                               <div class="card-header text-bg-secondary text-white">MATERIAS INSCRITAS</div>
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
                                    <tr>
                                        <th>Código</th>
                                        <th>Materia I</th>
                                        <th>Materia II</th>
                                        <th>Materia III</th>
                                        <th>Materia IV</th>
                                        <th>Materia V</th>
                                        <th>Fecha de Inscripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="insc in inscripcion" v-on:click="mostrarInscripcion(insc)">
                                        <td>{{ insc.codigo }}</td>
                                        <td>{{ insc.materia1 }}</td>
                                        <td>{{ insc.materia2 }}</td>
                                        <td>{{ insc.materia3 }}</td>
                                        <td>{{ insc.materia4 }}</td>
                                        <td>{{ insc.materia5 }}</td>
                                        <td>{{ insc.fechaIns }}</td>
                                        <td>{{ insc.matricula.label }}</td>
                                        <td>
                                            <a @click.stop="eliminarInscripcion(insc)" class="btn btn-danger">ELIMINAR</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </form>
               `
           });
           