const Song = require('../models/songModel')
const Setlist = require('../models/setModel')
const Playlist = require('../models/playlistModel')

const modelRelations = ()=>{
    Song.belongsToMany(Setlist, {
        through: Playlist,
        foreignKey: "songId",
        otherKey: "setlistId",
    })
    Setlist.belongsToMany(Song, {
        through: Playlist,
        foreignKey: "setlistId", 
        otherKey: "songId",
    })
}

module.exports = modelRelations