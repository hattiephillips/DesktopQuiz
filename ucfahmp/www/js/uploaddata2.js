//https://pluginarchive.com/wordpress/quiz-master-next/v/5-0-7/0-5
//https://stackoverflow.com/questions/33524771/refreshing-popup-content-in-geojson-layer-in-leaflet
//https://www.w3schools.com/js/js_json_http.asp


//XMLRequest to get question information
function getQuestion() {
	client=new XMLRequest();
	
	client.open('GET','http://developer.cege.ucl.ac.uk:30287');
	client.onreadystatechange=questionResponse;
	client.send();
}
function questionResponse() {
	if(client.readyState==4) {
		var questiondata =client.responseText;
		loadquestionlayer(questiondata);
	}
}
//array for proximity
var app_array=[];
//Conver to json
function loadquestionlayer(questiondata) {
	var questionjson = JSON.parse(questiondata);
	var questionlayer = L.geoJson(questionjson,
	{
		//holds makers for question and answer- for application use only
		onEachFeature:function (feature,layer) {
			layer.bindPopup(feature.properties.question+'<div> <form id="Qform" style="text-allign:centre"> <input type="radio" name="answer" id=check1 value="one" checked>'+feature.properties.answerone+ '<br> <input type="radio" name="answer" id=check2 value="two">'+feature.properties.answertwo+ '<br> <input type ="radio" name="answer" id=check3 value="three">'+feature.properties.answerthree+ '<br> <input type="radio" name="answer" id=check4 value="four">'+ feature.properties.answerfour +<br> </form></div>
			
		},
		
		//point-to-layer to create points
		pointToLayer: function (feature, latlng)
		{
			quiz_marker=L.marker(latlng, {icon:testMarkerGray});
			app_array.push(quiz_marker);
			return quiz_marker
		},
	}). addTo(mymap);
	mymap.fitBounds(questionlayer.getBounds());
}

//data upload to database
function startDataUpload() {
	var Question = document.getElementById("Question").value;
	var AnswerOne = document.getElementById("AnswerOne").value;
	var AnswerTwo = document.getElementById("AnswerTwo").value;
	var AnswerThree = document.getElementById("AnswerThree").value;
	var AnswerFour = document.getElementById("AnswerFour").value;
	var Correct = document.getElementById("Correct").value;
	var Longitude = document.getElementById("Longitude").value;
	var Latitude = document.getElementById("Latitude").value;
	var postString = "Question="+Question+"&AnswerOne="+AnswerOne=+"&AnswerTwo="+AnswerTwo=+"&AnswerThree="+AnswerThree=+"&AnswerFour="+AnswerFour+"&Correct="+ Correct + "&Latitude" + Latitude +"&Longitude" + Longitude;
	processData(postString);
	//alert for upload
	alert ("Question Upload");
	location.reload();
}

var client;
function processData(postString) {
	client = new XMLRequest();
	client.open('POST','http://developer.cege.ucl.ac.uk:30287/uploaddata',true);
	client.setRequestHeader("Content-type");
	client.onreadystatechange=dataUploaded;
	client.send(postString);
}
function dataUploaded() {
	if(client.readyState==4) {
		document.getElementById("dataUploadedResults").innerHTML = client.responseText;
	}
}

	
	
	
	