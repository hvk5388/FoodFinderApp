function changeFilter(icon) {
	if (icon.src = "images/star.png") {
		/*Show use of if else statments*/
		icon.scr = "images/star1.png";
		/*Demonstrates DOM manipulations*/
	} else if (icon.src = "images/star1.png") {
		icon.src = "images/star.png";
	}
}

function changeDollar(icon) {
	if (icon.src = "images/dollar.png") {
		icon.scr = "images/dollar1.png";
	} else if (icon.src = "images/dollar1.png") {
		icon.src = "images/dollar.png";
	}
}

var form_id_js = "email_form";

var data_js = {
	/*Demonstrates use of Objects*/
	"access_token": "9vtj4szaxzb00w5vzgsycvsy"
};

function js_onSuccess() {
	/*Remove this to avoid the redirect*/
	window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function js_onError(error) {
	/*Remove this to avoid the redirect*/
	window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = $("#" + form_id_js + " [name='send']");
/*Demonstrates use of jQuery*/

function js_send() {
	sendButton.value = 'Sending…';
	sendButton.disabled = true;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			/*Demonstrates use of conditionals*/
			js_onSuccess();
		} else
		if (request.readyState == 4) {
			js_onError(request.response);
		}
	};

	var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
	var message = document.querySelector("#" + form_id_js + " [name='text']").value;
	data_js['subject'] = subject;
	data_js['text'] = message;
	var params = toParams(data_js);

	request.open("POST", "https://postmail.invotes.com/send", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.send(params);

	return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
	/*Demonstrates use of functions*/
	var form_data = [];
	//Demonstrates use of arrays*/
	for (var key in data_js) {
		/*Demonstrates use of loops*/
		form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
	}

	return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
	e.preventDefault();
});

var submitButton = document.getElementById("submit_form");
var form = document.getElementById("email_form");
form.addEventListener("submit", function (e) {
	setTimeout(function () {
		submitButton.value = "Sending...";
		submitButton.disabled = true;
	}, 1);
});
/*This is a reference*/
/*Recieved help from https://postmail.invotes.com*/

function darkMode() {
	let highlightedItems = document.querySelectorAll("#flexbuttons");

	highlightedItems.forEach(function (userItem) {
		userItem.style.backgroundColor = "lightgray";
	});
	document.getElementById('MenuHeader').style.backgroundColor = "grey";
	document.getElementById('darkButton').style.visibility = "hidden";
	/*Multiple line comments*/
	/*document.getElementById("restaurants").style.backgroundColor = "black";
	document.getElementById("restaurants").style.color = "white";*/
}

function lightMode() {
	let highlightedItems = document.querySelectorAll("#flexbuttons");
	highlightedItems.forEach(function (userItem) {
		userItem.style.backgroundColor = "lightgray";
	});
	document.getElementById('MenuHeader').style.backgroundColor = "lightcoral";
	document.getElementById('darkButton').style.visibility = "visible";
}