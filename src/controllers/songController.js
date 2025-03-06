const Song = require('../models/songModel')

exports.getAllSongs = async (req, res)=>{
    try{
        const songs = await Song.findAll();
        res.status(200).json({
            ststus: 'success',
            data: {
                songs
            }
        })
    }catch(err){
        res.status(500).json({
            ststus: 'error',
            message: err
        })
    }
}

exports.getSong = async (req, res)=>{
    try{
        const song = await Song.findByPk(req.params.id)
        res.status(400).json({
            status: 'Success',
            data: {
                song
            }
        })

    }catch(err){
        res.status(500).json({
            ststus: 'error',
            message: 'this route is not yet defined'
        })
    }
}

exports.createSong = async (req, res)=>{
    try{
        const newSong = await Song.create(req.body)
        res.status(200).json({
            ststus: 'success',
            data: {
                song: newSong,
            },
        })

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
    
}

exports.updateSong = (req, res)=>{
    res.status(500).json({
        ststus: 'error',
        message: 'this route is not yet defined'
    })
}

exports.deleteSong = (req, res)=>{
    res.status(500).json({
        ststus: 'error',
        message: 'this route is not yet defined'
    })
}