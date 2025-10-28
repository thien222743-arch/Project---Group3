const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', email: 'thien222743@student.nctu.vn' },
    { id: 2, name: 'Bob', email: 'thien222743@student.nctu.vn' }
  ]);
});

module.exports = router;