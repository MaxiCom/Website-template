<?php

const DATABASE_TYPE = 'mysql';
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = '3306';
const DATABASE_NAME = 'TOCHANGE';
const DATABASE_USERNAME = 'root';
const DATABASE_PASSWORD = 'yoloswag';

class Database {
	public function __construct($type, $host, $port, $name, $username, $password) {
		$this->_type = $type;
		$this->_host = $host;
		$this->_port = $port;
		$this->_name = $name;
		$this->_username = $username;
		$this->_password = $password;
	}

	public function openConnection() {
		try {
			$this->_databaseHandle = new PDO($this->_type . ':host=' . $this->_host . ';port=' . $this->_port .
				';dbname=' . $this->_name, $this->_username, $this->_password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
			$this->_databaseHandle->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $error) {
			echo $error->getMessage() . PHP_EOL;

			die();
		}
	}

	public function getDatabaseHandle() {
		return $this->_databaseHandle;
	}

	public function query($statement, $values, $fetch = true) {
		$PDOStatement = $this->_databaseHandle->prepare($statement);
		$PDOStatement->execute($values);

		if ($fetch)
			return $PDOStatement->fetchAll(PDO::FETCH_ASSOC);
	}

	public function closeConnection() {
		$this->_databaseHandle = null;
	}
};

$database = new Database(DATABASE_TYPE, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$database->openConnection();
$database_handle = $database->getDatabaseHandle();