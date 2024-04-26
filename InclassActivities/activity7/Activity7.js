var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	$("add").onclick = addScore;
	$("name").focus(); // Move cursor to Name field on application start
};

function displayResults() {
	var average = 0;
	var highestScore = -Infinity; // Initialize to a very low value
	
	for(var i = 0; i < scores.length; i++) {
		average = (average * i + scores[i]) / (i + 1);
		if (scores[i] > highestScore) {
			highestScore = scores[i];
		}
	}
	
	// Displaying results
	var resultDiv = $("results");
	resultDiv.innerHTML = "<h2>Results</h2><p>Average score is " + average.toFixed(2) + "</p><p>Highest score is " + highestScore + "</p>";
}

function displayScores() {
	var table = $("scores_table");
	table.innerHTML = ""; // Clear previous data
	
	for(var i = 0; i < names.length; i++) {
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = names[i];
		cell2.innerHTML = scores[i];
	}
}

function addScore() {
	var nameInput = $("name").value.trim();
	var scoreInput = parseInt($("score").value.trim());
	
	if (nameInput === "" || isNaN(scoreInput) || scoreInput < 0 || scoreInput > 100) {
		alert("You must enter a name and a valid score (0-100).");
		return;
	}
	
	names.push(nameInput);
	scores.push(scoreInput);
	
	$("name").value = ""; // Clear input fields
	$("score").value = "";
	$("name").focus(); // Move cursor to Name field after adding score
	
	displayScores(); // Update displayed scores
}

