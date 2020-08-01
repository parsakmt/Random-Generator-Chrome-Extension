//Determines if default or saved information should be added upon loading
window.onload = function() {
    chrome.storage.sync.get(["starting", "ending", "letterResult"], function(letter) {
        
        if (letter.starting == null && letter.ending == null) {
            resetToDefault(); 
        }
        else {
            document.getElementById("startingLetter").value = letter.starting;
            document.getElementById("endingLetter").value = letter.ending; 

            //So as to not lose the line break when moving to the homescreen
            if (letter.letterResult != "") document.getElementById("randLetterResult").innerHTML = letter.letterResult;
        }   
    });
}

//Event Listeners

//When submit clicked
document.addEventListener('DOMContentLoaded', function() {
    var  submitButton = document.getElementById("submit"); 

    submitButton.addEventListener("click", function() {
        main(); 
    });
}); 

//When reset clicked
document.addEventListener('DOMContentLoaded', function() {
    var  refreshButton = document.getElementById("reset"); 

    refreshButton.addEventListener("click", function() {
        resetToDefault(); 
    });
}); 


//Functions

function resetToDefault() {
    document.getElementById("startingLetter").value = "a"; 
    document.getElementById("endingLetter").value = "z"; 

    //Reseting result value with a line break
    var lineBreakElement = document.createElement('br');
    document.getElementById("randLetterResult").innerHTML = ""; 
    document.getElementById('randLetterResult').appendChild(lineBreakElement);

    //Saves information to chrome storage
    chrome.storage.sync.set({'min': 0});
    chrome.storage.sync.set({'max': 10});
    chrome.storage.sync.set({'numResult': ""});
}

//Main Function for random letter generator
function main() {

    //Each letter corresponds to the index
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    var firstLetter = document.getElementById("startingLetter").value.toString().toLowerCase(); 
    var lastLetter = document.getElementById("endingLetter").value.toString().toLowerCase(); 

    if (alphabet.indexOf(firstLetter) == -1) {
        document.getElementById("errorMessage").innerHTML = "The starting value isn't a letter"; 

        document.getElementById("randLetterResult").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline";
    }
    else if (alphabet.indexOf(lastLetter) == -1) {
        document.getElementById("errorMessage").innerHTML = "The ending value isn't a letter"; 

        document.getElementById("randLetterResult").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline";
    }
    else {
        firstLetter = alphabet.indexOf(firstLetter); 
        lastLetter = alphabet.indexOf(lastLetter); 

        var randLetter = Math.floor(Math.random() * (lastLetter - firstLetter + 1) + firstLetter); 

        randLetter = alphabet[randLetter]; 

        //Saves information to chrome storage
        chrome.storage.sync.set({'starting': alphabet[firstLetter]});
        chrome.storage.sync.set({'ending': alphabet[lastLetter]});
        chrome.storage.sync.set({'letterResult': randLetter});

        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("randLetterResult").style.display = "inline";

        document.getElementById("randLetterResult").innerHTML = randLetter;
    }

}