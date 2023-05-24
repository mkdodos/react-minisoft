<?php
header("Access-Control-Allow-Origin:*");
// 載入db.php來連結資料庫
require_once 'db.php';

// 設置一個空陣列來放資料
$datas = array();
// sql語法存在變數中
// $sql = "SELECT `user_sn`, `user_name` FROM `user_data`";
$sql = "SELECT `id`,`note_date`, `title` FROM `notebook`";

// 用mysqli_query方法執行(sql語法)將結果存在變數中
$result = mysqli_query($link,$sql);

// 如果有資料
if ($result) {
  // mysqli_num_rows方法可以回傳我們結果總共有幾筆資料
  if (mysqli_num_rows($result)>0) {
      // 取得大於0代表有資料
      // while迴圈會根據資料數量，決定跑的次數
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
  // 如果結果不為空，就利用print_r方法印出資料
  // print_r($datas);


  $json = json_encode($datas);
  $json = urldecode($json);
  echo $json;

}
else {
  // 為空表示沒資料
  echo "查無資料";
}
?>