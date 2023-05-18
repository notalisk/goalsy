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

// async function for router to get profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const findAccount = await Account.findOne({
            where: {
                username: req.session.username
            }
        })

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

        const tasks = taskData.map(task => task.get({ plain: true }));
        const categories = await Task_category.findAll();

        const category = categories.map(category => category.get({ plain: true }));

        const category1 = category[0];
        const category2 = category[1];
        const category3 = category[2];
        const category4 = category[3];
        const category5 = category[4];

        res.render('profile', { character, category1, category2, category3, category4, category5, tasks, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// function for router to get shop information
router.get('/shop', async (req, res) => {
    Shop.findAll({
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
    })
        .then(shopData => {
            const items = shopData.map((item_id) => item_id.get({ plain: true }));

            res.render('store', { items });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;