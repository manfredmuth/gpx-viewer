const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const gpxDir = path.join(__dirname, 'public', 'gpx');
  const templatePath = path.join(__dirname, 'public', 'index-template.html');

  fs.readdir(gpxDir, (err, files) => {
    if (err) return res.status(500).send('Fehler beim Lesen der GPX-Dateien.');

    const links = files
      .filter(f => f.endsWith('.gpx'))
      .map(f => `<li><a href="/viewer.html?file=${f}">${f}</a></li>`)
      .join('\n');

    fs.readFile(templatePath, 'utf8', (err, html) => {
      if (err) return res.status(500).send('Fehler beim Laden der Template-Seite.');
      const result = html.replace('{{tracks}}', links);
      res.send(result);
    });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
