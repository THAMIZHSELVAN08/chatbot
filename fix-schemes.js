const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/data/schemes.json', 'utf8'));

data.forEach(scheme => {
  if (scheme.category !== 'Agriculture') {
    scheme.occupations = scheme.occupations.filter(o => o !== 'Farmer');
    if (scheme.occupations.length === 0) {
      scheme.occupations.push('All');
    }
  }
});

fs.writeFileSync('./src/data/schemes.json', JSON.stringify(data, null, 2));
