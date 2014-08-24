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
$db = new SQLite3('sqlite.db');

$response = array();

//-----------------------------------------------
// METHODS
//-----------------------------------------------

if (isset($payloadDecoded['GetUser'])) {

  $userId = $payloadDecoded['GetUser'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE id=:id');
  $stmt->bindValue(':id', $userId, SQLITE3_INTEGER);
  $r = $stmt->execute();
  
  $response['GetUser'] = $r->fetchArray(SQLITE3_ASSOC);
}

if (isset($payloadDecoded['CheckEmail'])) {

  $email = $payloadDecoded['CheckEmail'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE email=:email');
  $stmt->bindValue(':email', $email, SQLITE3_TEXT);
  $r = $stmt->execute();
  $array = $r->fetchArray(SQLITE3_ASSOC);
  
  $response['CheckEmail'] = $array === FALSE ? false : true;
}

if (isset($payloadDecoded['AuthUser'])) {

  $authUser = $payloadDecoded['AuthUser'];
  
  $stmt = $db->prepare('SELECT * FROM users WHERE email=:email AND pass=:pass');
  $stmt->bindValue(':email', $authUser['email'], SQLITE3_TEXT);
  $stmt->bindValue(':pass', $authUser['pass'], SQLITE3_TEXT);
  $r = $stmt->execute();
  
  $response['AuthUser'] = $r->fetchArray(SQLITE3_ASSOC);
}

if (isset($payloadDecoded['AddUser'])) {

  $newUser = $payloadDecoded['AddUser'];
  
  $newUser['first'] = 'John';
  $newUser['last'] = 'Doe';
  $newUser['street'] = '123 Drive Ln';
  $newUser['city'] = 'Charleston';
  $newUser['state'] = 'SC';
  $newUser['zip'] = '29407';
  
  $stmt = $db->prepare('INSERT INTO users (email, pass, first, last, street, city, state, zip) VALUES (:email, :pass, :first, :last, :street, :city, :state, :zip)');
  $stmt->bindValue(':email', $newUser['email'], SQLITE3_TEXT);
  $stmt->bindValue(':pass', $newUser['pass'], SQLITE3_TEXT);
  $stmt->bindValue(':first', $newUser['first'], SQLITE3_TEXT);
  $stmt->bindValue(':last', $newUser['last'], SQLITE3_TEXT);
  $stmt->bindValue(':street', $newUser['street'], SQLITE3_TEXT);
  $stmt->bindValue(':city', $newUser['city'], SQLITE3_TEXT);
  $stmt->bindValue(':state', $newUser['state'], SQLITE3_TEXT);
  $stmt->bindValue(':zip', $newUser['zip'], SQLITE3_TEXT);
  $r = $stmt->execute();

  if ($r !== FALSE) {
    $stmt->close();
    $userId = $db->lastInsertRowID();
    $stmt = $db->prepare('SELECT * FROM users WHERE id=:id');
    $stmt->bindValue(':id', $userId, SQLITE3_INTEGER);
    $rr = $stmt->execute();
    
    $response['AddUser'] = $rr->fetchArray(SQLITE3_ASSOC);
  }
  else {
    $response['AddUser'] = false;
  }
}

if (isset($payloadDecoded['GetUserMovies'])) {

  $userId = $payloadDecoded['GetUserMovies'];
  
  $stmt = $db->prepare('SELECT * FROM movies WHERE user_id =:userId');
  $stmt->bindValue(':userId', $userId['userId'], SQLITE3_INTEGER);
  $r = $stmt->execute();
  
  $movies = array();
  
  while ($row = $r->fetchArray(SQLITE3_ASSOC)) {
   $row['info'] = json_decode($row['info'], true);
   $row['user'] = GetUser($row['user_id']);
   $movies[] = $row;
  }
  
  $response['GetUserMovies'] = count($movies) > 0 ? $movies : false;
}

if (isset($payloadDecoded['AddMovie'])) {

  $addMovie = $payloadDecoded['AddMovie'];
  
  $stmt = $db->prepare('INSERT INTO movies (info, medium, condition, user_id) VALUES (:info, :medium, :condition, :userId)');
  $stmt->bindValue(':info', $addMovie['info'], SQLITE3_TEXT);
  $stmt->bindValue(':medium', $addMovie['medium'], SQLITE3_TEXT);
  $stmt->bindValue(':condition', $addMovie['condition'], SQLITE3_TEXT);
  $stmt->bindValue(':userId', $addMovie['userId'], SQLITE3_INTEGER);
  $r = $stmt->execute();
  
  $response['AddMovie'] = $r === FALSE ? false : $db->lastInsertRowID();
}

if (isset($payloadDecoded['Search'])) {

  $searchString = $payloadDecoded['Search'];
  $searchString = '%' . $searchString  . '%';
  
  $stmt = $db->prepare('SELECT * FROM movies WHERE info LIKE :searchString');
  $stmt->bindValue(':searchString', $searchString, SQLITE3_TEXT);
  $r = $stmt->execute();
  
  $movies = array();
  
  while ($row = $r->fetchArray(SQLITE3_ASSOC)) {
   $row['info'] = json_decode($row['info'], true);
   $row['user'] = GetUser($row['user_id']);
   $movies[] = $row;
  }
  
  $response['Search'] = count($movies) > 0 ? $movies : false;
}

function GetUser($id) {
  global $db;
  
  $stmt = $db->prepare('SELECT * FROM users WHERE id=:id');
  $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
  $r = $stmt->execute();

  return $r->fetchArray(SQLITE3_ASSOC);
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