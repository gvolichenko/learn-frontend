function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    //fetch('http://localhost:8081/posttext',)
    /*
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.sentence_list[0].text
    }) */
    
    const inputText = document.getElementById('name').value;

    postInput('http://localhost:8081/posttext',inputText)
    .then(function(){
        console.log('getting the result')
        getResult()
    })

}

// 'process input and post to server' function
const postInput = async (url= '',userInput) => {
    
    Client.checkForName(userInput)
    const toPost = {input:userInput};
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPost) // body data type must match "Content-Type" header   
      })
      try {
          console.log("input posted")
       // const newDataObj = await response.json();
       // return newDataObj;
      }catch(error) {
      console.log("error", error);
      }
}



// 'get the result and show output' function
const getResult = async () => {
    const request = await fetch('http://localhost:8081/test');
    try{
        const sentimentData = await request.json()
        console.log('populating results')
        document.getElementById('text').innerHTML = sentimentData.sentence_list[0].text
        document.getElementById('agreement').innerHTML = sentimentData.sentence_list[0].agreement
        document.getElementById('subjectivity').innerHTML = sentimentData.subjectivity
        document.getElementById('irony').innerHTML = sentimentData.irony
    }
    catch(error) {
        console.log("error",error);
    }
}




export { handleSubmit }

// need to post the text to the server
// then the server will make the api call
// inside of a GET route definition 
// first make sure that i can post the text and return it back