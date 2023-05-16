const router = require('express').Router();
const path = require('path');
const { Shop, Item, Rarity, Item_category } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    res.render('homepage');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/store', async (req, res) => {
    console.log('test');
    try {
        const shopData = await Shop.findAll({
            // include: [
            //     {
            //         model: Item,
            //     },
            //     {
            //         model: Item_category,
            //     },
            //     {
            //         model: Rarity,
            //     }
            // ]
        });

        console.log('checkpoint 2');

        const items = shopData.map((item) => item.get({ plain: true }));

        res.render('store', {
            Shop
        });

    } catch (err) {
        console.log('checkpoint 00');
        //res.status(500).json(err);
    }
});

module.exports = router;