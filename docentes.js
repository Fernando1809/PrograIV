Vue.component('component-docentes', {
    data() {
        return {
            accion: 'nuevo',
            buscar: '',
            docentes: [],
            docente: {
                idDocente: '',
                codigo: '',
                nombre: '',
            }
        }
    },
    methods: {
        guardarDocente() {
            this.listar();
            if (this.accion === 'nuevo') {
                this.docente.idDocente = new Date().getTime().toString(16);
                this.docentes.push(JSON.parse(JSON.stringify(this.docente)));
            } else if (this.accion === 'modificar') {
                let index = this.docentes.findIndex(docente => docente.idDocente == this.docente.idDocente);
                this.docentes[index] = JSON.parse(JSON.stringify(this.docente));
            } else if (this.accion === 'eliminar') {
                let index = this.docentes.findIndex(docente => docente.idDocente == this.docente.idDocente);
                this.docentes.splice(index, 1);
            }
            localStorage.setItem("docentes", JSON.stringify(this.docentes));
            fetch(`private/modulos/docentes/docentes.php?accion=${this.accion}&docentes=${JSON.stringify(this.docente)}`)
                .then(resp => resp.json)
                .then(resp => {
                    console.log(resp);
                });
            this.nuevoDocente();
        },
        eliminarDocente(docente) {
            if (confirm(`Esta seguro de eliminar a ${docente.nombre}?`)) {
                this.accion = 'eliminar';
                this.docente = docente;
                this.guardarDocente();
            }
        },
        nuevoDocente() {
            this.accion = 'nuevo';
            this.docente.idDocente = '';
            this.docente.codigo = '';
            this.docente.nombre = '';
        },
        modificarDocente(docente) {
            this.accion = 'modificar';
            this.docente = docente;
        },
        listar() {
            this.docentes = JSON.parse(localStorage.getItem('docentes') || "[]")
                .filter(docente => docente.nombre.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1);
            if (this.docentes.lenght <= 0 && this.buscar.trim().lenght <= 0) {
                fetch('private/modulos/docentes/docentes.php?accion=consultar')
                    .then(resp => resp.json())
                    .then(resp => {
                        this.docentes = resp;
                        localStorage.setItem("docentes", JSON.stringify(this.docentes));
                    });
            }
        }
    },
    template: `
                   <div class="row">
                       <div class="col-12 col-md-6">
                           <div class="card text-center">
                               <div class="card-header text-bg-danger text-white">REGISTRO DE DOCENTE</div>
                               <div class="card-body">
                                   <form id="frmDocente" @reset.prevent="nuevoDocente" v-on:submit.prevent="guardarDocente">
                                       <div class="row p-1">
                                           <div class="col-3 col-md-2">
                                               <label for="txtCodigoDocente">CODIGO:</label>
                                           </div>
                                           <div class="col-9 col-md-6">
                                               <input required pattern="[0-9]{3}" 
                                                   title="Ingrese un codigo de docente de 3 digitos"
                                                       v-model="docente.codigo" type="text" class="form-control" name="txtCodigoDocente" id="txtCodigoDocente" placeholder="ej:456">
                                           </div>
                                       </div>
                                       <div class="row p-1">
                                           <div class="col-3 col-md-2">
                                               <label for="txtNombreDocente">NOMBRE:</label>
                                           </div>
                                           <div class="col-9 col-md-6">
                                               <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                                   v-model="docente.nombre" type="text" class="form-control" name="txtNombreDocente" id="txtNombreDocente" placeholder="ej: Juan Perez">
                                           </div>
                                       </div>
                                       <div class="row p-1">
                                                   <div class="col-3 col-md-2">
                                                       <label for="txttelefono">TITULO:</label>
                                                   </div>
                                                   <div class="col-9 col-md-6">
                                                       <input v-model="docente.titulo" type="text" class="form-control" name="txttitulo" id="txttitulo" placeholder="ej: Ingenieria en Sistemas">
                                                   </div>
                                               </div> 
                                               <div class="row p-1">
                                                   <div class="col-3 col-md-2">
                                                       <label for="txttelefono">EDAD:</label>
                                                   </div>
                                                   <div class="col-9 col-md-6">
                                                       <input v-model="docente.edad" type="text" class="form-control" name="txtedad" id="txtedad" placeholder="ej: 37">
                                                   </div>
                                               </div>
                                               <div class="row p-1">
                                                   <div class="col-3 col-md-2">
                                                       <label for="txttelefono">TELEFONO:</label>
                                                   </div>
                                                   <div class="col-9 col-md-6">
                                                       <input title="Ingrese un numero correcto" 
                                                       v-model="docente.telefono" type="text" class="form-control" name="txttelefono" id="txttelefono" placeholder="Ej: 7756-1214">                                        
                                                   </div>
                                               </div> 
                                               <div class="row p-1">
                                                   <div class="col-9 col-md-6">
                                                   <label for="txtdepartamento">DEPARTAMENTO: </label>
                                                       <select id="txtdepartamento" name="txtdepartamento" v-model="docente.departamento">
                                                           <option value=''>Seleccione</option>
                                                           <option>Ahuachapan</option>
                                                           <option>Santa Ana</option>
                                                           <option>Chalatenango</option>
                                                           <option>La Libertad</option>
                                                           <option>Sonsonate</option>
                                                           <option>San Salvador</option>
                                                           <option>Cuscatlan</option>
                                                           <option>Cabañas</option>
                                                           <option>La Union</option>
                                                           <option>La Paz</option>
                                                           <option>Morazan</option>
                                                           <option>San Vicente</option>
                                                           <option>Usulutan</option>
                                                           <option>San Miguel</option>
                                                       </select>
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
                               <div class="card-header text-bg-danger text-white">LISTADO DE DOCENTES</div>
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
                                               <th>CODIGO</th>
                                               <th>NOMBRE</th>
                                               <th>TITULO</th>
                                               <th>EDAD</th>
                                               <th>TELEFONO</th>
                                               <th>DEPARTAMENTO</th>
           
                                           </tr>
                                       </thead>
                                       <tbody>
                                           <tr v-for="docente in docentes" :key="docente.idDocente" @click="modificarDocente(docente)" >
                                               <td>{{ docente.codigo }}</td>
                                               <td>{{ docente.nombre }}</td>
                                               <td>{{ docente.titulo }}</td>
                                               <td>{{ docente.edad }}</td>
                                               <td>{{ docente.telefono }}</td>
                                               <td>{{ docente.departamento }}</td>
           
                                               <td><button class="btn btn-danger" @click="eliminarDocente(docente)">ELIMINAR</button></td>
                                           </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>
                       </div>
                   </div>
               `
});