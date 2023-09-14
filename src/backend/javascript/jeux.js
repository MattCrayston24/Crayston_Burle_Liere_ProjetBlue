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
                questionIndex++;
                setTimeout(afficherQuestion, 1000); // Afficher la prochaine question après un délai d'1 seconde (vous pouvez ajuster le délai selon vos besoins)
            }
        }
    }

    afficherQuestion();
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier JSON :', error);
  });
