document.addEventListener('DOMContentLoaded', function() {
    var  submitButton = document.getElementById("submit"); 

    submitButton.addEventListener("click", function() {
        main(); 
    });
}); 


function randNumGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString()
}


function main() {
    var minNum = document.getElementById("minNum").value.toString(); 
    var maxNum = document.getElementById("maxNum").value.toString(); 

    //If an invalid interval is given, an error message is displayed
    //If a valid interval is given, a random number is displayed 
    if(isNaN(minNum) || minNum.indexOf(".") != -1) {
        document.getElementById("errorMessage").innerHTML = "Minimum must be an INTEGER"; 

        document.getElementById("randNumResult").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline"; 
    }

    else if(isNaN(maxNum) || maxNum.indexOf(".") != -1) {
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


        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("randNumResult").style.display = "inline";

        document.getElementById("randNumResult").innerHTML = randNum;
    } 
}
