<?php
include '../../Config/Config.php';
extract($_REQUEST);

$docentes = isset($docentes) ? $docentes : '[]';
$accion = isset($accion) ? $accion : '';
$class_docente = new Docente($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_docente->consultar('')));
}else{
    print_r($class_docente->recibir_datos($docentes));
}
class Docente{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($docente){
        $this->datos = json_decode($docente, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idDocente'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['codigo'])){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if(empty($this->datos['nombre'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        return $this->administrar_docente();
    }
    private function administrar_docente(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                return $this->db->consultas(
                    'INSERT INTO docentes VALUES(?,?,?)',
                    $this->datos['idDocente'], $this->datos['codigo'], $this->datos['nombre']
                );
            }else if($accion=='modificar'){
                return $this->db->consultas(
                    'UPDATE docentes SET codigo=?, nombre=? WHERE idDocente=?',
                    $this->datos['codigo'], $this->datos['nombre'], $this->datos['idDocente']
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