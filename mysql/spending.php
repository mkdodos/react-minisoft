<?php
header("Access-Control-Allow-Origin:*");
// 載入db.php來連結資料庫
require_once 'db.php';

// 設置一個空陣列來放資料
$datas = array();
// sql語法存在變數中

$sql = "SELECT `id`,spend_date,`note`,`income`,`expense`,`cate`,`account` 
FROM `spending` where substring(spend_date,1,4)=2021";


// 用mysqli_query方法執行(sql語法)將結果存在變數中
$result = mysqli_query($link,$sql);

// 如果有資料
if ($result) {
  // mysqli_num_rows方法回傳結果共有幾筆資料
  if (mysqli_num_rows($result)>0) {     
      // mysqli_fetch_assoc方法可取得一筆值
      while ($row = mysqli_fetch_assoc($result)) {
          // 每跑一次迴圈就抓一筆值，最後放進data陣列中
          $datas[] = $row;
      }
  }
  // 釋放資料庫查到的記憶體
  mysqli_free_result($result);
}
else {
  echo "{$sql} 語法執行失敗，錯誤訊息: " . mysqli_error($link);
}
// 處理完後印出資料
if(!empty($result)){

  $json = json_encode($datas);
  $json = urldecode($json);
  echo $json;

}
else {
  // 為空表示沒資料
  echo "查無資料";
}
?>