const { Project } = require('../../models/project');

module.exports = {
    newProject: async (req, res) => {
        return res.render('pages/project/new-project', { title: '.:: Create New Project'});
    },

    postNewProject: async (req, res) => {
        console.log(req.body)
    },

    myProjects: async (req, res) => {

    },

    allProjects: async (req, res) => {

    },
}