<?php
header("Access-Control-Allow-Origin:*");
// header("Content-Type:text/html; charset=big5");
$db = new PDO("odbc:salary");

$obj = json_decode(file_get_contents('php://input'));

$sql =  "insert into Babys
          (name,birth,expireDate) values
          ('$obj->empName','$obj->birth','$obj->expireDate') ";

// return $sql;
          
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);

$sql = "SELECT top 1 id from Babys order by id desc";
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);
$lastId = $rs->fetch()[0];

echo $lastId;
;

?>