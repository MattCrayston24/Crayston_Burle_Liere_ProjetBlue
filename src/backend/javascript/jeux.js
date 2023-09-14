const questions = [
    {
        question: "Votre village est en feu, il faut partir !",
        choices: ["Partir le plus vite possible en courant", "Essayer de sauver son cheval et partir avec celui ci."],
        correctAnswer: "Essayer de sauver son cheval et partir avec celui ci."
    },
    {
        question: "Il fait nuit, vous devez vous rendre au plus vite à la contée la plus proche.",
        choices: ["Camper sur place dans cette forêt lugubre.", "Continuer à marcher de nuit, avec les animaux inconnus de cette forêt."],
        correctAnswer: "Camper sur place dans cette forêt lugubre."
    },
 
];

let currentQuestion = 0;

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        alert("Bonne réponse !");
    } else {
        alert("Mauvaise réponse. La réponse correcte est : " + questions[currentQuestion].correctAnswer);
    }


    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    } else {
        alert("Félicitations, vous avez terminé le jeu !");
       }
}

function displayQuestion(questionIndex) {
    const questionContainer = document.querySelector('.questions');
    questionContainer.innerHTML = `<h2>Faîtes votre choix paysan ! Mission :${questionIndex + 1}</h2>
        <p>${questions[questionIndex].question}</p>
        <button onclick="checkAnswer('${questions[questionIndex].choices[0]}')">${questions[questionIndex].choices[0]}</button>
        <button onclick="checkAnswer('${questions[questionIndex].choices[1]}')">${questions[questionIndex].choices[1]}</button>`;
}

displayQuestion(currentQuestion);