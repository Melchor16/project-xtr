const Song = require("../models/songModel");
const APIFeatures = require("../utils/APIFeatures");

exports.getAllSongs = async (req, res) => {
  try {
    const features = new APIFeatures(Song, req.query).filter();
    const songs = await features.execute();
    res.status(200).json({
      status: "success",
      results: songs.length,
      data: {
        songs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

exports.getSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({
        status: "fail",
        message: "Song not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        song,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error: \n" + err,
    });
  }
};

exports.createSong = async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        song: newSong,
      },
    });
  } catch (err) {
    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = err.errors.map((e) => e.message);
      res.status(400).json({
        status: "fail",
        message: "Validation error",
        errors,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
};

exports.updateSong = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

exports.deleteSong = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
