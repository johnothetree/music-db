var express = require("express");
var app = express();
const stringify = require('csv-stringify');
const csv = require('csv-parser');  
const fs = require('fs');
const cors = require('cors');
const columns = [
		{key:'date', header:'date'},
		{key:'band', header:'band'},
		{key:'album', header:'album'},
		{key:'johnoNotables', header:'johnoNotables'}
	];

const csvLocation = 'aoty.csv';

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.route('/list')
	.get(function(req, res) {
		var list = [];
		fs.createReadStream(csvLocation)  
			.pipe(csv())
			.on('data', (row) => {
				list.push(row);
			})
			.on('end', () => {
				console.log("CSV read-in complete");
				res.json(list);
			});
	})
	.post(function(req, resp) {
		console.log(req.body);
		// csvWriter  
		// 	.writeRecords(req.body)
		// 	.then(()=> console.log('The CSV file was written successfully'));
		// resp.json("complete");

		stringify(req.body, { header: true, columns: columns }, (err, output) => {
			if (err) throw err;
			fs.writeFile(csvLocation, output, (err) => {
				if (err) throw err;
				console.log(csvLocation + ' saved.');
			});
		});
	});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});