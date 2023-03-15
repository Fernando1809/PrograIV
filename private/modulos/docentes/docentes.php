<?php
include '../../config/config.php';
extract($_REQUEST);

$docentes = isset($docentes) ? $docentes : '[]';
$accion = isset($accion) ? $accion : '';

class Docente{
               private $datos=[], $db; $respuesta=['msg' => 'ok'];

               public function __contruct($db){
                              $this->db = $db;
               }
               public function recibir_datos($docentes){
                              $this->datos = json_decode($docente, true);
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

                                             }else if($accion=='modificar'){
                                                            
                                             }
                              }else{
                                             return $this->respuesta;
                              }
               }
}
?>