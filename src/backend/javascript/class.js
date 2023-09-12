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
