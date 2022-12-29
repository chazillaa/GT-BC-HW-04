// gets score data from local storage and creates a li element to display on the score board
function printScores() {
    var scores = JSON.parse(localStorage.getItem("scoreBoard")) || [];
    scores.sort(function(a, b) {
      return b.score - a.score;
    });
    scores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.initScore + " - " + score.score;
      var olEl = document.getElementById("scores");
      olEl.appendChild(liTag);
    });
  }
// removes saved scores and then refreshes the page
function clearScores() {
    localStorage.removeItem('scoreBoard');
    location.reload();
  }
// when clear button is clicked run the clearScores function
  document.getElementById("clear").onclick = clearScores;
// when page is loaded run the printScore function
  printScores();





