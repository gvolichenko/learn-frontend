function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const formText = document.getElementById('name').value
    Client.checkForName(formText)

    
    postInput('http://localhost:8081/posttext',formText)
    .then(function(){
        const result = getResult();
        return(result);
    })

}

// 'process input and post to server' function
const postInput = async (url= '',userInput) => {
    
    const toPost = {input:userInput};
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPost) // body data type must match "Content-Type" header   
      })
      return 'done posting';
}



// 'get the result and show output' function
const getResult = async () => {
    const request = await fetch('http://localhost:8081/test');
    try{
        const sentimentData = await request.json()
        document.getElementById('text').innerHTML = `Text: ${sentimentData.sentence_list[0].text}`
        document.getElementById('agreement').innerHTML = `Agreement: ${sentimentData.sentence_list[0].agreement}`
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${sentimentData.subjectivity}`
        document.getElementById('irony').innerHTML = `Irony: ${sentimentData.irony}`
        return(sentimentData);
    }
    catch(error) {
        console.log("error",error);
    }
}




export { handleSubmit,getResult,postInput }