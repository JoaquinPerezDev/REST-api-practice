const router = require("express").Router();
const mongoose = require("mongoose");

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

router.post('/tasks', (req,res,next) => {
    const { title, description, projectId } = req.body;

    Task.create({ title, description, project: projectId})
        .then(newTask => {
            return project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } } );
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
})
module.exports = router;