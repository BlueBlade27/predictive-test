
  let input = document.getElementById("input");
  let suggestion = document.getElementById("suggestion");
  //Enter key code
  const enterKey = 13;
  
  window.onload = () => {
    input.value = "";
    clearSuggestion();
  };
  
  const clearSuggestion = () => {
    suggestion.innerHTML = "";
  };
  
  const caseCheck = (word) => {
    //Array of characters
    word = word.split("");
    let inp = input.value;
    //loop through every character in ino
    for (let i in inp) {
      //if input character matches with character in word no need to change
      if (inp[i] == word[i]) {
        continue;
      } else if (inp[i].toUpperCase() == word[i]) {
        //if inp[i] when converted to uppercase matches word[i] it means word[i] needs to be lowercase
        word.splice(i, 1, word[i].toLowerCase());
      } else {
        //word[i] needs to be uppercase
        word.splice(i, 1, word[i].toUpperCase());
      }
    }
    //array to string
    return word.join("");
  };
  

 input.addEventListener("input", (e) => {
  clearSuggestion();
  console.log("User input:", input.value); // Debugging line
  if (input.value != "") {
    fetch(`https://api.datamuse.com/sug?s=${input.value}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); // Debugging line
        if (data.length > 0) {
          let suggestedWord = data[0].word;
          console.log("Suggested word before caseCheck:", suggestedWord); // Debugging line
          suggestedWord = caseCheck(suggestedWord);
          console.log("Suggested word after caseCheck:", suggestedWord); // Debugging line
          suggestion.innerHTML = suggestedWord;
        }
      })
      .catch(error => console.error('Error fetching data:', error)); // Debugging line
  }
});

  
  //Complete predictive text on enter key
  input.addEventListener("keydown", (e) => {
    //When user presses enter and suggestion exists
    if (e.keyCode == enterKey && suggestion.innerText != "") {
      e.preventDefault();
      input.value = suggestion.innerText;
      //clear the suggestion
      clearSuggestion();
    }
  });