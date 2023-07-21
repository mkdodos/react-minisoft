<?php

require_once "../overtime/functions.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type:text/html; charset=big5");


function calOffHoursAmt($basic,$hours) {
  return round($basic / 30 * $hours / 8);
}


// $y = 2022;
// $m = 6;

// 依前端傳來參數組合查詢條件
$y = isset($_GET["y"]) ? $_GET["y"] : "";
$m = isset($_GET["m"]) ? $_GET["m"] : "";
$name = isset($_GET["name"]) ? urlencode($_GET["name"]) : "";
$name = urldecode($name);

$where = "";
if ($y)
  $where = " 年 = $y ";

if ($m) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= "月 = $m ";
}

if ($name) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= "姓名 ='$name' ";
}

if ($where != "")
  $where = " where " . $where;

$db = new \PDO('odbc:salary');
$query = " SELECT TOP 100
  ID,
  姓名 as name,  
  年 as y,
  月 as m,
  本薪 as basic,
  加班時數 as mins,
  職務加給 as job,
  技術加給 as tech,
  伙食津貼 as food,
  全勤 as full,
  無過失獎金 as error,
  績效 as effect,
  大小月 as bigM,
  績效獎金 as others,
  其他扣款 as minus,
  請假時數 as offHours,
  特休轉薪資 as spHours
  FROM 薪資紀錄表 ";

if ($where) {
  $query .= $where;
}

$query = mb_convert_encoding($query, "BIG5", "UTF-8");
$rs = $db->query($query);
$arr = $rs->fetchAll(\PDO::FETCH_ASSOC);

$row= [];
$rows = [];


// $keys = ['id', 'name', 'y', 'm', 'basic', 'job',
//  'tech','food','full','error','effect' ,'overtime','overtimeAmt','bigM', 'total'];

for ($i = 0; $i < count($arr); $i++) {
  $row['id'] = $arr[$i]['ID'];
  $row['name'] = urlencode($arr[$i]['name']);
  $row['y'] = $arr[$i]['y'];
  $row['m'] = $arr[$i]['m'];
  $row['basic'] = $arr[$i]['basic'];
   
  $row['job'] = $arr[$i]['job']; 
  $row['tech'] = $arr[$i]['tech'];
  $row['food'] = $arr[$i]['food'];  
  $row['full'] = $arr[$i]['full'];
  $row['error'] = $arr[$i]['error'];
  $row['effect'] = $arr[$i]['effect'];  
  $row['bigM'] = $arr[$i]['bigM'];
  $row['others'] = $arr[$i]['others'];   
  $row['minus'] = $arr[$i]['minus'];
  // 請假
  $row['offHours'] = $arr[$i]['offHours'];
  $row['offHoursAmt'] = calOffHoursAmt( $row['basic'],$row['offHours']); 
  // 加班
  $row['mins'] = $arr[$i]['mins'];
  $row['ovAmt'] = calOvertime(
    $arr[$i]['mins'],
    $arr[$i]['basic'],
    $arr[$i]['name'],
    $arr[$i]['y'],
    $arr[$i]['m']
  ); 

  // 特休

  $row['spHours'] = $arr[$i]['spHours']; 
  
  // 合計
  $row['total'] = $row['basic']+$row['job']+$row['tech']+$row['food']+$row['full']
    +$row['error']+$row['effect']+$row['bigM']+$row['others']+$row['ovAmt']
    -$row['minus']-$row['offHoursAmt']
    ;
  $rows[$i]=$row;  
}

$json = json_encode($rows);
$json = urldecode($json);
echo $json
?>