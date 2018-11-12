const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/koaApp';

mongoose.connect(dbUrl, error => {
    if (error) {
        console.log('数据库连接失败', error);
    } else {
        console.log('数据库连接成功.');
    }
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected success.');
});

mongoose.connection.on('error', () => {
    console.log('MongoDB connected error!');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connected disconnected.');
});

module.exports = mongoose;