// import all classes
const Account = require('./Account');
const Bag = require('./Bag');
const Bank = require('./Bank');
const Character = require('./Character');
const Inventory = require('./Inventory');
const Item_category = require('./Item_category');
const Item = require('./Item');
const Rarity = require('./Rarity');
const Shop = require('./Shop');
const Task_category = require('./Task_category');
const Task = require('./Task');

// these set up our foreign key constraints, and what to do when the primary key is deleted
Account.hasOne(Character, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE'
});

Character.belongsTo(Account, {
    foreignKey: 'account_id'
});

Character.hasOne(Inventory, {
    foreignKey: 'character_id',
    onDelete: 'CASCADE'
});

Inventory.belongsTo(Character, {
    foreignKey: 'character_id'
});

Character.hasOne(Shop, {
    foreignKey: 'character_id',
    onDelete: 'CASCADE'
});

Shop.belongsTo(Character, {
    foreignKey: 'character_id'
});

Shop.hasMany(Item, {
    foreignKey: 'id',
});

Character.hasOne(Bank, {
    foreignKey: 'character_id',
    onDelete: 'CASCADE'
});

Bank.belongsTo(Character, {
    foreignKey: 'character_id'
});

Item.hasOne(Rarity, {
    foreignKey: 'rarity_id',
});

Item.hasOne(Item_category, {
    foreignKey: 'id',
});

module.exports = { Account, Bag, Bank, Character, Inventory, Item_category, Item, Rarity, Shop, Task_category, Task };