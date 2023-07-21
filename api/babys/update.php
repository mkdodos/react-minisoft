<?php
header("Access-Control-Allow-Origin:*");

$connectionString = "odbc:salary";
$db = new PDO($connectionString);

$obj = json_decode(file_get_contents('php://input'));


$sql = " UPDATE Babys SET 
  name='$obj->name',
  birth='$obj->birth',
  expireDate='$obj->expireDate'    
  WHERE ID=$obj->id";

echo $sql;

$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");

try {
  $statement = $db->prepare($sql);
  $statement->execute();
} catch (PDOException $err) {
  print_r($err->getMessage());
}
