const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const fs = require('fs');
const csv = require('fast-csv');
const { format } = require('@fast-csv/format');
const { writeToString } = require('@fast-csv/format');
const router = express.Router();
const robberyHelperController = require('../controllers/robberyHelperController');

router.get('/robberyOptimization', robberyHelperController.getRobberyOptimization)

router.post('/robberyOptimization', upload.single('file'), function (req, res) {
  const fileRows = [];
  const kg = parseInt(req.query.kg);
  csv.parseFile(req.file.path)
    .on("data", function (data) {
      const row = {
        label: data[0],
        price: parseInt(data[1]),
        weight: data[2]
      }
      fileRows.push(row);
    })
    .on("end", function () {
      fs.unlinkSync(req.file.path);

      var sortedRows = fileRows.sort(({price:a}, {price:b}) => b-a);
      const objectsToRobb = []
      var totalWeight = 0;

      sortedRows.forEach(row => {
        if (totalWeight + row.weight <=  kg) {
          objectsToRobb.push(row)
          totalWeight += row.weight
        }
      })

      writeToString(objectsToRobb).then(data => res.status(200).send(objectsToRobb));
    })
});

module.exports = router;
