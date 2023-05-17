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
        //console.log(shopData);

        const items = shopData.map((item_id) => item_id.get({ plain: true }));
        console.log(JSON.stringify(items));

        res.render('store', {items});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;