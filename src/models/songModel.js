const sequelize = require('sequelize')

const Song = sequelize.define('Song', {
    title: {type: DataTypes.STRING, allowNull: false},
    artist: {type: DataTypes.STRING, allowNull: false},
    duration: {type: DataTypes.INTEGER, allowNull: false},
    tempo: DataTypes.INTEGER,
    song_key: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    notes: DataTypes.STRING
});