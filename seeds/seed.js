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
        individualHooks: true,
        returning: true,
    });

    await Bag.bulkCreate(bagData, {
        individualHooks: true,
        returning: true,
    });

    await Item_category.bulkCreate(item_categoryData, {
        individualHooks: true,
        returning: true,
    });

    await Task_category.bulkCreate(task_categoryData, {
        individualHooks: true,
        returning: true,
    });
    
    await Item.bulkCreate(itemData, {
        individualHooks: true,
        returning: true,
    });
    
    await Character.bulkCreate(characterData, {
        individualHooks: true,
        returning: true,
    });

    await Inventory.bulkCreate(inventoryData, {
        individualHooks: true,
        returning: true,
    });

    await Shop.bulkCreate(shopData, {
        individualHooks: true,
        returning: true,
    });

    await Task.bulkCreate(taskData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
