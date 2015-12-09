
<?php 
// this is the message_log page

mysql_connect("localhost", "root", "asdf") or die (mysql_error());
mysql_select_db("testdb");



$sql = "SELECT create_date, message_log, use_time FROM message_inform order by create_date desc";
$result = mysql_query( $sql ) or die (mysql_error());



// 출력할 테이블 컬럼명 텍스트 입력

echo "
    <html>
    <head><title>Message Information</title></head>
	
    <body>
    <center>
    <H1>Message Information</H1>
    <table width='1100' border='1'>
    <tr>
    <td width='25%' align='center'><font size = '5'>Create Date</td>
    <td width='50%' align='center'><font size = '5'>Sensor Value</td>
	<td width='25%' align='center'><font size = '5'>Using Time</td>
    </tr>
    </body>

 </html>

";

// 쿼리의 결과값이 있는 동안 반복 출력

while($row = mysql_fetch_array($result))
    {
        echo("
        <tr>
        <td align='center'><font size = '5'>$row[create_date]</td>
        <td align='center'><font size = '5'>$row[message_log]</td>
		<td align='center'><font size = '5'>$row[use_time]</td>
        </tr>
         ");
    }
	
?>




