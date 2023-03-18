<?php
include '../../Config/Config.php';
extract($_REQUEST);

$alumnos = isset($alumnos) ? $alumnos : '[]';
$accion = isset($accion) ? $accion : '';
$class_alumno = new Alumno($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_alumno->consultar('')));
}else{
    print_r($class_alumno->recibir_datos($alumnos));
}
class Alumno{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($alumno){
        $this->datos = json_decode($alumno, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idAlumno'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['codigo'])){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if(empty($this->datos['nombre'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if(empty($this->datos['genero'])){
            $this->respuesta['msg'] = 'Por favor seleccionar el genero';
        }
        if(empty($this->datos['dui'])){
            $this->respuesta['msg'] = 'Por favor ingrese el dui';
        }
        if(empty($this->datos['fechaNacimiento'])){
            $this->respuesta['msg'] = 'Por favor seleccionar su fecha de nacimiento';
        }
		if(empty($this->datos['direccion'])){
            $this->respuesta['msg'] = 'Por favor ingrese su direccion';
        }
        if(empty($this->datos['numTelefono'])){
            $this->respuesta['msg'] = 'Por favor ingrese su numero de telefono';
        }
        return $this->administrar_alumno();
    }
    private function administrar_alumno(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                return $this->db->consultas(
                    'INSERT INTO alumnos VALUES(?,?,?,?,?,?,?,?)',
                    $this->datos['idAlumno'], $this->datos['codigo'], $this->datos['nombre'], $this->datos['genero'],$this->datos['dui'],$this->datos['fechaNacimiento'],$this->datos['direccion'],$this->datos['numTelefono']
                );
            }else if($accion=='modificar'){
                return $this->db->consultas(
                    'UPDATE alumnos SET codigo=?, nombre=? WHERE idAlumno=?',
                    $this->datos['codigo'], $this->datos['nombre'],$this->datos['genero'],$this->datos['dui'],$this->datos['fechaNacimiento'],$this->datos['direccion'],$this->datos['numTelefono'],$this->datos['idAlumno']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE alumnos FROM alumnos WHERE idAlumno=?',
                    $this->datos['idAlumno']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM alumnos');
        return $this->db->obtener_datos();
    }
}
?>