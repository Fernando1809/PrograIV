<?php
class DB{
    private $conexion, $preparado, $result;

    public function __construct($server, $user, $pass){
        $this->conexion = new PDO($server, $user, $pass,
            array(PDO::ATTR_EMULATE_PREPARES=>false,
            PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION)) or die('Nose pudo conectar a la BD');
    }
    public function consultas($sql){
        try{
            $parametros = func_get_args();//obtener todos los parametros de la consulta
            array_shift($parametros);//quitamos el primer parametro que es la consulta

            $this->preparado = $this->conexion->prepare($sql);
            $this->result = $this->preparado->execute($parametros);
            return $this->result;
        }catch(Exception $e){
            return 'Error: '. $e->getMessage();
        }
    }
    public function obtener_datos(){
        return $this->preparado->fetchAll(PDO::FETCH_ASSOC);
    }
    public function obtener($sql){
        try{
            return $this->conexion->query($sql);
        }catch(Exception $e){
            return 'Error: '.$e->getMessage();
        }
    }
}
?>