const router = require('express').Router();
const { Task, Task_category } = require('../../models')

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

      // Send a JSON response indicating success
      res.json({ message: 'Task added successfully' });

   } catch (err) {
      res.status(500).json({ error: 'An error occurred while adding the task' });
   }
});

router.delete('/tasks/:id', async (req, res) => {
   console.log(req.params)
    Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbTaskData => {
        res.json(dbTaskData)
    })
});

module.exports = router;
