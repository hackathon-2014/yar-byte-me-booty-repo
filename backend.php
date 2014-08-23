<?php
// DEBUG SQLITE

// $dbname='base';
// if(!class_exists('SQLite3'))
  // die("SQLite 3 NOT supported.");

// $base=new SQLite3($dbname, 0666);
// echo "SQLite 3 supported."; 


//-----------------------------------------------
// POST DATA
//-----------------------------------------------
# Parse payload
$payload = file_get_contents('php://input');
if ($payload) {
	$payloadDecoded = json_decode($payload, true);
	if (!$payloadDecoded) {
		exit("Failed to decode payload");
	}
}
else {
	exit("No payload");
}

//-----------------------------------------------
// DB
//-----------------------------------------------

// unlink('sqlite.db');
$db = new SQLite3('../yar-db/sqlite.db');

$response = [];

//-----------------------------------------------
// METHODS
//-----------------------------------------------

if (isset($payloadDecoded['getuser'])) {

  $userId = $payloadDecoded['getuser'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE id=:id');
  $stmt->bindValue(':id', $userId, SQLITE3_INTEGER);
  $r = $stmt->execute();
  
  $response['getUser'] = $r->fetchArray();
}

//-----------------------------------------------
// RESPONSE AND EXIT
//-----------------------------------------------
echo json_encode($response);


// stmt = $db->prepare('SELECT * FROM users WHERE id=:id');
// $stmt->bindValue(':id', 1, SQLITE3_INTEGER);

// $result = $stmt->execute();
// var_dump($result->fetchArray());

// $q = 


?>