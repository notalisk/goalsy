const router = require('express').Router();
const path = require('path');
const { Account, Bag, Bank, Character, Inventory, Item_category, Item, Rarity, Shop, Task_category, Task } = require('../models');
const sequelize = require('../config/connection');
const { withAuth } = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/profile', async (req, res) => {
    try {
        const characterData = await Character.findAll({
            where: {
                id: 1
            },
            include: [
                {
                    model: Account,
                }
            ]
        });

        const taskData = await Task.findAll({
            where: {
                character_id: 1
            }
        });

        const tasks = taskData.map(task => task.get({ plain: true }));

        const character = characterData.map(character => character.get({ plain: true }));

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


module.exports = router;