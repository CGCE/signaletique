<?php
require_once "../vendor/ics-parser-read-only/class.iCalReader.php";

class MyIcal{
	public $attach=0;				// 0 = both; 1= with attach only; 2= without attach only
	public $src=null;
	public $events=array();
	public $dateLF="l, F jS, Y";	// Saturday, May 24th, 2008
	public $dateSF="m/d/y";			// 05/24/08
	public $start=null;
	public $end=null;
	public $maxEntries=10;

	public function MyIcal(){
		$this->start=time();
	}

	public function getInfo(){
		$ical = new ical($this->src);

		$tab=array();
		foreach($ical->events() as $elem){
			$start=strtotime($elem["DTSTART"]);
			$end=strtotime($elem["DTEND"]);

			$created=strtotime($elem["CREATED"]);
			$modified=strtotime($elem["LAST-MODIFIED"]);
			$summary=$elem["SUMMARY"];
			$description=$elem["DESCRIPTION"];
			$location=$elem["LOCATION"];
			$status=$elem["STATUS"];
			$attach=array_key_exists("ATTACH",$elem)?urldecode($elem["ATTACH"]):null;

			$startLF=date($this->dateLF,$start);
			$endLF=date($this->dateLF,$end);
			$startSF=date($this->dateSF,$start);
			$endSF=date($this->dateSF,$end);
			// AJOUTER LES HEURES

			$tab[]=array("start"=>$start,"end"=>$end,"created"=>$created,"modified"=>$modified,"summary"=>$summary,"description"=>$description,"location"=>$location,"status"=>$status,"attach"=>$attach,"startLF"=>$startLF,"endLF"=>$endLF,"startSF"=>$startSF,"endSF"=>$endSF);
		}

		usort($tab,"cmp_start_end");

		$nb=0;
		foreach($tab as $elem){
			if($this->start and $elem["end"]<$this->start){
				continue;
			}

			if($this->end and $elem["start"]>$this->end){
				continue;
			}
			
			if($this->attach==1 and !$elem["attach"]){
				continue;
			}
			
			if($this->attach==2 and $elem["attach"]){
				continue;
			}

			if($this->maxEntries and $nb>=$this->maxEntries){
				continue;
			}



			$this->events[]=(object) $elem;
			$nb++;
		}
	}

}

function cmp_start_end($a, $b){
	if($a["start"]==$b["start"]){
		return $a["end"]>$b["end"];
	}
	return $a["start"]>$b["start"];
}
?>
