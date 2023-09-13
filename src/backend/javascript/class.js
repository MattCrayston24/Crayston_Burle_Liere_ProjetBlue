class Player {
  constructor(username, alignment, gold, inventory) {
      this.username = username;
      this.alignment = alignment;
      this.gold = gold;
      this.inventory = inventory;
  }
}

class Item {
  constructor(nom, description, price, effet) {
      this.name = nom;
      this.description = description;
      this.price = price;
      this.effet = effet;
  }
}

// Fonction pour formater le nom de l'utilisateur selon les critères spécifiés
function formatUsername(username) {
  return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
}

// Fonction pour créer un joueur en utilisant un formulaire
function createPlayer() {
  const username = document.getElementById('username').value;
  const selectedAlignment = document.querySelector('input[name="alignment"]:checked');
  
  if (!/^[a-zA-Z]{3,16}$/.test(username) || !selectedAlignment) {
      alert("Veuillez remplir tous les champs et sélectionner une réponse pour chaque question.");
      return;
  }

  const formattedUsername = formatUsername(username);
  const alignment = selectedAlignment.value;

  let alignmentBonus = 0;

  if (alignment === "Bon") {
      alignmentBonus = 20;
  } else if (alignment === "Neutre") {
      alignmentBonus = 0;
  } else if (alignment === "Mauvais") {
      alignmentBonus = -20;
  }

  const player = new Player(formattedUsername, alignmentBonus, 100, []);

  console.log("Joueur créé : ", player);
}