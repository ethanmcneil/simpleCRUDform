<?php

include 'connection.php';

if ($validation) {

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die('Could not connect: ' . mysqli_error($conn));
}

$json = file_get_contents('php://input');
$j = json_decode($json, true);
$id = $j['id'];

$query = mysqli_query($conn, "DELETE FROM $tablename WHERE id=$id")
   or die (mysqli_error($conn));
    http_response_code(200);
}
else {
    echo "connection failed";
}
?>