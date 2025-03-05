const Song = require('../models/songModel')
const Setlist = require('../models/setModel')
const Playlist = require('../models/playlistModel')

const modelRelations = ()=>{
    Song.belongsToMany(Setlist, {
        through: Playlist,
        foreignKey: "song_id",
        otherKey: "setlist_id",
    })
    Setlist.belongsToMany(Song, {
        through: Playlist,
        foreignKey: "setlist_id",
        otherKey: "song_id"
    })
}

module.exports = modelRelations