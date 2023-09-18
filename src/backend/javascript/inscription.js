class Player {
    constructor(name) {
        this.name = name;
        this.baseAlignement = 20; 
    }
}

function createPlayer() {
    const enteredUsername = document.querySelector('input[type="text"]').value;
    const selectedAlignementValues = [];
    let selectedObject = null;

    for (let i = 1; i <= 3; i++) {
        const AlignementRadioButtons = document.getElementsByName(`Alignement${i}`);
        const selectedRadioButton = Array.from(AlignementRadioButtons).find((radioButton) => radioButton.checked);

        if (selectedRadioButton) {
            selectedAlignementValues.push(selectedRadioButton.value);
        }
    }

    const objectRadios = document.querySelectorAll('#object-form input[name="object"]');

    objectRadios.forEach((radio) => {
        if (radio.checked) {
            selectedObject = radio.value;
        }
    });

    if (isValidUsername(enteredUsername) && selectedAlignementValues.length === 3 && selectedObject) {
        const formattedUsername = formatUsername(enteredUsername);
        const player = new Player(formattedUsername);

        selectedAlignementValues.forEach((AlignementValue) => {
            if (AlignementValue === 'Bon') {
                player.baseAlignement += 5;
            } else if (AlignementValue === 'Neutre') {
                player.baseAlignement += 0; 
            } else if (AlignementValue === 'Mauvais') {
                player.baseAlignement -= 5;
            }
        });

        fetch('http://localhost:3000/storeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }
            return response.text();
        }).then(data => {
            document.getElementById('message').textContent = data;
            document.getElementById('message').style.color = 'green';

            window.location.href = "http://localhost:3000/jeux"; 
        }).catch(error => {
            console.error(error);
            document.getElementById('message').textContent = 'Une erreur s\'est produite lors de l\'envoi des données au serveur';
            document.getElementById('message').style.color = 'red';
        });

        document.getElementById('Alignement-value').textContent = `Alignement : ${player.baseAlignement}`;
        document.getElementById('selected-object').textContent = `Objet choisi : ${selectedObject}`;
    } else {
        document.getElementById('message').textContent = 'Le nom d\'utilisateur n\'est pas valide ou toutes les questions n\'ont pas été répondues ou un objet n\'a pas été choisi.';
        document.getElementById('message').style.color = 'red';
        document.getElementById('Alignement-value').textContent = '';
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