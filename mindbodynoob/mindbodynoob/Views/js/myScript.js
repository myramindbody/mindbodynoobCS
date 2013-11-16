var numComplete = 0;
var userRef;
var auth;
var loggedIn = false;

$(document).ready(function() {
	var dbRef = new Firebase('https://mindbodynoob.firebaseIO.com/');
	auth = new FirebaseSimpleLogin(dbRef, function(error, user) {
	  if (error) 
	  {
	    // an error occurred while attempting login
	    alert(error);
	  } else if (user) 
	  {
	    // user authenticated with Firebase
	    doLogin(user);
	  } else 
	  {
	  }
	});
	changeProgress(numComplete);	

	//if check box state changes
	$('.cbox').change(function(){
		if($(this).prop('checked') == true)
		{
			if(loggedIn)
			{
				userRef.child($(this).attr('id')).set('true');
				userRef.child("numComplete").set(numComplete + 1);
				console.log("check stored!");				
			} else
			{
				numComplete++;
				changeProgress(numComplete);	
			}

		} else
		{
			if(loggedIn)
			{
				userRef.child($(this).attr('id')).set('false');	
				userRef.child("numComplete").set(numComplete - 1);			
				console.log("check deleted!");					
			} else
			{
				numComplete--;
				changeProgress(numComplete);	
			}
		}
	})
;});

//executes actual user log in
function logIn() 
{
	var email = $('#email').val();
	var password = $('#pword').val();
	console.log(email + " " + password);

	//attempts login
	auth.login('password', {
	  email: email,
	  password: password
	});
};

//executes actions following user log in
function doLogin(user)
{
	//once user is logged in...
	alert("Successfully logged in.");
    clearCBoxes();
    loggedIn = true;
    $("#reminder").addClass("invisible");
	$("#loginForm").addClass("invisible");
	$("#logOut").removeClass("invisible");
	var fb = "https://mindbodynoob.firebaseIO.com/" + user.id;
    userRef = new Firebase(fb);
    getNumComplete(fb);
    setCBoxes(fb);
}

//creates a new user
function newUser()
{
	var email = window.prompt("Email?");
	var password = window.prompt("Password?");
	console.log(email + " " + password);
	auth.createUser(email, password, function(error, user) {
	  if (!error) {
	    console.log('User Id: ' + user.id + ', Email: ' + user.email);
	    alert("New account successfully created.");
	  } else
	  {
	  	alert(error);
	  }
	});
}

//gets the number of checked check boxes and updates progress bar
function getNumComplete(fb)
{
	//gets numComplete value
	var v = fb + "/" + "numComplete";
	var ref2 = new Firebase(v)
	ref2.on('value', function(snapshot) {
		if(snapshot.val() != null)
		{
			numComplete = snapshot.val();
			changeProgress(numComplete);
			console.log("numComplete " + numComplete); 
		} else
		{				
			userRef.child("numComplete").set(0);	
		}
	});
}

//sets check box states to reflect values in database
function setCBoxes(fb)
{
	$('.cbox').each(function(i){
		var name = $(this).attr('id');
		var v = fb + "/" + name;
		ref = new Firebase(v);	
		ref.on('value', function(snapshot) {
			console.log(name  + " " + snapshot.val());
			if(snapshot.val() === "true")
			{
				console.log(name + " checkbox checked!!");
				var s = "#" + name;
				$(s).prop('checked', true);
			} 
		});
	});
};

//changes the progress bar
function changeProgress(numComplete)
{
	var percent = (numComplete/20)*100;
	$("#pbar").attr("aria-valuenow", percent);
	$("#pbar").attr("style", "width:" + percent + "%");
};

//logs user out
function logOut()
{
	//not working....
	auth.logout();
	alert("Logged out.");
    $("#reminder").removeClass("invisible");
	$("#loginForm").removeClass("invisible");
	$("#logOut").addClass("invisible");
	//resets vars
	numComplete = 0;
	changeProgress(numComplete);
	loggedIn = false;
	clearCBoxes();
}

//returns all check boxes to unchecked state
function clearCBoxes()
{
	$('.cbox').each(function(){
		$(this).prop('checked', false);
	})
}