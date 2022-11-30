const Joi = require('joi');

// User schema 
// requires a user to be a CBS student
// secures again SQL-injections
const userSchema = Joi.object({
    // only CBS students can acess the site
    username: Joi.string().email().pattern(new RegExp('student.cbs.dk')).required(),
    password: Joi.string().min(5).max(12).required()
});

module.exports = {
    userSchema,
}