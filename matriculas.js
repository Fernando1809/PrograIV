Vue.component('v-select-alumnos', VueSelect.VueSelect);
Vue.component('component-matriculas',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            matriculas: [],
            alumnos : [],
            matricula:{
                idMatricula  : '',
                fecha     : '',
                pago      : false,
                comprobante : '',
                alumno    : {
                    id    : '',
                    label : ''
                },
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
            if( confirm(`Esta seguro de eliminar a ${matricula.alumno.label}?`) ){
                this.accion='eliminar';
                this.matricula=matricula;
                this.guardarMatricula();
            }
        },
        nuevoMatricula(){
            this.accion = 'nuevo';
            this.matricula.idMatricula = '';
            this.matricula.fecha = '';
            this.matricula.pago = false;
            this.matricula.alumno.id = '';
            this.matricula.alumno.label = '';
        },
        modificarMatricula(matricula){
            this.accion = 'modificar';
            this.matricula = matricula;
        },
        listar(){
            this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                .filter(matricula=>matricula.alumno.label.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                    matricula.fecha.indexOf(this.buscar)>-1);
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]" ).map(alumno=>{
                return { 
                    id: alumno.idAlumno,
                    label : alumno.nombre
                }
            });
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card text-center">
                    <div class="card-header bg-warning">REGISTRO DE MATRICULA</div>
                    <div class="card-body">
                        <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMatricula">ALUMNO:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-alumnos required v-model="matricula.alumno" :options="alumnos" ></v-select-alumnos>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>FECHA:</label>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input required v-model="matricula.fecha" type="date" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtPagoMatricula">ACTUALIZAR PAGO:</label>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input v-model="matricula.pago" type="checkbox" class="form-check-input" id="txtPagoMatricula">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <img :src="matricula.comprobante" width="50" height="50">
                                </div>
                                <div class="col-9 col-md-10">
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="inputGroupFile01">Upload</label>
                                        <input accept="image/*" onChange="seleccionarImagen(this)" type="file" class="form-control" id="inputGroupFile01">
                                    </div>
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
                    <div class="card-header bg-warning">LISTADO DE MATRICULAS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="3"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>FECHA</th>
                                    <th>PAGO</th>
                                    <th>COMPROBANTE</th>
                                    <th>ALUMNO</th>
                                    <th>ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                    <td>{{ new Date(matricula.fecha +' 01:00:00').toLocaleDateString() }}</td>
                                    <td>{{ matricula.pago ? 'ACTUALIZADO' : 'PENDIENTE' }}</td>
                                    <td><img :src="matricula.comprobante" width="50" height="50"></td>
                                    <td>{{ matricula.alumno.label }}</td>
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

async function seleccionarImagen(image){
    let archivo = image.files[0];
    if(archivo){
        let blob = await img(archivo, 1),
            reader = new FileReader();
        reader.onload = e=>{
            app.$refs.matricula.matricula.comprobante = e.target.result;
            console.log( e.target.result ); 
        };
        reader.readAsDataURL(blob);
    }
}