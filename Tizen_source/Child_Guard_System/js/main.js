var xmlhttp = new XMLHttpRequest();
var userInfoArray;
function userView() {
/*
	xmlhttp = new XMLHttpRequest();// getXMLHttpObject();
	alert("1.userView.JS");
	document.getElementById("demo").innerHTML = "?????Hello JavaScript!";
	system.out.println("1.userView.JS")
	if (xmlhttp == null) {
		alert("your browser dos" + "" + "e not support Ajax HTTP");
		return null;
	}*/
	var xmlhttp = new XMLHttpRequest();
	var url = "http://210.107.198.21:8085/Test_Server2/ssss";

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = JSON.parse(xmlhttp.responseText);
	        onreadyUserView(myArr);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	// system.out.println("2.userView.JS")
	
	xmlhttp.onreadystatechange = onreadyUserView;

	function myFunction(arr) {
	    var out = "";
	    var i;
	    for(i = 0; i < arr.length; i++) {
	        out += '<a href="' + arr[i].url + '">' + 
	        arr[i].display + '</a><br>';
	    }
	    document.getElementById("demo").innerHTML = out;
	}
	

}

function onreadyUserView() {
	document.getElementById("demo").innerHTML = "c.Hello JavaScript!";
	/* getData */
	var jsonDataStr = xmlhttp.responseText;
	// system.out.println("3.userView.JS")
	document.getElementById("demo").innerHTML = "d.Hello JavaScript!";
	if (jsonDataStr == null) {
		alert("jsonDataStr not exist");
		return null;
	}

	document.getElementById("demo").innerHTML = "e.ello JavaScript!";
	var jsonDataObject = JSON.parse(jsonDataStr);
	document.getElementById("demo").innerHTML = "333ello JavaScript!";
	var jsonUserArray = jsonDataObject.userArray;

	document.getElementById("demo").innerHTML = "4ello JavaScript!";

	// system.out.println("4.userView.JS")
	document.getElementById("demo").innerHTML = "5Hello JavaScript!";
	var userInfo;
	viewUserInfoArray = new Array();
	for ( var i in userArray) {
		document.getElementById("demo").innerHTML = "6Hello JavaScript!";
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

var backEventListener = null;

var unregister = function() {
	if (backEventListener !== null) {
		document.removeEventListener('tizenhwkey', backEventListener);
		backEventListener = null;
		window.tizen.application.getCurrentApplication().exit();
	}
}

// Initialize function
var init = function() {
	// register once
	if (backEventListener !== null) {
		return;
	}

	// TODO:: Do your initialization job
	console.log("init() called");

	var backEvent = function(e) {
		if (e.keyName == "back") {
			try {
				if ($.mobile.urlHistory.activeIndex <= 0) {
					// if first page, terminate app
					unregister();
				} else {
					// move previous page
					$.mobile.urlHistory.activeIndex -= 1;
					$.mobile.urlHistory.clearForward();
					window.history.back();
				}
			} catch (ex) {
				unregister();
			}
		}
	}

	// add eventListener for tizenhwkey (Back Button)
	document.addEventListener('tizenhwkey', backEvent);
	backEventListener = backEvent;
};

$(document).bind('pageinit', init);
$(document).unload(unregister);
