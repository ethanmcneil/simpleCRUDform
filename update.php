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
$date = '"' . $j['date'] . '"'; 
$name = '"' . $j['name'] . '"';
$address = '"' . $j['address'] . '"';
$city = '"' . $j['city'] . '"';
$state = '"' . $j['state'] . '"';
$zip = '"' . $j['zip'] . '"';
$email = '"' . $j['email'] . '"';
$phone = '"' . $j['phone'] . '"';

$query = mysqli_query($conn, "UPDATE $tablename SET date=$date, name=$name, address=$address, city=$city, state=$state, zip=$zip, phone=$phone, email=$email  WHERE id=$id")
   or die (mysqli_error($conn));
    http_response_code(200);
}
else {
    echo "connection failed";
}


?>