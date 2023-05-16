// imports sequelize and models
const sequelize = require('../config/connection');
const { Account, Bag, Character, Item_category, Item, Rarity, Shop, Task_category, Task, Inventory } = require('../models');

// imports .json data to be seeded into db
const accountData = require('./accountData.json');
const bagData = require('./bagData.json');
const characterData = require('./characterData.json');
const item_categoryData = require('./item_categoryData.json');
const itemData = require('./itemData.json');
const rarityData = require('./rarityData.json');
const shopData = require('./shopData.json');
const task_categoryData = require('./task_categoryData.json');
const taskData = require('./taskData.json');
const inventoryData = require('./inventoryData.json')

// seeds db
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Account.bulkCreate(accountData, {
        individualHooks: true,
        returning: true,
    });
    
    await Rarity.bulkCreate(rarityData, {
        returning: true,
    });

    await Bag.bulkCreate(bagData, {
        returning: true,
    });

    await Item_category.bulkCreate(item_categoryData, {
        returning: true,
    });

    await Task_category.bulkCreate(task_categoryData, {
        returning: true,
    });
    
    await Item.bulkCreate(itemData, {
        returning: true,
    });
    
    await Character.bulkCreate(characterData, {
        returning: true,
    });

    await Inventory.bulkCreate(inventoryData, {
        returning: true,
    });

    await Shop.bulkCreate(shopData, {
        returning: true,
    });

    await Task.bulkCreate(taskData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
