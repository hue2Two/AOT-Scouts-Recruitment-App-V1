console.log("testing: script.js")

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/getAll')
    //.then is await
    .then(response => response.json())
    .then(data => console.log("data: " + JSON.stringify(data)))
})

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.attackontitanapi.com/characters')
    .then(res => res.json())
    .then(data => {
        console.log("attack on titan api: " + JSON.stringify(data.results[0].name))
    })
})

const myForm = document.getElementById("quizForm")
let userInput_quiz = []

myForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent refresh
    const formData = new FormData(myForm)
    console.log("form data on submit:" + JSON.stringify(formData))

    for (let item of formData) {
        console.log(item[0] + " : " +  item[1])
        userInput_quiz.push(item[1])
    }

    fetch('http://localhost:8000/quizSubmission', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "quizData": userInput_quiz
        })
    })
    .then(response => response.json())
    .then(data => data)

    userInput_quiz = []
})

const scoutSignup = document.getElementById("scoutSignup")
let scoutSignupArray = []

scoutSignup.addEventListener('submit', (e) => {
    e.preventDefault() //prevent default way of submit
    const scoutFormData = new FormData(scoutSignup) //form k,v pairs

    // Convert FormData into an object
    let object = {};
    scoutFormData.forEach((value, key) => {
        object[key] = value;
    });
    
    // Now you can stringify the object
    console.log("scout form on submit:", JSON.stringify(object));
    console.log(`scout form data: ${scoutFormData}`)

    for (let item of scoutFormData) {
        console.log(item[0], item[1])
        scoutSignupArray.push(item[1])
    }

    console.log(`scout input array: ${scoutSignupArray}`)

    fetch('http://localhost:8000/scoutFormSubmission', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "scoutFormInfo": scoutSignupArray
        })
    })
    .then(res => res.json())
    .then(data => data)

    
})