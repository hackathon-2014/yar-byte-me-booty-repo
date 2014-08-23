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

if (isset($payloadDecoded['GetUser'])) {

  $userId = $payloadDecoded['GetUser'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE id=:id');
  $stmt->bindValue(':id', $userId, SQLITE3_INTEGER);
  $r = $stmt->execute();
  
  $response['GetUser'] = $r->fetchArray();
}

if (isset($payloadDecoded['CheckEmail'])) {

  $email = $payloadDecoded['CheckEmail'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE email=:email');
  $stmt->bindValue(':email', $email, SQLITE3_TEXT);
  $r = $stmt->execute();
  $array = $r->fetchArray();
  
  $response['CheckEmail'] = $array === FALSE ? false : true;
}

if (isset($payloadDecoded['AuthUser'])) {

  $authUser = $payloadDecoded['AuthUser'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE email=:email AND pass=:pass');
  $stmt->bindValue(':email', $authUser['email'], SQLITE3_TEXT);
  $stmt->bindValue(':pass', $authUser['pass'], SQLITE3_TEXT);
  $r = $stmt->execute();
  
  $response['AuthUser'] = $r->fetchArray();
}

if (isset($payloadDecoded['AddUser'])) {

  $newUser = $payloadDecoded['AddUser'];
  
  $stmt = $db->prepare('INSERT INTO users (email, pass) VALUES (:email, :pass)');
  $stmt->bindValue(':email', $newUser['email'], SQLITE3_TEXT);
  $stmt->bindValue(':pass', $newUser['pass'], SQLITE3_TEXT);
  $r = $stmt->execute();
  
  $response['AddUser'] = $r === FALSE ? false : $db->lastInsertRowID();
}

if (isset($payloadDecoded['GetUserMovies'])) {

  $userId = $payloadDecoded['GetUserMovies'];
  
  $stmt = $db->prepare('SEELCT * FROM movies WHERE user_id =:userId');
  $stmt->bindValue(':userId', $userId['userId'], SQLITE3_INTEGER);
  $r = $stmt->execute();
  
  $movies = array();
  
  while ($row = $r->fetchArray(SQLITE3_ASSOC)) {
    $movies[] = $row;
  }
  
  $response['GetUserMovies'] = count($movies) > 0 ? $movies : false;
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