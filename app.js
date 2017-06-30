import './base.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'handlebars/dist/handlebars.js';
//import 'handlebars';
//var Handlebars = require('handlebars');
//import 'handlebars/dist/handlebars.js';
//import 'handlebars/lib/handlebars.runtime.js';

import 'handlebars/dist/handlebars.min.js';
// var Handlebars = require('handlebars');

class App {
	 
	constructor(){
		this.template = require("./main.handlebars"); 
		//console.log(this.template);
		const root = 'https://jsonplaceholder.typicode.com';

		//console.log(handlebars);
		console.log("constructor")
		$.ajax({
		  url: root + '/photos',
		  method: 'GET'
		}).then((data) => {
		  this.formatData(data);
		});
	}


	formatData(data){
		// console.log(data);
		// console.log(jQuery.type(data))
		const onlyLike21 = data.slice(0, 20);
		console.log('test + ' + onlyLike21);
		this.createHTML(onlyLike21);
	};

	// Handlebars.registerHelper("addExcitement", function(excitement){
	// 	var moreExcitement = " !!!";
	// 	return excitement + moreExcitement;
	// });

	createHTML(photosData){

		var source = '{{#each foo}}<p>{{this.bar}}</p>{{/each}}';
console.log('source is: ' + source);
		// console.log('photosData is: ' + photosData)
		// console.log('blah-');
		//var compiledTemplate = Handlebars.compile(this.template);
		var compiledTemplate = Handlebars.compile(source);
		console.log('compiledTemplate is: ' + compiledTemplate)
		//console.log('blah');
		const newHTML = compiledTemplate(photosData);
		//console.log('blah2');
		const photoAlbum = $('#photo-album').html(newHTML);
		//console.log('blah3');
		//console.log('photoAlbum is: ' + photoAlbum);
		//photoAlbum.innerHTML = newHTML;

	};
}

new App();

