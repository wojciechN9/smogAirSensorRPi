<?php

//just uncomment needed connection

//production

$servername = "";
$username = "";
$password = "";
$dbname = "";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // throw exceptions and show errors
}
catch(PDOException $e)
{
    exit( "Connection failed: " . $e->getMessage());
}

//dev

// $servername = "";
// $username = "";
// $password = "";
// $dbname = "";
// try {
    // $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // // set the PDO error mode to exception
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // throw exceptions and show errors
// }
// catch(PDOException $e)
// {
    // exit( "Connection failed: " . $e->getMessage());
// }