const express = require('express');
const router = express.Router();
const upload = require('../../config/multerSetup');
const { 
  newProject,
  postNewProject,
  myProjects,
  allProjects
} = require("../../controllers/project/project.controllers");

router.route('/create-project')
  .get(newProject)
  .post(upload.single('projectImage'), postNewProject);

router.route('/my-projects')
  .get(myProjects);

router.route('/all-projects')
  .get(allProjects);

module.exports = router; 