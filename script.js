//how we want the customers structured
class customerClass {	
	constructor(id, date, name, address, city, state, zip, phone, email) {
		this.id = id;
		this.date = date;
		this.name = name;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.phone = phone;
		this.email = email;
	}
};

//The current customer and the old customers array
var customer;
var oldCustomers;

//unique ID variable and date
var uniqueID;
var d = new Date();
var currentDate = d.toISOString().slice(0,11).replace('T', ' ');
document.getElementById("dateView").innerHTML = currentDate;

//getting the old customer list from the database
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		//we assign the JSON response to the the oldCustomers variable we created, storing the customers temporarily in our javascript
	   oldCustomers = JSON.parse(xhttp.response);
	   //we call on the lastID() function now that we have the customer list
	   lastID();
    }
};
xhttp.open("GET", "./get.php", true);
xhttp.setRequestHeader("apikey", "somethingunique");
xhttp.send();
//function that assigns an id to the customers
function lastID() {
	var lastItem = oldCustomers.length - 1;
	if (oldCustomers[lastItem].id == null || oldCustomers[lastItem].id == undefined || lastItem < 0 ) {
		//use a variation of the date if we can't connect to the database
		uniqueID = d.getYear() + "" + d.getHours() + "" + d.getMinutes();
	}
	else {
	uniqueID = oldCustomers[lastItem].id + 1;
	}
	document.getElementById("uniqueID").innerHTML = uniqueID;
}

//function that is called when someone searches for an old customer
function searchCustomers() {
	var searchTerms = document.getElementById("searchMe").value;
	var out = "";
	var limit = oldCustomers.length - 49;	//use a limit to only return a max number of results
	for(var i = oldCustomers.length - 1; i > -1  && i > limit; i--) {
	  if (oldCustomers[i].id.toString().includes(searchTerms) || oldCustomers[i].name.includes(searchTerms) || searchTerms.length == 0) {
		var objectsPlease = JSON.stringify(oldCustomers[i]); //stringify each object so it can be sent through the href link
		out += "<tr><td><a href='#customerInfo' onClick='beamMeUp2(" + objectsPlease + ")' >" + oldCustomers[i].id + "</a></td><td>" + oldCustomers[i].name + "</td><td>" + oldCustomers[i].phone + "</td><td>" + oldCustomers[i].city  + "</td><td>" + oldCustomers[i].date.slice(0, 11).replace('T', ' ') + "</td></tr>";
		}
	  }
	if (out.length == 0) {
	  out = "<h4>No search results were returned. Sorry!</h4>"
	}
	document.getElementById("searchResults").innerHTML = "<table class='oldCustomerList' ><tr><th>Customer ID:</th><th>Name:</th><th>Phone Number:</th><th>City:</th><th>Date Added:</th></tr>" + out + "</table>";
	if (document.getElementById("hideshow").classList.contains("noshowbaby")){
	hideResults();
	}
	else {
		document.getElementById("hideshow").value = "Hide Results";
		document.getElementById("searchResults").classList.remove("noshowbaby");
	}
 }

function hideResults() {
   var btt = document.getElementById("hideshow");
	if (btt.classList.contains("noshowbaby")){
		btt.classList.remove("noshowbaby");
	};
  if (btt.value ==='Hide Results') {
    btt.value = 'Show Results';
  }
  else {
     btt.value = 'Hide Results';
  }
  var element = document.getElementById("searchResults");
  element.classList.toggle("noshowbaby");
} 

function beamMeUp2(person){
	uniqueID = person.id;
	document.getElementById("uniqueID").innerHTML = person.id;
	document.getElementById("dateText").innerHTML = "Last Updated: ";
	document.getElementById("dateView").innerHTML = person.date.slice(0, 11).replace('T', ' ');
	document.getElementById("name").value = person.name;
	document.getElementById("street").value = person.address;
	document.getElementById("city").value = person.city;
	document.getElementById("state").value = person.state;
	document.getElementById("zip").value = person.zip;
	document.getElementById("phone").value = person.phone;
	document.getElementById("email").value = person.email;
   }

//saves the customer and sends it to database
function submitCustomer() {
	
function checkForExisting(){
for(var i = 0; i < oldCustomers.length; i++){
	if(oldCustomers[i].id == uniqueID)
		return true;
		}
		return false;
}
 let id = uniqueID;
 let date = d.toISOString().slice(0,11).replace('T', ' ');
 let name = document.getElementById("name").value  || "-";
 let address = document.getElementById("street").value  || "-";
 let city = document.getElementById("city").value  || "-";
 let state = document.getElementById("state").value  || "-";
 let zip = document.getElementById("zip").value  || 0;
 let phone = document.getElementById("phone").value || 0;
 let email = document.getElementById("email").value || "-";
customer = new customerClass(id, date, name, address, city, state, zip, phone, email);
var jsonPerson = JSON.stringify(customer);
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	   console.log(xhttp.responseText);
		}
	};
//the two functions below will either add a new entry and update an existing
if (!checkForExisting()) {
xhttp.open("POST", "./send.php", true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.setRequestHeader("apikey", "somethingunique");
xhttp.send(jsonPerson);
alert("Customer Saved!");
resetPage();
}
else {
xhttp.open("PUT", "./update.php", true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.setRequestHeader("apikey", "somethingunique");
xhttp.send(jsonPerson);
alert("Customer Updated!");
resetPage();
}
}

//reset the form
function resetPage() {
	location.reload(true);
}

//delete the customer
function deleteCustomer() {
	var selectedCustomer = {
		id: uniqueID
	}
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   console.log(xhttp.responseText);
			}
		};
	var jsonCustomer = JSON.stringify(selectedCustomer);
	xhttp.open("DELETE", "./delete.php", true);
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.setRequestHeader("apikey", "somethingunique");
	xhttp.send(jsonCustomer);
	alert("Customer Removed!");
	resetPage();
}
