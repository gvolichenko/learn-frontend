function checkForName(inputText) {
    //console.log("::: Running checkForName :::", inputText);
    /*
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ] 

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
    */
   if(/\d/.test(inputText)){
    alert("Please check that your input does not contain numbers")
       return('firing an alert');
   }
   if(inputText==""){
    alert("Please check that your input is not empty")
       return('firing an alert');
   }
}

export { checkForName }
