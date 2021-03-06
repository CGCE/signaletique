<?php
// Update : 2015-01-29

include "config.php";

class db
	{
	var $host;
	var $dbname;
	var $user;
	var $password;
	var $conn;
	var $result;
	var $nb;
	var $error=false;

	function db()
		{
		$this->host=$GLOBALS['config']['dbhost'];
		$this->dbname=$GLOBALS['config']['dbname'];
		$this->user=$GLOBALS['config']['dbuser'];
		$this->password=$GLOBALS['config']['dbpassword'];
		}
			
	function connect()
		{
		$this->conn=mysql_connect($this->host,$this->user,$this->password);
		mysql_select_db($this->dbname,$this->conn);
		}
	
	function query($requete)
		{
		$this->connect();
		$req=mysql_query($requete,$this->conn);
		
		if(!$req)
			{
			echo "<br/><br/>### ERREUR SQL ###<br><br>$requete<br/><br/>";
			echo mysql_error();
			echo "<br/><br/>";
			$this->error=true;
			}
		elseif(strtolower(substr(trim($requete),0,6))=="select")
			{
			$this->nb=mysql_num_rows($req);
			for($i=0;$i<$this->nb;$i++)
				$this->result[]=mysql_fetch_array($req);
			}
		$this->disconnect();
		}

	function disconnect()
		{
		mysql_close($this->conn);
		}

	function insert2($table,$values){
		$fields=join(",",array_keys($values));
		$values=join("','",$values);

		$requete="INSERT INTO `{$GLOBALS['config']['dbprefix']}$table` ($fields) VALUES ('$values');";
		$this->query($requete);
	}

	function select($table,$where=1,$items="*"){
		$requete="SELECT $items FROM `{$GLOBALS['config']['dbprefix']}$table` WHERE $where;";
		$this->query($requete);
	}

	function update($table,$set,$where)
		{
		$requete="UPDATE `{$GLOBALS['config']['dbprefix']}$table` SET $set WHERE $where";
		$this->query($requete);
		}

	function update2($table,$fields,$ids){
		$tab=array();
		$keys=array_keys($fields);
		foreach($keys as $elem){
			  $tab[]="$elem='{$fields[$elem]}'";
  		}
		$set=join(",",$tab);

		$tab=array();
		$keys=array_keys($ids);
		foreach($keys as $elem){
			  $tab[]="$elem='{$ids[$elem]}'";
 		}
		$where=join(",",$tab);

		$this->update($table,$set,$where);
	}
	}


class dbh{
  var $dbhost;
  var $dbname;
  var $dbuser;
  var $dbpass;
  var $pdo;
  var $stmt;
  var $result;


  function dbh(){
	    $this->dbhost=$GLOBALS['config']['dbhost'];
	    $this->dbname=$GLOBALS['config']['dbname'];
	    $this->dbuser=$GLOBALS['config']['dbuser'];
	    $this->dbpass=$GLOBALS['config']['dbpassword'];

	    $this->pdo=new PDO("mysql:host={$this->dbhost};dbname={$this->dbname}",$this->dbuser,$this->dbpass);
	    }

  function exec($sql){
	    $this->pdo->exec($sql);
	    }

  function prepare($sql){
	    $this->stmt=$this->pdo->prepare($sql);
	    }

  function execute($data){
	    $this->stmt->execute($data);
	    $this->result=$this->stmt->fetch();
	    }

}


?>
