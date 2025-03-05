const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");
const Song = require('./songModel')
const Setlist = require('./setModel')

const Playlist = sequelize.define('playlist', {
    disposition: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Song,
            key: "id"
        },
    },
    setlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Setlist,
            key: "id"
        },
    }
}, {
    timestamps: false,

}, {
    indexes: [
        {
            unique: true,
            fields: ["setlist_id", "disposition"], // Unique inex in both
        },
    ],
});

module.exports = Playlist;