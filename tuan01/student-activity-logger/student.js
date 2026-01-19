const logger = require('./logger');

function studentLogin(name) {
    logger.log(`Student ${name} logged in`);
}

function studentSubmitHomework(name) {
    logger.log(`Student ${name} submitted homework`);
}

function studentLogout(name) {
    logger.log(`Student ${name} logged out`);
}

module.exports = {
    studentLogin,
    studentSubmitHomework,
    studentLogout
};