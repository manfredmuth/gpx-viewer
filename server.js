const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// Dynamische Indexseite mit Links zu GPX-Dateien
app.get('/', (req, res) => {
  const gpxDir = path.join(__dirname, 'public', 'gpx');
  fs.readdir(gpxDir, (err, files) => {
    if (err) return res.status(500).send('Fehler beim Lesen der GPX-Dateien.');

    const links = files
      .filter(f => f.endsWith('.gpx'))
      .map(f => `<li><a href="/viewer.html?file=${f}">${f}</a></li>`)
      .join('\n');

    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>GPX Übersicht</title></head>
        <body>
          <h1>Verfügbare GPX-Tracks</h1>
          <ul>${links}</ul>
        </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`GPX Viewer läuft auf http://localhost:${PORT}`);
});
