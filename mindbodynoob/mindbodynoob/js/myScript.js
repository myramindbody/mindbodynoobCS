var numComplete = 0;
var user = null;
$(document).ready(function () {
    changeProgress(numComplete);
    //if check box state changes
    $('.cbox').change(function () {
        if ($(this).prop('checked') == true) {
            if (user != null) {
                user.Arr[$(this).attr('id')] = true;
                user.NumComplete++;
                console.log("check stored!");
                changeProgress(user.NumComplete);
            } else {
                numComplete++;
                changeProgress(numComplete);
            }

        } else {
            if (user != null) {
                user.Arr[$(this).attr('id')] = false;
                user.NumComplete--;
                console.log("check deleted!");
                changeProgress(user.NumComplete);
            } else {
                numComplete--;
                changeProgress(numComplete);
            }
        }
    })
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
        success: logInSuccessFunc,
        error: errorFunc
    });
};

//creates a new user
function newUser() {
    var email = window.prompt("Email?");
    var password = window.prompt("Password?");
    console.log(email + " " + password);
    $.ajax({
        type: "POST",
        url: "/Home/CreateNewUser",
        data: { email: email, password: password },
        success: newUserSuccessFunc,
        error: errorFunc
    });
}

//logs user out
function logOut() {
    $.ajax({
        type: "POST",
        url: "/Home/LogOut",
        data: {},
        success: logOutSuccessFunc,
        error: errorFunc
    });
    user = null;
}

function logInSuccessFunc(data, status) {
    alert("log in success!");
    $("#reminder").addClass("invisible");
    $("#loginForm").addClass("invisible");
    $("#logOut").removeClass("invisible");
    user = data;
    setCBoxes(data);
}

function newUserSuccessFunc(data, status) {
    alert("new user success!");
    $("#reminder").addClass("invisible");
    $("#loginForm").addClass("invisible");
    $("#logOut").removeClass("invisible");
    user = data;
    setCBoxes(data);
}

function logOutSuccessFunc(data, status) {
    console.log("logged out");
    user = null;
    $("#reminder").removeClass("invisible");
    $("#loginForm").removeClass("invisible");
    $("#logOut").addClass("invisible");
    clear();
}

function errorFunc() {
    alert("error");
}

//sets check box states to reflect values in database
function setCBoxes(user) {
    console.log("setCBoxex");
    console.log(user.Arr[0]);
    for(var i = 0; i < user.Arr.length; i++) {
        if (user.Arr[i] == true) {
            var s = "#cb" + (i + 1);
            $(s).prop('checked', true);
            console.log(s + " checked");
        }
    }
    changeProgress(user.NumComplete);
};

//changes the progress bar
function changeProgress(numComplete) {
	var percent = (numComplete/20)*100;
	$("#pbar").attr("aria-valuenow", percent);
	$("#pbar").attr("style", "width:" + percent + "%");
	console.log(numComplete + " checked. Percent: " + percent);
};

//returns all check boxes to unchecked state
function clear() {
    $('.cbox').each(function() {
        $(this).prop('checked', false);
    });
    numComplete = 0;
    changeProgress(0);
}