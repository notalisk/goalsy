const router = require('express').Router();
const { Task, Task_category, Character } = require('../../models')

router.post('/addTask', async (req, res) => {
   try {
      const category = await Task_category.findOne({
         where: {
            name: req.body.name
         }
      });

      await Task.create({
         name: req.body.text,
         time: req.body.time,
         category_id: category.dataValues.id,
         character_id: 1
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
      console.log(req.params.id)
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

function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
