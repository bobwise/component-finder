var fs = require('fs');

var htmlPath = 'html/components/';
var angularPath = 'angular/projects/spark-angular/src/lib/';
var reactPath = 'react/src/'

var htmlCSSFiles = [];
var htmlStoryFiles = [];

// TODO this can be rewritten to be more flexible. I didn't do that because ur html folder is flat
fs.readdir(htmlPath, function (err, items) {
  for (var i = 0; i < items.length; i++) {

    if (items[i].indexOf('.scss') > 0){
      htmlCSSFiles.push(items[i].replace('_', '').replace('s.scss', '').replace('.scss', '').toLowerCase());
    } else if (items[i].indexOf('.stories.js') > 0) {
      htmlStoryFiles.push(items[i].replace('.stories.js', '').toLowerCase());
    }
  }

  console.log("")
  console.log("=====================================")
  console.log("Things that look like HTML components")
  console.log("=====================================")
  var allHtml = [];
  for (var i = 0; i < htmlCSSFiles.length; i++){
    allHtml.push(htmlCSSFiles[i]);
  }
  for (var i = 0; i < htmlStoryFiles.length; i++){
    if (allHtml.indexOf(htmlStoryFiles[i]) === -1) {
      allHtml.push(htmlStoryFiles[i]);
    }
  }

  console.log(allHtml.sort());
});


// ANGULAR

var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {

          if (path.basename(file).indexOf('.stories.ts') !== -1 || path.basename(file).indexOf('.spec') !== -1){


            // TODO filter out things like monetary formatter, ordered-list, selection-container...

            var name = path.basename(file)
            .replace('.stories.ts', '')
            .replace('sprk-', '')
            .replace('.directive.spec.ts','')
            .replace('.component.spec.ts','')
            .toLowerCase()

            if (!results.includes(name)){
              results.push(name);
            }
          }
          next();
        }
      });
    })();
  });
};

var firstArray = [];
var secondArray = [];

function handleAngularThings(){
  if (firstArray.length === 0) { return; }
  if (secondArray.length === 0) { return; }

  console.log("")
  console.log("=====================================")
  console.log("Things that look like Angular components")
  console.log("=====================================")

  var allAngular = [];
  for (var i = 0; i < firstArray.length; i++){
    allAngular.push(firstArray[i]);
  }
  for (var i = 0; i < secondArray.length; i++){
    if (allAngular.indexOf(secondArray[i]) === -1) {
      allAngular.push(secondArray[i]);
    }
  }

  console.log(allAngular.sort())
}

walk(angularPath + "/components", function(err, results) {
  if (err) throw err;
  firstArray = results;
  handleAngularThings();
});

walk(angularPath + "/directives", function(err, results) {
  if (err) throw err;
  secondArray = results;
  handleAngularThings();
});


// React

var reactWalk = function(dir, done) {

  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          reactWalk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {

          if (path.basename(file).indexOf('.stories.js') !== -1){

            var name = path.basename(file)
            .replace('.stories.js', '')
            .replace('Sprk', '')
            .toLowerCase()

            if (!results.includes(name)){
              results.push(name);
            }
          }
          next();
        }
      });
    })();
  });
};

function handleReactThings(results){
  console.log("")
  console.log("=====================================")
  console.log("Things that look like React components")
  console.log("=====================================")

  console.log(results.sort())
}

reactWalk(reactPath, function(err, results) {
  if (err) throw err;
  handleReactThings(results);
});