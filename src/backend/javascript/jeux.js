let alignementactuel = 0; // Définir alignementactuel globalement
let gold = 500; // Définir gold globalement
let questionIndex = 0; // Définir questionIndex globalement

const backgroundImages = [
    'url(../img/event1.jpg)',
    'url(../img/event2.jpg)',
    'url(../img/event3.jpg)',
    'url(../img/event4.jpg)',
    'url(../img/event5.jpg)',
    'url(../img/event6.jpg)',
    'url(../img/event7.jpg)',
    'url(../img/event8.jpg)',
    'url(../img/event9.jpg)',
    'url(../img/event10.jpg)',
    'url(../img/event11.jpg)',
];

// ...

function changerImageFondQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < backgroundImages.length) {
        const mainElement = document.getElementById('bak');
        mainElement.style.backgroundImage = backgroundImages[questionIndex];
    }
}

fetch('http://localhost:3000/static/evenement.json')
  .then(response => response.json())
  .then(data => {
    const questions = data.questions;
    const questionsDiv = document.querySelector('.questions');
    
    function afficherQuestion() {
        const questionCourante = questions[questionIndex];
        if (questionCourante) {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = `
                <p>${questionCourante.text}</p>
                <div class="choices">
                ${questionCourante.choices.map(choice => `
                    <button data-choice="${choice.id}">${choice.text}</button>
                `).join('')}
                </div>
            `;
            questionsDiv.innerHTML = '';
            questionsDiv.appendChild(questionElement);
           
            const choiceButtons = questionElement.querySelectorAll('button');
            choiceButtons.forEach(button => {
                button.addEventListener('click', onChoiceClick);
            });
        } else {
            const finMessage = document.createElement('p');
            finMessage.textContent = 'Toutes les questions ont été répondues. Le jeu est terminé.';
            questionsDiv.appendChild(finMessage);
        }
    }

function onChoiceClick(event) {
    const choiceId = parseInt(event.target.getAttribute('data-choice'));
    const questionCourante = questions[questionIndex];
    if (questionCourante) {
        const choix = questionCourante.choices.find(choice => choice.id === choiceId);
        if (choix) {
            const reponseElement = document.createElement('p');
            reponseElement.textContent = choix.response;
            questionsDiv.appendChild(reponseElement);

            const alignementChange = choix.alignementChange || 0;
            const goldChange = choix.goldChange || 0;

            alignementactuel += alignementChange;
            gold += goldChange;

            document.querySelector('#alignement').innerHTML = alignementactuel;
            document.querySelector('#gold').innerHTML = gold;

            questionIndex++;
            setTimeout(afficherQuestion, 2000);
        }
        changerImageFondQuestion(questionIndex);
    }
}

    afficherQuestion();
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier JSON :', error);
  });

fetch('http://localhost:3000/static/playerData.json').then(
    res => res.json()
).then(data => {
    document.querySelector('#userName').innerHTML = data.name
    document.querySelector('#alignement').innerHTML = data.baseAlignment
    
}).catch(err => {
    console.log("Oupsss une err avec la lecture de playerData.json")
})