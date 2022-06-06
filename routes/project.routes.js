const router = require("express").Router();
const mongoose = require("mongoose");

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');
const { route } = require("./index.routes");

router.post('/projects', (req,res,next) => {
    const { title, description } = req.body;

    Project.create({ title, description, tasks: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

router.get('/projects', (req,res,next) => {
    Project.find()
        .populate('tasks')
        .then(allProjects => res.json(allProjects))
        .catch(err => res.json(err));
});

router.get('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid'});
    }

    Project.findById(projectId)
        .populate('tasks')
        .then(project => res.status(200).json(project))
        .catch(err => res.json(err));
});

router.put('/projects/:projectId', (req,res,next) => {
    const { projectId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid'});
    }
// req.body in this case is what is being updated. The title and/or description of this project(projectId).
// The "new: true" allows us to get the updated version of this project document.
    Project.findByIdAndUpdate(projectId, req.body, { new: true })
        .then(updatedProject => res.json(updatedProject))
        .catch(err => res.json(err));
})

router.delete('/projects/:projectId', (req,res,next) => {
    const { projectId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid'});
    }

    Project.findByIdAndRemove(projectId)
        .then(() => res.json({ message: `Project with ${projectId} has been removed successfully.`}))
        .catch(err => res.json(err))
})


// SERVER ROUTES / ENDPOINTS TO ADD

// HTTP verb      URL                         REQUEST BODY      ACTION

// POST           /api/projects               JSON              Creates a new project
// GET            /api/projects               (empty)           Returns all the projects
// GET            /api/projects/:projectId    (empty)           Returns the specified project
// PUT            /api/projects/:projectId    JSON              Edits the specified project
// DELETE         /api/projects/:projectId    (empty)           Deletes the specified project

// POST           /api/tasks                  JSON              Creates a new task



module.exports = router;