<?php
include '../../Config/Config.php';
extract($_REQUEST);

$inscripciones = isset($inscripciones) ? $inscripciones : '[]';
$accion = isset($accion) ? $accion : '';
$class_inscripcion = new Inscripcion($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_inscripcion->consultar('')));
}else{
    print_r($class_inscripcion->recibir_datos($inscripciones));
}
class Inscripcion{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($inscripcion){
        $this->datos = json_decode($inscripcion, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idInscripcion'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['alumno'])){
               $this->respuesta['msg'] = 'Por favor seleccione un alumno';
           }
        if(empty($this->datos['materiaUno'])){
            $this->respuesta['msg'] = 'Por favor ingrese la materia 1';
        }
        if(empty($this->datos['materiaDos'])){
            $this->respuesta['msg'] = 'Por favor ingrese la materia 2';
        }
        if(empty($this->datos['materiaTres'])){
            $this->respuesta['msg'] = 'Por favor ingrese la materia 3';
        }
        if(empty($this->datos['materiaCuatro'])){
            $this->respuesta['msg'] = 'Por favor ingrese la materia 4';
        }
        if(empty($this->datos['materiaCinco'])){
            $this->respuesta['msg'] = 'Por favor ingrese la materia 5';
        }
        return $this->administrar_inscripcion();
    }
    private function administrar_inscripcion(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                return $this->db->consultas(
                    'INSERT INTO inscripciones VALUES(?,?,?)',
                    $this->datos['idInscripcion'], $this->alumno['alumno'], $this->datos['materiaUno'], $this->datos['materiaDos'], $this->datos['materiaTres'], $this->datos['materiaCuatro'], $this->datos['materiaCinco']
                );
            }else if($accion=='modificar'){
                return $this->db->consultas(
                    'UPDATE inscripciones SET alumno=?, materiaUno=?, materiaDos=?, materiaTres=?, materiaCuatro=?, materiaCinco=? WHERE idInscripcion=?',
                    $this->alumno['alumno'],$this->datos['materiaUno'], $this->datos['materiaDos'], $this->datos['materiaTres'], $this->datos['materiaCuatro'], $this->datos['materiaCinco'], $this->datos['idInscripcion']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE inscripciones FROM inscripciones WHERE idInscripcion=?',
                    $this->datos['idInscripcion']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM inscripciones');
        return $this->db->obtener_datos();
    }
}
?>