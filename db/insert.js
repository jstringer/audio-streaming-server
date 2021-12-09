const sqlite3 = require('sqlite3');
const mm = require('music-metadata');

const db = new sqlite3.Database('./tracks.db');

mm.parseFile('../assets/tracks/AlienMode.ogg').then(metadata => {
  let data = ['Pearson Sound', 'AlienMode.ogg'];
  let sql = `UPDATE tracks SET artist = ? WHERE name = ?`;
  db.run(sql, data, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows updated: ${this.changes}`);
  });
});

mm.parseFile('../assets/tracks/Cobwebs.ogg').then(metadata => {
  let data = ['Pearson Sound', 'Cobwebs.ogg'];
  let sql = `UPDATE tracks SET artist = ? WHERE name = ?`;
  db.run(sql, data, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows updated: ${this.changes}`)
  });
});