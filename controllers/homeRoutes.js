// requiring express for router. importing variables
const router = require('express').Router();
const { Account, Bag, Bank, Character, Inventory, Item_category, Item, Rarity, Shop, Task_category, Task } = require('../models');
const { withAuth } = require('../utils/auth');

// async function to get router and render homepage
router.get('/', async (req, res) => {
    res.render('homepage');
});

// async function for router to get login
router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/avatar', async (req, res) => {
    res.render('draw');
});

// async function for router to get profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const findAccount = await Account.findOne({
            where: {
                username: req.session.username
            }
        });

        const characterData = await Character.findAll({
            where: {
                account_id: findAccount.dataValues.id
            },
            include: [
                {
                    model: Account,
                }
            ]
        });

        const character = characterData.map(character => character.get({ plain: true }));
        const correctCharId1 = character[0].id;

        const taskData = await Task.findAll({
            where: {
                character_id: correctCharId1
            },
        });

        const inventoryData = await Inventory.findAll({
            where: {
                character_id: correctCharId1
            }
        });

        const inventory = inventoryData.map(inventory => inventory.get({ plain: true }));
        
        const itemIds = [];
        if (inventory) {
            for (const el of inventory) {
                itemIds.push(el.item_id);
            }
        }

        const itemData = await Item.findAll({
            where: {
                id: itemIds
            }
        });

        const items = itemData.map(item => item.get({ plain: true }))

        const tasks = taskData.map(task => task.get({ plain: true }));
        const categories = await Task_category.findAll();

        const category = categories.map(category => category.get({ plain: true }));

        const category1 = category[0];
        const category2 = category[1];
        const category3 = category[2];
        const category4 = category[3];
        const category5 = category[4];

        res.render('profile', { character, category1, category2, category3, category4, category5, tasks, items, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// function for router to get shop information
router.get('/shop', withAuth, async (req, res) => {
    try {
        const findAccount = await Account.findOne({
            where: {
                username: req.session.username
            }
        });

        const characterData = await Character.findAll({
            where: {
                account_id: findAccount.dataValues.id
            },
            include: [
                {
                    model: Account,
                }
            ]
        });

        const shopData = await Shop.findAll({
            include: [
                {
                    model: Item,
                    include: [
                        {
                            model: Rarity,
                        },
                        {
                            model: Item_category,
                        },
                    ]
                }
            ]
        });

        const character = characterData.map(character => character.get({ plain: true }));

        console.log(character);

        const characterGold = character[0].gold;
        const username = character[0].account.username;

        console.log(username);

        const items = shopData.map(item_id => item_id.get({ plain: true }));

        res.render('store', { items, characterGold, username });

    } catch (err) {
        console.log(err);
    }
    // Shop.findAll({
    //     include: [
    //         {
    //             model: Item,
    //             include: [
    //                 {
    //                     model: Rarity,
    //                 },
    //                 {
    //                     model: Item_category,
    //                 },
    //             ]
    //         }
    //     ]
    // })
    //     .then(shopData => {
    //         const items = shopData.map((item_id) => item_id.get({ plain: true }));

    //         res.render('store', { items });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
});

module.exports = router;