const { Food } = require('./food');
const { Item } = require('./item');

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
          console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Picks up an item from the current room into the player's inventory
    const item = this.currentRoom.removeItem(itemName) 
    if (item) {
      this.items.push(item)
      return `${itemName} taken.`
    }
    return `${itemName} is not in the room`
  }

  dropItem(itemName) {
    // Drops an item the player is holding into their current room
    const index = this.items.findIndex(item => item.name === itemName)
     if (index !== -1) {
      const item = this.items.splice(index, 1)[0]
      this.currentRoom.addItem(item)
      return `${itemName} dropped in the room.`
     }
     return `${itemName} is not in your inventory.`
  }

  eatItem(itemName) {
    // Allow the player to eat food items, but not non-food items
    const itemIndex =this.items.findIndex( item => item.name === itemName)
    
    if (itemIndex !== -1) {
    const item = this.items[itemIndex]
     if (item instanceof Food) {
       this.items.splice(itemIndex, 1) 
       console.log(`${this.name} eats the ${itemName}.`)
       return `${itemName} eaten.`
      } else {
        console.log(`${itemName} is not edible.`)
        return `${itemName} is not food.`
      }
    } else {
       console.log(`${itemName} is not in your inventory.`)
       return `${itemName} is not in your inventory.`
    }
  }

  getItemByName(itemName) {
    // Retrieves an item from a player's inventory by item name
     const item = this.items.find(item => item.name === itemName)
    return item || null
  }
}

module.exports = {
  Player
};
