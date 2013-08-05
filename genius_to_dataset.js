/**
 * Application for creating an initial dataset from a Genius domain file.
 *
 * @author Erel Segal-Halevi
 *
 * @since 2013-07
 */

var path = require('path');
var genius = require('./genius');

var read = function(pathToDomain) {
	var domain = new genius.Domain(pathToDomain);
	var issues = domain.issues;
	
	var allValues = {}, duplicateValues = {}; // for detecting duplicate values
	for (var i=0; i<issues.length; ++i) {
		var values = issues[i].item;
		for (var v=0; v<values.length; ++v) {
			var value = values[v].$.value;
			if (value in allValues)
				duplicateValues[value]=true;
			allValues[value]=true;
		}
	}

	var dataset = [];
	for (var i=0; i<issues.length; ++i) {
		var issue = issues[i].$.name;
		var values = issues[i].item;
		for (var v=0; v<values.length; ++v) {
			var value = values[v].$.value;
			dataset.push({input: issue+" "+value, output: '{"Offer": {"'+issue+'": "'+value+'"}}'});
			dataset.push({input: "for "+issue+" I offer "+value, output: '{"Offer": {"'+issue+'": "'+value+'"}}'});
			if (!duplicateValues[value]) {
				dataset.push({input: value, output: '{"Offer": {"'+issue+'": "'+value+'"}}'});
				dataset.push({input: "I offer "+value, output: '{"Offer": {"'+issue+'": "'+value+'"}}'});
			}
		}
	}
	return dataset;
}

var write = function(json) {
	//console.log(JSON.stringify(json, null, "\t"))
	console.log("[");
	for (var i=0; i<json.length; ++i) {
		console.log(
			(i>0? ", ": "  ")+
			JSON.stringify(json[i]));
	}	
	console.log("]");
}

var pathToDomain = path.join(__dirname,'domains','JobCandiate','JobCanDomain.xml');
write(read(pathToDomain));
