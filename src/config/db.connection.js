const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mrRobot:mrRobot123@cluster0.f2bamio.mongodb.net/?retryWrites=true&w=majority')
                .then(db => console.log('DB is connected'))
                .catch(err => console.error(err));