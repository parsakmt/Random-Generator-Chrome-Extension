//Determines if default or saved information should be added upon loading
window.onload = function() {
    chrome.storage.sync.get(["input", "output"], function(list) {
        
        if (!(list.input == null && list.output == null)) {
            document.getElementById("listInput").value = list.input;
            document.getElementById("listOutput").value = list.output; 
        }   
    });
}

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
    document.getElementById("listInput").value = "";
    document.getElementById("listOutput").value = "";

    //Saves information to chrome storage
    chrome.storage.sync.set({"input": ""});
    chrome.storage.sync.set({"output": ""});
}

function main() {

    var listContent = [];
    var randNumSet = new Set(); 
    var outputString = ""; 

    var inputString = document.getElementById("listInput").value;

    //Saves information to chrome storage
    chrome.storage.sync.set({"input": inputString});

    //Convert the inputed string into arrays of content split by breaks in the textarea
    while (inputString.indexOf("\n") != -1) {
        var tempStr = inputString.substring(0, inputString.indexOf("\n"));
        listContent.push(tempStr);
        inputString = inputString.substring(inputString.indexOf("\n") + 1)
    }

    listContent.push(inputString);

    //Randomly sort the contents into a string for output
    while (listContent.length != randNumSet.size) {
        var randNum =  Math.floor(Math.random() * listContent.length); 
        if (!randNumSet.has(randNum)) {
            randNumSet.add(randNum);  
            outputString += listContent[randNum] + "\n"; 
        }
    }

    document.getElementById("listOutput").value = outputString;

    //Saves information to chrome storage
    chrome.storage.sync.set({"output": outputString});
}