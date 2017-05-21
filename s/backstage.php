<?php

	require_once("main.php");
	header("Content-Type:text/html; charset=utf-8");
	
	global $GLOBAL;

	$active = "";
	if(isset($_POST['active']))
	{
		$active = $_POST['active'];
	}

	$dbMgr = new DBManager;
	$dbMgr->init();
	switch($active)
	{
		//Events
		case "booking":
		{

			$msg = "";
			$msg .= requestCheck('country', $country);
			$msg .= requestCheck('machineNo', $machineNo);

			if($msg != "")
			{
				echo json_encode(array('active' => $active, 'result' => 0, "msg" => $msg));
				break;
			}
			

			$data = $dbMgr->bookingAward($country, $machineNo, getNowTime());
			print_r($data);
			$isGotAward = intval($data['result']);
			$awardID = intval($data['awardID']);
			
			echo json_encode(array('active' => $active, 'result' => 1, "msg" => "", "isGotAward" => $isGotAward, "awardID" => $awardID));
				
			break;
		}
		case "cancel":
		{
			$awardID = "";
			$msg = "";
			$msg .= requestCheck('awardID', $awardID);

			if($msg != "")
			{
				echo json_encode(array('active' => $active, 'result' => 0, "msg" => $msg));
				break;
			}

			$dbMgr->cancelAward($awardID);
			echo json_encode(array('active' => $active, 'result' => 1, "msg" => ""));
			break;
		}
		case "setAward":
		{
			$awardID = "";
			$userID = "";
			$msg = "";
			$msg .= requestCheck('awardID', $awardID);
			$msg .= requestCheck('userID', $userID);

			if($msg != "")
			{
				echo json_encode(array('active' => $active, 'result' => 0, "msg" => $msg));
				break;
			}

			$result = intval($dbMgr->setAward($awardID, $userID));
			if($result == 0)
			{
				echo json_encode(array('active' => $active, 'result' => $result, "msg" => "DB error"));
			}
			else
			{
				echo json_encode(array('active' => $active, 'result' => $result, "msg" => ""));	
			}			
			break;
		}
		case "getPrize":
		{
			$prize = intval($dbMgr->getPrize(getNowTime()));
			echo json_encode(array('active' => $active, 'result' => 1, "msg" => "", "prize" => $prize));
			break;
		}

		//Web
		case "getCountryNum":
		{	
			$country = $dbMgr->getCountryNum();
			echo json_encode(array('active' => $active, 'result' => 1, "countryNum" => $country));
			break;
		}

		//User Data(Web + Event)
		case "addUserData":
		{
			$userData = "";
			$msg = "";
			$msg .= requestCheck('userData', $userData);

			if($msg != "")
			{
				echo json_encode(array('active' => $active, 'result' => 0, "msg" => $msg));
				break;
			}

			$userData = json_decode($userData, true);

			$userID = $dbMgr->addUserData($userData);

			echo json_encode(array('active' => $active, 'result' => 1, 'userID' => $userID));

			break;
		}

	}


	//-------------------------------------------------------------------
	function getNowTime()
	{
		date_default_timezone_set("Asia/Taipei");

		return date("Y-m-d H:i:s");
	}

	//-------------------------------------------------------------------
	function requestCheck($tag, &$var)
	{
		if(!isset($_POST[$tag]) || $_POST[$tag] == "")
		{
			return $tag." is empty.";
		}
		else
		{
			$var = $_POST[$tag];
			return "";
		}

	}
?>