<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:text/html; charset=big5");

$db = new PDO("odbc:salary");

// get 前端傳來參數
$y = isset($_GET["y"]) ? $_GET["y"] : "";
$m = isset($_GET["m"]) ? $_GET["m"] : "";


// 中文欄位名稱用 as 換成英文名稱,在後面跑迴圈才可直接當成 key
$query = " SELECT * from Babys ";


$query = mb_convert_encoding($query, "BIG5", "UTF-8");



$sth = $db->prepare($query);
$sth->execute();

$arr = $sth->fetchAll(\PDO::FETCH_ASSOC);

$json = "";
$rows=[];

for ($i = 0; $i < count($arr); $i++) {
  $j = 0;
  foreach ($arr[$i] as $key => $value) {
    $value = trim(preg_replace('/\s\s+/', ' ', $value));   
    $value = str_replace('"', '\"', $value);   
    
    // 去掉多餘的時分秒(00:00:00)
    if($key=="expireDate" || $key=="birth")
    $value = substr($value,0,10);
    
    $newarr[$key] =urlencode(trim($value));
    $j++;
  }
 
  $rows[$i] = $newarr;
}

// array to json
$json = json_encode($rows,JSON_UNESCAPED_SLASHES);
// echo $json;
// 再用urldecode把資料轉回成中文格式
$json = urldecode($json);

echo $json
?>
