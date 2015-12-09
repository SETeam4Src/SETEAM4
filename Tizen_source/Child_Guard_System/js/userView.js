var userInfoArray;
function userView() {
	/*
	 * <!--xmlhttp = getXMLHttpObject(); alert("1.userView.JS");
	 * document.getElementById("demo").innerHTML = "Hello JavaScript!";
	 * system.out.println("1.userView.JS") if(xmlhttp == null) { alert("your
	 * browser dose not support Ajax HTTP"); return null; }
	 */

	var xmlhttp = new XMLHttpRequest();
	var url = "http://210.107.198.21:8085/Test_server2/ssss";
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			myFunction(myArr);
		}
	};

	system.out.println("2.userView.JS")

	xmlhttp.onreadystatechange = onreadyUserView;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function onreadyUserView() {
	/* getData */
	var jsonDataStr = xmlhttp.responseText;
	system.out.println("3.userView.JS")
	if (jsonDataStr == null) {
		alert("jsonDataStr not exist");
		return null;
	}
	var jsonDataObject = JSON.parse(jsonDataStr);
	var jsonUserArray = jsonDataObject.userArray;

	system.out.println("4.userView.JS")
	var userInfo;
	viewUserInfoArray = new Array();
	for ( var i in userArray) {
		userInfo = new Object();
		userInfo.USERNAME = jsonUserArray[i].USERNAME;
		userInfo.USERCODE = jsonUserArray[i].USERCODE;
		userInfo.PASSWORD = jsonUserArray[i].PASSWORD;
		userInfo.JIKNAME = jsonUserArray[i].JIKNAME;
		userInfo.PARTCODE = jsonUserArray[i].PARTCODE;
		userInfo.GLOBALCOM = jsonUserArray[i].GLOBALCOM;

		viewUserInfoArray.push(userInfo);
	}

	/* set viewInfo */
	var strHTML = getUserTableTag;

	/* execute View */
	// if(xmlhttp.readyState==4 && xmlhttp.status==200) {
	document.getElementById("userViewArea").innerHTML = strHTML;
	// }
}

function getUserTableTag() {
	var strTable = "<table cellspacing=\"1\" cellpadding=\"1\" bordercolor=\"skyblue\" border=\"1\">";
	strTable += "  <tr>";
	strTable += "<th>USERNAME</th><th>USERCODE</th><th>PASSWORD</th><th>JIKNAME</th><th>PARTCODE</th><th>GLOBALCOM</th>";
	strTable += "</tr>";

	for (var i = 0; i < userInfoArray.length; i++) {
		strTable += "  <tr>"
		strTable += "<td>" + viewUserInfoArray[i].USERNAME + "</td>";
		strTable += "<td>" + viewUserInfoArray[i].USERCODE + "</td>";
		strTable += "<td>" + viewUserInfoArray[i].PASSWORD + "</td>";
		strTable += "<td>" + viewUserInfoArray[i].JIKNAME + "</td>";
		strTable += "<td>" + viewUserInfoArray[i].PARTCODE + "</td>";
		strTable += "<td>" + viewUserInfoArray[i].GLOBALCOM + "</td>";
		strTable += "</tr>";

	}
	strTable += "</table>  ";

	return strTable;
}

function getXM3LHttpObject() {
	if (window.XMLHttpRequest) {
		return new XMLHTTPRequest();
	}
	if (windows.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	return null;
}
