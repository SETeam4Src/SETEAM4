<?php
     
	 
	 
	 mysql_connect("localhost", "root", "asdf") or die (mysql_error());
	 mysql_select_db("testdb");

		
	 $aValue = "select round(sum(use_time) /60,0) as use_time from testdb.message_inform where message_log like 'TV%'";
	 $bValue = "select round(sum(use_time) /60,0) as use_time from testdb.message_inform where message_log like 'TV%'";
	 $aResult = mysql_query( $aValue ) or die (mysql_error());
	 $bResult = mysql_query( $bValue ) or die (mysql_error());
	
	
	$aRow = mysql_fetch_array($aResult);
	$bRow = mysql_fetch_array($bResult);
	
	$aCat =  $aRow[use_time];
	$bCat =  $bRow[use_time]; 
	
	 $aData = intval($aCat);
	 $bData = intval($bCat);
	 
	
	
	 //배열에 데이터값 할당 
     $data = array( "Appropriate time" => 40 , "Using time" => $bData ); 
     //이미지 유형 설정 
     header("Content-type: image/png");

     //이미지 공간형성
     $width = 400;
     $height = 800; 
     $image = imagecreate($width, $height);

     // 색깔 설정 
     $white = imagecolorallocate($image, 0xFF, 0xFF, 0xFF);
     $navy = imagecolorallocate($image, 0x00, 0x00, 0x80);
     $black = imagecolorallocate($image, 0x00, 0x00, 0x00);
     $gray = imagecolorallocate($image, 0xC0, 0xC0, 0xC0);
	 $red = imagecolorallocate($image, 0xFF, 0x00, 0x00);

     //자료의 갯수와 자료의 최대값을 구합니다.
     $maxval = max($data);
     $nval = sizeof($data);

     //여백을 설정합니다.
     $vmargin = 100; 
     $hmargin = 40; 

     //막대가 그려질 공간을 구합니다.
     $base = floor(($width - $hmargin) / $nval);

     //챠트의 가로와 세로길이를 구합니다.
     $ysize = $height - 2 * $vmargin;
     $xsize = $nval * $base - 10;

     //챠트테두리 생성
     imagerectangle($image, $hmargin, $vmargin, 
     $hmargin + $xsize, $vmargin + $ysize, $black);

     // 제목의 크기와 내용입력
	 
     $titlefont = 30;
	 $title = "Monitoring - Using time"; 

     // 제목이 들어갈 공간의 크기를 구하고 가운데 정렬시킵니다.
     $txtsz = imagefontwidth($titlefont) * strlen($title); 
     $xpos = (int)($hmargin + ($xsize - $txtsz)/2);
     $xpos = max(1, $xpos);
     $ypos = 30;
     imagestring($image, $titlefont, $xpos, $ypos, $title, $black); 
	 
	 //y축 라벨의 폰트와 눈금의 간격을 구합니다.
     $labelfont = 10;
     $ngrid = 11;
     $dydat = $maxval / $ngrid;
     $dypix = $ysize / ($ngrid + 1);

     for ($i = 0; $i <= ($ngrid + 1); $i++) {

     //라벨값과 라벨의 y축 위치를 구합니다.
     $ydat = (int)($i * $dydat);
     $ypos = $vmargin + $ysize - (int)($i*$dypix);

     //라벨의 크기를 구합니다.
     $txtsz = imagefontwidth($labelfont) * strlen($ydat);
     $txtht = imagefontheight($labelfont);

     //라벨의 x축 위치를 구합니다.
     $xpos = (int)(($hmargin - $txtsz) / 2);
     $xpos = max(1, $xpos);

     //문자열을 출력합니다.
     imagestring($image, $labelfont, $xpos, $ypos - (int)
                      ($txtht/2), $ydat, $black);

     //눈금을 그립니다.
     if (!($i == 0) && !($i > $ngrid))
     imageline($image, $hmargin - 3, $ypos, $hmargin + $xsize,
                    $ypos, $gray);
    }

     //막대간의 간격과 y축의 단위눈금 높이를 구합니다.
     $padding = 150; // half of spacing between columns
     $yscale = $ysize / (($ngrid+1) * $dydat);

     $i = 0; 
	 list($xval, $yval) = each($data);
     //막대를 그립니다.
     $ymax = $vmargin + $ysize;
     $ymin = $ymax - (int)($yval*$yscale);
     $xmax = $hmargin + ($i+1)*$base - $padding;
     $xmin = $hmargin + $i*$base + $padding;
     imagefilledrectangle($image, $xmin, $ymin, $xmax, $ymax,
                                   $navy);
	 
	
	 
     //x축 라벨을 입력합니다.
     $txtsz = imagefontwidth($labelfont) * strlen($xval);
     $xpos = ($xmin + (int)(($base - $txtsz) / 2));
     $xpos = max($xmin, $xpos)-150;
     $ypos = $ymax + 20; // distance from x axis
     imagestring($image, $labelfont, $xpos, $ypos, $xval,
                     $black);
     
	 
	 $i = 1; 
	 list($xval, $yval) = each($data);
     //막대를 그립니다.
     $ymax = $vmargin + $ysize;
     $ymin = $ymax - (int)($yval*$yscale);
     $xmax = $hmargin + ($i+1)*$base - $padding;
     $xmin = $hmargin + $i*$base + $padding;
     imagefilledrectangle($image, $xmin, $ymin, $xmax, $ymax,
                                   $red);
	 
	
	 
     //x축 라벨을 입력합니다.
     $txtsz = imagefontwidth($labelfont) * strlen($xval);
     $xpos = ($xmin + (int)(($base - $txtsz) / 2));
     $xpos = max($xmin, $xpos)-150;
     $ypos = $ymax + 20; // distance from x axis
     imagestring($image, $labelfont, $xpos, $ypos, $xval,
                     $black);
	 

     //메모리 할당/삭제 
     imagepng($image);
     imagedestroy($image);
	
	 
	 
?> 


