<?php

//validating the api request
$apikey = "somethingunique";
$headers = apache_request_headers();
$valuePlease = array_values($headers);
$key =  array_search($apikey, $valuePlease);
$token = $valuePlease[$key];
$validation = ($apikey === $token);

//change this to your details
$servername = "localhost:3306";
$username = "root";
$password = "Password1";
$dbname = "customers";
$tablename = "info";