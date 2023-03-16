<?php
include '../../config/config.php';
extract($_REQUEST);

$docente = isset($docente) ? $docente : '[]';
$accion = isset($accion) ? $accion : '';
$class_docente = new Docente($conexion);
if ($accion=='consultar' ){
               print_r(json_encode($class_docente->consultar()));
}else{
               print_r($class_docente->recibir_datos($docentes));            
}

class Docente{
               private $datos=[], $db, $respuesta=['msg' => 'ok'];

               public function __contruct($db){
                              $this->db = $db;
               }
               public function recibir_datos($docentes){
                              $this->datos = json_decode($docentes, true);
                              return $this->validar_datos();
               }
               private function validar_datos(){
                              if(empty($this->datos['idDocente'])){
                                             $this->respuesta['msg'] = 'No se pudo seleccionar el ID';
                              }
                              if(empty($this->datos['codigo'])){
                                             $this->respuesta['msg'] = 'por favor ingrese el codigo';
                              }
                              if(empty($this->datos['nombre'])){
                                             $this->respuesta['msg'] = 'por favor ingrese el nombre';
                              }
                              return $this->administar_docente();
               }
               private function administar_docente(){
                              global $accion;
                              if( $this->respuesta['msg']=='ok' ){
                                             if($accion=='nuevo'){
                                                            $this->db->consultas(
                                                                           'INSERT INTO docentes VALUES(?,?,?)',
                                                                           $this->datos['idDocente'], $this->datos['codigo'], $this->datos['nombre']
                                                            );

                                             }else if($accion=='modificar'){
                                                            return $this->db->consultas(
                                                                           'UPDATE docentes SET codigo=?, nombre=? WHERE idDocente=?',
                                                                           $this->datos['codigo'],datos['nombre'],datos['idDocente']
                                                            );
                                                            
                                             }else if($accion=='eliminar'){
                                                            return $this->db->consultas(
                                                                           'DELETE docentes FROM docentes WHERE idDocente=?',
                                                                           $this->datos['idDocente']
                                                            );
                                             }
                              }else{
                                             return $this->respuesta;
                              }
               }
               public function consultar(){
                              $this->db->consultas('SELECT * FROM docentes');
                              return $this->db->obtener_datos();
               }
}
?>