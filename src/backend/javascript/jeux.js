fetch('http://localhost:3000/static/evenement.json')
  .then(response => response.json())
  .then(data => {
    const questions = data.questions;
    const questionsDiv = document.querySelector('.questions');
    let questionIndex = 0;
    function afficherQuestion() {
        const questionCourante = questions[questionIndex];
        if (questionCourante) {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = `
                <p>${questionCourante.text}</p>
                <div class="choices">
                ${questionCourante.choices.map(choice => `
                    <button onclick="repondre(${choice.id})">${choice.text}</button>
                `).join('')}
                </div>
            `;
            questionsDiv.innerHTML = '';
            questionsDiv.appendChild(questionElement);
        } else {
            const finMessage = document.createElement('p');
            finMessage.textContent = 'Toutes les questions ont été répondues. Le jeu est terminé.';
            questionsDiv.appendChild(finMessage);
        }
    }

    function repondre(choiceId) {
        const questionCourante = questions[questionIndex];
        if (questionCourante) {
            const choix = questionCourante.choices.find(choice => choice.id === choiceId);
            if (choix) {
                const reponseElement = document.createElement('p');
                reponseElement.textContent = choix.response;
                questionsDiv.appendChild(reponseElement);

                const alignementChange = choix.alignementChange || 0;
                const goldChange = choix.goldChange || 0;

                const alignement = data.baseAlignment; 
                let gold = 500;    
    
                alignementactuel += alignementChange;
                gold += goldChange;
    
                document.querySelector('#alignement').innerHTML = alignementactuel;
                document.querySelector('#gold').innerHTML = gold;
    
                questionIndex++;
                setTimeout(afficherQuestion, 1000);
            }
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
