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

    if(isNaN(minNum) || minNum.indexOf(".") != -1) 
        document.getElementById("randNumResult").innerHTML = "Minimum must be an INTEGER"; 

    else if(isNaN(maxNum) || maxNum.indexOf(".") != -1) 
        document.getElementById("randNumResult").innerHTML = "Maximum must be an INTEGER"; 
   
    else if (parseInt(minNum) > parseInt(maxNum)) 
        document.getElementById("randNumResult").innerHTML = "Minimum must be LESS than the Maximum"; 
    
    else {
        minNum = parseInt(minNum); 
        maxNum = parseInt(maxNum); 

        var randNum = randNumGenerator(minNum, maxNum).toString(); 

        document.getElementById("randNumResult").innerHTML = randNum;
    } 
}
