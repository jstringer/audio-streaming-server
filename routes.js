const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

const streamingRoute = express.Router();
const metadataRoute = express.Router();

//Test database - in production this would of course be in a separate Docker container
//or another hosted service
const db = new sqlite3.Database('./db/tracks.db');

//GET a single track by it's name
streamingRoute.get('/:track', (req, res) => {
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  //Select a track by its name from the database
  db.get(`SELECT name FROM tracks WHERE name = ?`, [req.params.track], (err, row) => {
    if (err) {
      res.status(404).send(err.message);
    }
    else {
      if (row.name === undefined) {
        res.status(404).send('No track by that name');
      }
      //If the track exists, locate it in the asset folder and start writing it to the stream
      //TODO - add a 'path' column to the db and retrieve the track from a CDN or some other storage
      else {
        const audio = fs.createReadStream(path.join('./assets/tracks/', row.name));
        audio.on('data', chunk => {
          res.write(chunk);
        });
        audio.on('end', () => {
          res.end();
        });
        audio.on('error', (error) => {
          res.status(404).send(error);
        }); 
      }
    }
  })
});

//POST a new track to the CDN. Needs to add the track to the assets folder (cdn)
//and extract the metadata for the database.
streamingRoute.post('/', (req, res) => {

})

//GET metadata for all tracks in db
//TODO - This could be set up as a websocket so any time a track is added, its metadata is reflected
//back to the client
metadataRoute.get('/', async (req, res) => {
  const metadata = [];
  db.all('SELECT name, artist FROM tracks', [], (err, rows) => {
    if (err) {
      res.status(404).send(err.message);
    }
    else {
      rows.forEach((row) => {
        metadata.push({ 'name': row.name, 'artist': row.artist });
      })
      res.status(200).json(metadata);
    }
  })
});

module.exports = { streamingRoute, metadataRoute }