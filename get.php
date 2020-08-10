<?php

include 'connection.php';

if ($validation) {

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die('Could not connect: ' . mysqli_error($conn));
}

$query = mysqli_query($conn, "SELECT * FROM $tablename")
   or die (mysqli_error($conn));

$return = [];

foreach ($query as $row) {
    $return[] = [ 
    'id' => $row['id'],
		'date' => $row['date'],
		'name' => $row['name'],
		'address' => $row['address'],
		'city' => $row['city'],
		'state' => $row['state'],
		'zip' => $row['zip'],
		'phone' => $row['phone'],
		'email' => $row['email']
    ];
}
    http_response_code(200);
    echo json_encode($return, JSON_NUMERIC_CHECK);
}
else {
   echo "failed";
}

?>
