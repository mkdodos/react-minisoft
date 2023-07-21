<?php

header("Access-Control-Allow-Origin:*");

// 直接使用 $_POST['name'] 讀不到
// 參考以下
//https://stackoverflow.com/questions/41457181/axios-posting-params-not-read-by-post

$_POST = json_decode(file_get_contents("php://input"), true);

$db = new PDO("odbc:salary");

$id = $_POST['id'];

$sql = "delete from Babys where id=".$id;
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
// echo $sql;

try {
    $rs = $db->query($sql);
    // Returns the number of rows affected by the last SQL statement
    echo $rs->rowCount();
} catch (PDOException $err) {
    print_r($err->getMessage());
}

?>