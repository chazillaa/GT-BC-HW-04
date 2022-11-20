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
  function clearScores() {
    localStorage.removeItem('scoreBoard');
    location.reload();
  }
  document.getElementById("clear").onclick = clearScores;
  printScores();





