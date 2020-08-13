function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.sentence_list[0].text
    })
}

export { handleSubmit }

// need to post the text to the server
// then the server will make the api call
// inside of a GET route definition 
// first make sure that i can post the text and return it back