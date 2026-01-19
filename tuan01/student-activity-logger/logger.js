const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {
    log(activity) {
        this.emit('studentActivity', activity);
    }
}

const logger = new Logger();

logger.on('studentActivity', (activity) => {
    const logMessage = `${new Date().toISOString()} - ${activity}\n`;

    fs.appendFile('activity.log', logMessage, (err) => {
        if (err) {
            console.error('Lỗi ghi file:', err);
        }
    });
});

module.exports = logger;