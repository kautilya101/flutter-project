const csvTojson = require('convert-csv-to-json')
let csv_file = 'output.csv'; 
let json_file = 'json_file.json';

csvTojson.generateJsonFileFromCsv(csv_file,json_file);
