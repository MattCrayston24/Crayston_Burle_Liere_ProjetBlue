const questionsDiv = document.querySelector('.questions');
let questionIndex = 0;

function afficherQuestion() {
  fetch("../evenement.json")
    .then(response => response.json())
    .then(data => {
      const questions = data.questions;
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
        questionsDiv.innerHTML = ''; // Effacer le contenu précédent
        questionsDiv.appendChild(questionElement);
      } else {
        // Toutes les questions ont été répondues
        const finMessage = document.createElement('p');
        finMessage.textContent = 'Toutes les questions ont été répondues. Le jeu est terminé.';
        questionsDiv.appendChild(finMessage);
      }
    })
    .catch(error => console.error(error));
}

function repondre(choiceId) {
  // Le traitement de la réponse de l'utilisateur peut être ajouté ici, si nécessaire.
  // Pour l'instant, nous n'avons pas de logique de traitement des réponses dans cette version simplifiée.

  questionIndex++;
  afficherQuestion();
}

// Démarrer le jeu en affichant la première question
afficherQuestion();
