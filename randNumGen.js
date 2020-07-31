//Determines if default or saved information should be added upon loading
window.onload = function() {
    chrome.storage.sync.get(["min", "max", "randResult"], function(num) {
        
        if (num.min == null && num.max == null) {
            resetToDefault(); 
        }
        else {
            document.getElementById("minNum").value = num.min;
            document.getElementById("maxNum").value = num.max; 
            document.getElementById("randNumResult").innerHTML = num.randResult;
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
function randNumGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

function resetToDefault() {
    document.getElementById("minNum").value = "0"; 
    document.getElementById("maxNum").value = "10"; 

    //Reseting result value with a line break
    var lineBreakElement = document.createElement('br');
    document.getElementById("randNumResult").innerHTML = ""; 
    document.getElementById('randNumResult').appendChild(lineBreakElement);
}

function numIsInteger(num) {
    if (isNaN(num) || num.indexOf(".") != -1 || num == "") 
        return false;
    else 
        return true; 
}


//Main Function for random number generator
function main() {

    var minNum = document.getElementById("minNum").value.toString(); 
    var maxNum = document.getElementById("maxNum").value.toString(); 

    //If an invalid interval is given, an error message is displayed
    //If a valid interval is given, a random number is displayed 
    if(!numIsInteger(minNum)) {
        document.getElementById("errorMessage").innerHTML = "Minimum must be an INTEGER"; 

        document.getElementById("randNumResult").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline"; 
    }

    else if(!numIsInteger(maxNum)) {
        document.getElementById("errorMessage").innerHTML = "Maximum must be an INTEGER"; 

        document.getElementById("randNumResult").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline";
    }
   
    else if (parseInt(minNum) > parseInt(maxNum)) {
        document.getElementById("errorMessage").innerHTML = "Minimum must be LESS than the Maximum"; 

        document.getElementById("randNumResult").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline";
    }
    
    else {

        minNum = parseInt(minNum); 
        maxNum = parseInt(maxNum); 

        var randNum = randNumGenerator(minNum, maxNum).toString(); 

        chrome.storage.sync.set({'min': minNum});
        chrome.storage.sync.set({'max': maxNum});
        chrome.storage.sync.set({'randResult': randNum});


        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("randNumResult").style.display = "inline";

        document.getElementById("randNumResult").innerHTML = randNum;
    } 
}
