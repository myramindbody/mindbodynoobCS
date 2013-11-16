var numComplete = 0;
var userRef;
var auth;
var loggedIn = false;

$(document).ready(function () {
    
;});

//executes actual user log in
function logIn() {
	var email = $('#email').val();
	var password = $('#pword').val();
	console.log(email + " " + password);
    $.ajax({
        type: "POST",
        url: "/Home/LogIn",
        data: { email: email, password: password },
        success: successFunc,
        error: errorFunc
    });

};

//creates a new user
/*function newUser() {
    console.log("yo");
    var email = window.prompt("Email?");
    var password = window.prompt("Password?");
    console.log(email + " " + password);
    $.ajax({
        type: "POST",
        url: "/Home/CreateNewUser",
        data: { email: email, password: password },
        success: successFunc,
        error: errorFunc
    });
}*/

//logs user out
/*function logOut() {
    $.ajax({
        type: "POST",
        url: "/Home/LogOut",
        data: {},
        success: successFunc,
        error: errorFunc
    });
}*/

function successFunc(data, status) {
    alert("success! data.email: " + data.Email);
}

function errorFunc() {
    alert("error");
}

//gets the number of checked check boxes and updates progress bar
function getNumComplete(fb)
{

}

//sets check box states to reflect values in database
function setCBoxes(fb)
{

};

//changes the progress bar
function changeProgress(numComplete)
{
	/*var percent = (numComplete/20)*100;
	$("#pbar").attr("aria-valuenow", percent);
	$("#pbar").attr("style", "width:" + percent + "%");*/
};

//returns all check boxes to unchecked state
function clearCBoxes()
{

}