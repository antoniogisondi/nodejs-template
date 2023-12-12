const { MongoClient } = require('mongodb');
const { EventEmitter } = require('events');

class DbConnection extends EventEmitter {

    mongoClient = new MongoClient(
        'mongodb+srv://gianluca:gianluca123@maestro-node.3elmg.mongodb.net/passport?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    getConnection() {
        this.mongoClient.connect((err, mongodb) => {
            if (err) throw err;
            this.emit('dbConnection', {
                db: this.mongoClient.db('passport')
            });
            DbConnection.setInstance(mongodb);
        })
    }

    static setInstance(mongodb) {
        DbConnection.db = mongodb.db('passport');
        DbConnection.userCollection = DbConnection.db.collection('user');
    }
}

module.exports = DbConnection;