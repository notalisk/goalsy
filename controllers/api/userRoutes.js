const router = require('express').Router();
const { Account, Bag, Bank, Character, Inventory, Item_category, Item, Rarity, Shop, Task_category, Task } = require('../../models');

router.post('/', async (req, res) => {
   try {
      const accountData = await Account.create(req.body);

      const characterData = await Character.create({
         account_id: accountData.dataValues.id
      });

      const inventoryData = await Inventory.create({
         character_id: characterData.dataValues.id
      })

      req.session.save(() => {
         req.session.username = accountData.username;
         req.session.logged_in = true;

         res.status(200).json(accountData);
      });
   } catch (err) {
      res.status(400).json(err);
   }
});

router.post('/login', async (req, res) => {
   try {
      const userData = await Account.findOne({ where: { username: req.body.username } });

      if (!userData) {
         res
            .status(400)
            .json({ message: "Incorrect username or password, please try again!" });
         return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
         res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again!' });
         return;
      }

      req.session.save(() => {
         req.session.username = userData.username;
         req.session.logged_in = true;

         res.json({ user: userData, message: 'You are now logged in!' });
      });

   } catch (err) {
      res.status(400).json(err);
   }
});

router.post('/logout', (req, res) => {
   if (req.session.logged_in) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
});

router.post('/addTask', async (req, res) => {
   try {
      const category = await Task_category.findOne({
         where: {
            name: req.body.name
         }
      });

      const account = await Account.findOne({
         where: {
            username: req.session.username
         }
      });

      const character = await Character.findOne({
         where: {
            account_id: account.dataValues.id
         }
      });

      await Task.create({
         name: req.body.text,
         time: req.body.time,
         category_id: category.dataValues.id,
         character_id: character.dataValues.id
      });

      res.json({ message: 'Task added successfully' });

   } catch (err) {
      res.status(500).json({ error: 'An error occurred while adding the task' });
   }
});

router.delete('/tasks/:id', async (req, res) => {
   Task.destroy({
      where: {
         id: req.params.id
      }
   }).then(dbTaskData => {
      res.json(dbTaskData)
   })
});

router.put('/tasks/:id', async (req, res) => {
   try {
      const task = await Task.findOne({
         where: {
            id: req.params.id,
         }
      });

      const taskObject = task.toJSON();

      const character = await Character.findOne({
         where: {
            id: taskObject.character_id
         }
      });

      const characterObject = character.toJSON();
      characterObject.gold += 5;
      characterObject.xp += 10;

      if (characterObject.xp >= 50) {
         characterObject.xp -= 50;
         characterObject.level += 1;
         characterObject.perception += getRandomNumber(1, 5);
         characterObject.strength += getRandomNumber(1, 5);
         characterObject.intelligence += getRandomNumber(1, 5);
         characterObject.constitution += getRandomNumber(1, 5);
         characterObject.health += getRandomNumber(5, 13)
      }

      const characterUpdate = await Character.update(characterObject, {
         where: {
            id: characterObject.id
         }
      });

      const destroyTask = await Task.destroy({
         where: {
            id: req.params.id,
         }
      })

      res.json(characterUpdate)
   } catch (err) {
      res.status(500).json({ error: 'An error occurred while adding the task' });
   }
});

router.post('/logout', (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
});

router.put('/shop/:item_id', async (req, res) => {
   try {
      // Find item in database
      // const item = await Item.findOne({
      //    where: {
      //       id: req.params.item_id,
      //    }
      // });

      // const newItem = {
      //    item_id: req.params.item_id,
      //    character_id: 1,
      //    quantity: 1,
      // }

      // Find user and inventory
      const inventory = await Inventory.create({
         item_id: req.params.item_id,
         character_id: 1,
         quantity: 1,
      });

      console.log(inventory);
      res.json(inventory);

   } catch (err) {
      res.status(500).json({ error: 'An error occurred while buying the item' });
   }
});

function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;