<?php

	require_once('_config.php');
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	class DBManager{
		private $_db = null;
		
		public function init()
		{
			global $GLOBAL;
			if($this->_db == null)
			{
				$this->_db = new PDO("mysql:host={$GLOBAL['HOST']};dbname={$GLOBAL['dbname']};charset=utf8;", $GLOBAL['user'], $GLOBAL['password']);	
			}
		}

		//------------------------------------
		//Get
		//------------------------------------
		public function getCountryNum()
		{
			if($this->_db == null)
			{
				$this->init();
			}

			$proc_ = $this->_db->prepare("CALL getCountryNum()");
			$proc_->execute();
			$proc_->setFetchMode(PDO::FETCH_ASSOC);
			$row_ = $proc_->fetchAll();

			$proc_->closeCursor();

			return $row_;
		}

		//-----------------------------------
		public function getPrize($nowTime)
		{
			if($this->_db == null)
			{
				$this->init();
			}

			$proc_ = $this->_db->prepare("CALL getPrize(?)");
			$proc_->bindParam(1, $nowTime);
			$proc_->execute();
			$proc_->setFetchMode(PDO::FETCH_ASSOC);
			$row_ = $proc_->fetchAll();

			$proc_->closeCursor();

			return $row_[0]['result'];
		}

		//-----------------------------------
		//Award
		//-----------------------------------
		public function bookingAward($country, $machineNo, $nowTime)
		{
			if($this->_db == null)
			{
				$this->init();
			}

			$proc_ = $this->_db->prepare("CALL bookingAward(?, ?, ?)");
			$proc_->bindParam(1, $country);
			$proc_->bindParam(2, $machineNo);
			$proc_->bindParam(3, $nowTime);
			$proc_->execute();
			$proc_->setFetchMode(PDO::FETCH_ASSOC);
			$row_ = $proc_->fetchAll();

			$proc_->closeCursor();
			return $row_[0];
		}

		//-----------------------------------
		public function cancelAward($awardId)
		{
			if($this->_db == null)
			{
				$this->init();
			}

			$proc_ = $this->_db->prepare("CALL cancelAward(?)");
			$proc_->bindParam(1, $awardId);
			$proc_->execute();
			$proc_->setFetchMode(PDO::FETCH_ASSOC);
			$row_ = $proc_->fetchAll();

			$proc_->closeCursor();
		}

		//-----------------------------------
		public function setAward($awardId, $userID)
		{
			if($this->_db == null)
			{
				$this->init();
			}

			$proc_ = $this->_db->prepare("CALL setAward(?, ?)");
			$proc_->bindParam(1, $awardId);
			$proc_->bindParam(2, $userID);
			$proc_->execute();
			$proc_->setFetchMode(PDO::FETCH_ASSOC);
			$row_ = $proc_->fetchAll();

			$proc_->closeCursor();

			return $row_[0]['result'];
		}

		//-----------------------------------
		//Add
		//-----------------------------------
		public function addUserData($userData)
		{
			if($this->_db == null)
			{
				$this->init();
			}
			
			$proc_ = $this->_db->prepare("CALL addUserdata(?, ?, ?, ?, ?)");
			$proc_->bindParam(1, $userData['fbid']);
			$proc_->bindParam(2, $userData['from']);
			$proc_->bindParam(3, $userData['country']);
			$proc_->bindParam(4, $userData['name']);
			$proc_->bindParam(5, $userData['phone']);

			$proc_->execute();
			$proc_->setFetchMode(PDO::FETCH_ASSOC);
			$row_ = $proc_->fetchAll();

			$proc_->closeCursor();

			return $row_[0]["user_id"];
		}
	}
?>