addEventListener('load', function() {
	console.log('Loaded 😏');
	
	//*********************
	// INDEX / SPLASH     *
	//*********************
	var $div = $('<div>');
	$div.attr('className', 'container');
	
	var $h1 = $('<h1>');
	$h1.attr('id', 'header');
	$h1.text('Etched!');
	
	
	// form
	var $form = $('<form>');
	$p = $('<p>');
	$p.attr('id', 'info');
	$p.text('Your Pair Programming Tool. Track hours. Track relationships.');
	var $username = $('<input>');
	$username.attr('type', 'text');
	$username.attr('placeholder', 'username');
	$username.attr('id', 'signin');
	$username.attr('size', '50');
	
	var $password = $('<input>');
	$p1 = $('<p>');
	$password.attr('type', 'password');
	$password.attr('id', 'signin');
	$password.attr('placeholder', 'password');
	$password.attr('size', '50');
	
	var $submit = $('<input>');
	var $p2 = $('<p>');
	$submit.attr('id', 'login');
	$submit.attr('type', 'button');
	$submit.attr('value', 'Login!');
	
	//*********************
	// LOGIN              *
	//*********************
	$submit.click(function(){
		console.log("Login clicked!");
		
		var typedName = $username.val();
		var typedPassword = $password.val();
		
		// Authentication (get all users and match username and password.
		var myReq = $.ajax({
			type: "GET",
			url: "http://localhost:8080/Etched/api/users",
			dataType: "json",
		});
		
		var passed = false;
		myReq.done(function(data) {
			data.forEach(function(value){
				if (value.username === typedName) {
					console.log("match!");
					
					if (value.password === typedPassword) {
						passed = true;
						homePage(value);
					}
				}
			})
			if (passed === false) {
				alert("Wrong Username or password entered!");
			}
			
		});
		
		
	});
		
	$form.append($p);
	$form.append($username);
	$form.append($p1);
	$form.append($password);
	$form.append($p2);
	$form.append($submit);
	$div.append($h1);
	$div.append($form);
	$('body').append($div);
	
	var $div2 = $('<div>');
	$div2.append(footer());
	$('body').append($div2);
	
	
	
});



function homePage(user) {
	console.log("Home Page!");
	$('body').empty();
	
	var $div = $('<div>');
	$div.attr('id', 'home');
	
	var $h1 = $('<h1>');
	$h1.attr('id', 'white');
	$h1.text('Welcome ' + user.fname + "!");
	$div.append($h1);
	
	var $hr = $('<hr>');
	$div.append($hr);
	
	var $h2 = $('<h2>');
	$h2.attr('id', 'white');
	$h2.text('Your Friends');
	$div.append($h2);
	
	var $h3 = $('<h3>');
	$h3.attr('id', 'howto');
	$h3.html('Here is where you track all of your Pair Programming hours.<br> <b>To edit an existing friend</b>, click on their Name, e-mail or location to change their information.<br> <b>To Add a social media link</b>, click on thier social media section.');
	$div.append($h3);
	
	
	
	var $addFriend = $('<input>');
	$addFriend.attr('id', 'addFriend');
	$addFriend.attr('type', 'button');
	$addFriend.attr('value', 'Add Friend');
	$div.append($addFriend);
	
	
	$addFriend.click(function(){
		console.log("Add friend clicked!");
		friendAdder(user);
	})
	
	
	var $start = $('<p>');
	$div.append($start);
	
	
	// TABLE HEADER
	var $table = $('<table>');
	var $thead = $('<thead>');
	var $Hname = $('<th>');
	$Hname.text('Name');
	var $Hemail = $('<th>');
	$Hemail.text('E-mail');
	var $Hlocation = $('<th>');
	$Hlocation.text('Location');
	var $Hsocial = $('<th>');
	$Hsocial.text('Social Media');
	var $HtalkTime = $('<th>');
	$HtalkTime.text('Etched Time');
	var $remove = $('<th>');
	$remove.text('Remove');
	
	$thead.append($Hname);
	$thead.append($Hemail);
	$thead.append($Hlocation);
	$thead.append($Hsocial);
	$thead.append($HtalkTime);
	$thead.append($remove);
	$table.append($thead);
	
	$tbody = $('<tbody>');
	var myReqContacts = $.ajax({
		type: "GET",
		url: "http://localhost:8080/Etched/api/contacts",
		dataType: "json",
	});
	
	var totalTime = 0;
	var myContacts = [];
	myReqContacts.done(function(data) {
		data.forEach(function(contact) {
			if (contact.userId === user.id) {
				myContacts.push(contact);
				totalTime = totalTime + parseInt(contact.hours);
			}
		})
		
			myContacts.forEach(function(contact) {
				
				
				console.log(contact);
				var $tr = $('<tr>');
				
				var $td1 = $('<td>');
				$td1.text(contact.fname + " " + contact.lname);
				$tr.append($td1);
				$td1.click(function(){
					updateInfo(user, contact);
				})
				
				var $td2 = $('<td>');
				$td2.text(contact.email);
				$tr.append($td2);
				$td2.click(function(){
					updateInfo(user, contact);
				})
				
				var $td3 = $('<td>');
				$td3.text(contact.location);
				$tr.append($td3);
				$td3.click(function(){
					updateInfo(user, contact);
				})
				
				var $td4 = $('<td>');
				 var myReqSocial = $.ajax({
						type: "GET",
						url: "http://localhost:8080/Etched/api/socialMedia",
						dataType: "json",
					});
				 
				 
				 var $ul = $('<ul>');
				 var mySocial = [];
				 myReqSocial.done(function(data) {
					 data.forEach(function(socials){
						 if (socials.contactId === contact.id){
							 var $li = $('<li>');
							 $li.html("<p><b>Platform:</b> " + socials.type + "</p>" + "<p><b>Username: </b>" + socials.username + "</p>");
							 $ul.append($li);
						 }
					 })
				 })
				
				$td4.html($ul);
				 $td4.click(function(e){
					 e.preventDefault();
					 updateSocialMedia(user, contact);
				 })
				 
				 
				$tr.append($td4);
				
				
				var $td5 = $('<td>');
			
				var $formy = $('<form>');
				var $value = $('<input>');
				$value.attr('type', 'text');
				$value.attr('disabled', 'true');
				$value.attr('size', '4');
				$value.attr('value', contact.hours);
				$value.attr('id', 'talkTime');
				$formy.append($value);
				var $space = $('<p>');
				$formy.append($space);
				var $upper = $('<button>');
				$upper.attr('type', 'button');
				$upper.html('<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>');
				$formy.append($upper);
				var $downer = $('<button>');
				$downer.attr('type', 'button');
				$downer.html('<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>');
				$formy.append($downer);
				
				//*********************
				// CHANGE VALUE       *
				//*********************
				
				var counter = contact.hours;
				$upper.click(function(e){
					e.preventDefault();
					console.log("up clicked!");
					upper(contact);
				})
				
				$downer.click(function(e){
					e.preventDefault();
					console.log("down clicked!");
					downer(contact);
				})
				
				
				
				$td5.html($formy);
				$tr.append($td5);
				
				
				var $td6 = $('<td>');
				var $delete = $('<button>');
				$delete.text('Remove');
				$delete.click(function(e){
					e.preventDefault();
					removeContact(user, contact);
				})
				
				$td6.html($delete);
				$tr.append($td6);

				$tbody.append($tr);
				
			})
			
			var $totalRow = $('<tr>');
			var $total = $('<td>');
			$total.attr('colSpan', '6');
			$total.attr('id', 'total');
			$total.text("Total Paired Programming Hours: " + parseInt(totalTime));
			$totalRow.append($total);
			$tbody.append($totalRow);
			
			$table.append($tbody);
			
			$div.append($table);
			$('body').append($div);
			
			var $div2 = $('<div>');
			$div2.append(footer());
			$('body').append($div2);
			
	})
}

function upper(contact){
	
	
    var updatedContact = {
    		userId: contact.userId,
    		email: contact.email,
    		fname: contact.fname,
    		lname: contact.lname,
    		location: contact.location,
    		hours: contact.hours + 1
    		
    };
    
    var stringified = JSON.stringify(updatedContact);
    
    console.log(stringified)
    $.ajax({
        type: "PUT",
        url: "api/contacts/" + contact.id,
        contentType: "application/json",
        data: stringified,
    });
    
    var myReq = $.ajax({
		type: "GET",
		url: "http://localhost:8080/Etched/api/users",
		dataType: "json",
	});
	
    var user = {};
	myReq.done(function(data) {
		data.forEach(function(value){
			if (value.id === contact.userId) {
				user= value;
				homePage(user);
			}
		})
		
	});
}


function downer(contact){
	
	
    var updatedContact = {
    		userId: contact.userId,
    		email: contact.email,
    		fname: contact.fname,
    		lname: contact.lname,
    		location: contact.location,
    		hours: contact.hours - 1
    		
    };
    
    var stringified = JSON.stringify(updatedContact);
    
    console.log(stringified)
    $.ajax({
        type: "PUT",
        url: "api/contacts/" + contact.id,
        contentType: "application/json",
        data: stringified,
    });
    
    var myReq = $.ajax({
		type: "GET",
		url: "http://localhost:8080/Etched/api/users",
		dataType: "json",
	});
	
    var user = {};
	myReq.done(function(data) {
		data.forEach(function(value){
			if (value.id === contact.userId) {
				user= value;
				homePage(user);
			}
		})
		
	});
}



function friendAdder(user){
	$('body').empty();
	
	var $div = $('<div>');
	
	var button = backButton(user);
	$div.append(button);
	
	var $h1 = $('<h1>');
	$h1.attr('id',  'white');
	$h1.text('Add a friend!');
	$div.append($h1);
	
	var $hr = $('<hr>');
	$div.append($hr);
//	
//	var $h2 = $('<h2>');
//	$h2.attr('id',  'white');
//	$h2.text('Enter their information:');
//	$div.append($h2);
//	
	
	var $form = $('<form>');
	
	var $FName = $('<p>');
	$FName.text("First Name:");
	var $fname = $('<input>');
	$fname.attr('id', 'field');
	$fname.attr('type', 'text');
	$form.append($FName);
	$form.append($fname);
	
	var $LName = $('<p>');
	$LName.text("Last Name:");
	var $lname = $('<input>');
	$lname.attr('id', 'field');
	$lname.attr('type', 'text');
	$form.append($LName);
	$form.append($lname);
	
	var $Loc = $('<p>');
	$Loc.text("Location:");
	var $location = $('<input>');
	$location.attr('id', 'field');
	$location.attr('type', 'text');
	$form.append($Loc);
	$form.append($location);
	
	var $Email = $('<p>');
	$Email.text("Email:");
	var $email = $('<input>');
	$email.attr('id', 'field');
	$email.attr('type', 'text');
	$form.append($Email);
	$form.append($email);
	
	var $Hours = $('<p>');
	$Hours.text("Hours:");
	var $hours = $('<input>');
	$hours.attr('id', 'field');
	$hours.attr('type', 'text');
	$form.append($Hours);
	$form.append($hours);
	
	var $submit = $('<button>');
	$submit.attr('id', 'login');
	$submit.text('Add Friend');
	
	$submit.click(function(e){
		e.preventDefault();
		console.log("submit clicked");
		
		var id = user.id;
		 var newContact = {
		    		userId: id,
		    		email: $email.val(),
		    		fname: $fname.val(),
		    		lname: $lname.val(),
		    		location: $location.val(),
		    		hours: $hours.val()
		    		
		    };
		    
		    var stringified = JSON.stringify(newContact);
		    
		    console.log(stringified)
		    var newContact = $.ajax({
		        type: "POST",
		        url: "api/contacts",
		        contentType: "application/json",
		        data: stringified
		    });

		    
		    newContact.done(function(info){
		    	homePage(user);
		    })
	})
	
	var $spacing = $('<p>');
	
	$form.append($spacing);
	$form.append($submit);
	$div.append($form);
	$div.append(footer());
	
	$('body').append($div)

	
}

function updateInfo(user, cont){
	$('body').empty();
	

	console.log("User: " + user.username);
	console.log(cont);
	
	var $div = $('<div>');
	
	var button = backButton(user);
	$div.append(button);
	
	var $h1 = $('<h1>');
	$h1.attr('id', 'white')
	$h1.text('Update Friend Information!');
	$div.append($h1);
	
	var $hr = $('<hr>');
	$div.append($hr);
	
	var $h4 = $('<h4>');
	$h4.attr('id', 'white');
	$h4.text('Sadly, even friends change! Update ' + cont.fname +'\'s information:');
	$div.append($h4);
	
	var $form = $('<form>');
	
	var $FNAME = $('<p>');
	$FNAME.text("First Name:");
	var $fname = $('<input>');
	$fname.attr('id', 'field');
	$fname.attr('type', 'text');
	$fname.attr('value', cont.fname);
	$form.append($FNAME);
	$form.append($fname);
	
	var $LNAME = $('<p>');
	$LNAME.text("Last Name:");
	var $lname = $('<input>');
	$lname.attr('id', 'field');
	$lname.attr('type', 'text');
	$lname.attr('value', cont.lname);
	$form.append($LNAME);
	$form.append($lname);
	
	var $EMAIL = $('<p>');
	$EMAIL.text("Email:");
	var $email = $('<input>');
	$email.attr('id', 'field');
	$email.attr('type', 'text');
	$email.attr('value', cont.email);
	$form.append($EMAIL);
	$form.append($email);
	
	var $LOC = $('<p>');
	$LOC.text("Location:");
	var $location = $('<input>');
	$location.attr('id', 'field');
	$location.attr('type', 'text');
	$location.attr('value', cont.location);
	$form.append($LOC);
	$form.append($location);
	
	var $HOURS = $('<p>');
	$HOURS.text("Hours:");
	var $hours = $('<input>');
	$hours.attr('id', 'field');
	$hours.attr('type', 'text');
	$hours.attr('value', cont.hours);
	$form.append($HOURS);
	$form.append($hours);
	
	var $spacer = $('<p>');
	
	var $submit = $('<button>');
	$submit.text("Make Changes");
	$submit.attr('id', 'login');
	$form.append($spacer);
	$form.append($submit);
	
	$submit.click(function(e){
		e.preventDefault();
		
		var id = user.id;
		var updatedContact = {
				userId: id,
	    		email: $email.val(),
	    		fname: $fname.val(),
	    		lname: $lname.val(),
	    		location: $location.val(),
	    		hours: cont.hours
		};
		
		var stringified = JSON.stringify(updatedContact);
	    
	    console.log(stringified);
	    $.ajax({
	        type: "PUT",
	        url: "api/contacts/" + cont.id,
	        contentType: "application/json",
	        data: stringified
	    });

	    
	    homePage(user);
	})
	
	$div.append($form)
	$div.append(footer());
	$('body').append($div);
	
	
}

function updateSocialMedia(user, cont) {
	$('body').empty();
	
	var $div = $('<div>');

	console.log("User: " + user.username);
	console.log(cont);
	
	var button = backButton(user);
	$div.append(button);
	
	var $h1 = $('<h1>');
	$h1.text('Add Social Media!');
	$h1.attr('id', 'white');
	$div.append($h1);
	
	var $hr = $('<hr>');
	$div.append($hr);
	
	var $h4 = $('<h4>');
	$h4.text('Everyone has social media...');
	$h4.attr('id', 'white');
	$div.append($h4);
	
	var $form = $('<form>');
	
	var $TYPE = $('<p>');
	$TYPE.text("Type:");
	var $type = $('<input>');
	$type.attr('type', 'text');
	$type.attr('id', 'field');
	$type.attr('placeholder', 'e.g. \'Facebook\', \'Twitter\',  \'Instagram\', etc.');
	$form.append($TYPE);
	$form.append($type);
	
	var $USERN = $('<p>');
	$USERN.text("Username/Link:");
	var $username = $('<input>');
	$username.attr('type', 'text');
	$username.attr('id', 'field');
	$username.attr('placeholder', 'username');
	$form.append($USERN);
	$form.append($username);
	
	var $spacer = $('<p>');
	
	var $submit = $('<button>');
	$submit.text("Add Social Media!");
	$submit.attr('id', 'login');
	$form.append($spacer);
	$form.append($submit);
	
	$submit.click(function(e){
		e.preventDefault();
		
		var newSocial = {
				contactId: cont.id,
				type: $type.val(),
				username: $username.val()
		}
		
		var stringified = JSON.stringify(newSocial);
	    
	    console.log(stringified);
	    $.ajax({
	        type: "POST",
	        url: "api/socialMedia",
	        contentType: "application/json",
	        data: stringified
	    });
		
		
	    homePage(user);
	})
	
	
	$div.append($form);
	$('body').append($div);
	
	var $div2 = $('<div>');
	$div2.append(footer());
	$('body').append($div2);
	
}

function removeContact(user, cont) {
	
	$.ajax({
        type: "DELETE",
        url: "api/contacts/" + cont.id,
        contentType: "application/json",
    });
	
	homePage(user);
}

function backButton(user) {
	var $back = $('<button>');
	$back.attr('id', 'homeButton');
	$back.text('Home');
	
	$back.click(function(e){
		e.preventDefault();
		homePage(user);
	})
	
	return $back;
}

function footer() {
	var $footer = $('<footer>');
	var $p = $('<p>');
	$p.html('Created By <b>Patrick Gaston</b>');
	$footer.append($p);
	
	return $footer
}