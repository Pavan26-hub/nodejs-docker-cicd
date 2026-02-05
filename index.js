const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Version 2 deployed via Jenkins CI/CD----111111');
});

/**
 * IMPORTANT:
 * Server should start only when run directly,
 * NOT when imported by test files
 */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

module.exports = app;

