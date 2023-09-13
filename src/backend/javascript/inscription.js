class Player {
    constructor(name) {
        this.name = name;
        this.baseAlignment = 20; // Initialisez le nombre d'alignement de base à 20.
    }
}

function createPlayer() {
    const enteredUsername = document.querySelector('input[type="text"]').value;
    const selectedAlignmentValues = [];
    let selectedObject = null;

    for (let i = 1; i <= 3; i++) {
        const alignmentRadioButtons = document.getElementsByName(`alignment${i}`);
        const selectedRadioButton = Array.from(alignmentRadioButtons).find((radioButton) => radioButton.checked);
        
        if (selectedRadioButton) {
            selectedAlignmentValues.push(selectedRadioButton.value);
        }
    }

    const objectRadios = document.querySelectorAll('#object-form input[name="object"]');

    objectRadios.forEach((radio) => {
        if (radio.checked) {
            selectedObject = radio.value;
        }
    });

    if (isValidUsername(enteredUsername) && selectedAlignmentValues.length === 3 && selectedObject) {
        const formattedUsername = formatUsername(enteredUsername);
        const player = new Player(formattedUsername);

        selectedAlignmentValues.forEach((alignmentValue) => {
            if (alignmentValue === 'Bon') {
                player.baseAlignment += 5;
            } else if (alignmentValue === 'Neutre') {
                player.baseAlignment += 0; // Aucun changement d'alignement pour Neutre.
            } else if (alignmentValue === 'Mauvais') {
                player.baseAlignment -= 5;
            }
        });

        document.getElementById('message').textContent = `Joueur créé : ${player.name}`;
        document.getElementById('message').style.color = 'green';
        document.getElementById('alignment-value').textContent = `Alignement : ${player.baseAlignment}`;
        document.getElementById('selected-object').textContent = `Objet choisi : ${selectedObject}`;
    } else {
        document.getElementById('message').textContent = 'Le nom d\'utilisateur n\'est pas valide ou toutes les questions n\'ont pas été répondues ou un objet n\'a pas été choisi.';
        document.getElementById('message').style.color = 'red';
        document.getElementById('alignment-value').textContent = '';
        document.getElementById('selected-object').textContent = '';
    }
}

function isValidUsername(username) {
    const regex = /^[A-Z][a-z]{2,15}$/;
    return regex.test(username);
}

function formatUsername(username) {
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
}