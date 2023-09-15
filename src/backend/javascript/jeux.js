let alignementactuel = 0; 
let gold = 500; 
let questionIndex = 0;

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


function changerImageFondQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < backgroundImages.length) {
        setTimeout(() => {
        const mainElement = document.getElementById('bak');
        mainElement.style.backgroundImage = backgroundImages[questionIndex];
        }, 3000);
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


function afficherFelicitation() {
    const felicitationDiv = document.createElement('div');
    felicitationDiv.className = 'felicitation';
    const alignmentLevel = alignementactuel < 0
        ? 'Mort'
        : alignementactuel >= 0 && alignementactuel < 30
        ? 'Mauvais'
        : alignementactuel >= 30 && alignementactuel < 60
        ? 'Bon'
        : 'Dieu';

    felicitationDiv.innerHTML = `
        <h2>Félicitations!</h2>
        <p>Nom: ${document.querySelector('#userName').textContent}</p>
        <p>Pièces d'or: ${gold}</p>
        <p>Niveau d'alignement: ${alignmentLevel}</p>
    `;
    questionsDiv.innerHTML = '';
    questionsDiv.appendChild(felicitationDiv);
}


let canClick = true; 

let alignementactuel = 0;
let gold = 500;
let questionIndex = 0;
let gameLost = false; 


function onChoiceClick(event) {
    if (gameLost) {
        return; 
    }

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

            if (alignementactuel < 0) {
                gameLost = true; 
                const mortDiv = document.createElement('div');
                mortDiv.className = 'mort';
                mortDiv.innerHTML = `
                    <h2>VOUS AVEZ PERDU</h2>
                    <p>Raison : ${choix.deathReason || "Alignement négatif"}</p>
                `;
                questionsDiv.appendChild(mortDiv);

              
                const recommencerButton = document.getElementById('recommencer');
                recommencerButton.style.display = 'block';
                recommencerButton.addEventListener('click', recommencerJeu);
                return;
            } else {
                questionIndex++;
                if (questionIndex < questions.length) {
                    setTimeout(afficherQuestion, 3000); 
                } else {
                    setTimeout(afficherFelicitation, 5000);
                }
                changerImageFondQuestion(questionIndex);
            }
        }
    }
}

function recommencerJeu() {
    alignementactuel = 0;
    gold = 500;
    questionIndex = 0;
    gameLost = false;

    const questionsDiv = document.querySelector('.questions');
    questionsDiv.innerHTML = '';

    const recommencerButton = document.getElementById('recommencer');
    recommencerButton.style.display = 'none';

    afficherQuestion();
    changerImageFondQuestion(questionIndex);
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