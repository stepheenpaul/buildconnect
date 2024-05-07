const { User } = require('../../models/user');

module.exports = {
    viewUser: async (req, res) => {
        let { userId } = req.query;
    },

    blockUser: async (req, res) => {
        let { userId } = req.query;
    },

    unblockUser: async (req, res) => {
        let { userId } = req.query;
    }
}