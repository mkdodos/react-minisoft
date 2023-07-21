<?php
header("Access-Control-Allow-Origin:*");

$connectionString = "odbc:salary";
$db = new PDO($connectionString);

$obj = json_decode(file_get_contents('php://input'));
// echo $obj->others;
// print_r($obj);
// return $obj;
$id = $obj->id;
$basic = $obj->basic;
$bigM = $obj->bigM;
$job = $obj->job;
$tech = $obj->tech;
$food = $obj->food;
$full = $obj->full;
$error = $obj->error;
$others = $obj->other_bonus;
$effect = $obj->effect;
$minus = $obj->minus;
$offHours = $obj->offHours;
$mins = $obj->mins;

$sql = " UPDATE 薪資紀錄表 SET 
  本薪='$basic',
  大小月='$bigM',
  職務加給='$job',
  技術加給='$tech',
  伙食津貼='$food',
  全勤='$full',
  績效='$effect',
  無過失獎金='$error',
  績效獎金='$others',
  其他扣款='$minus',
  請假時數='$offHours',
  加班時數='$mins',
  特休轉薪資='$obj->spHours'       
  WHERE ID=$id";



$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");

try {
  $statement = $db->prepare($sql);
  $statement->execute();
} catch (PDOException $err) {
  print_r($err->getMessage());
}
