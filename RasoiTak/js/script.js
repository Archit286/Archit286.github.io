$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 992) {
      $("#navbarToggleExternalContent").collapse('hide');
    }
  });
  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

var popular = [];
var database = firebase.database().ref();
database.once('value').then( function(snapshot) {
  database = snapshot.val().posts;
  popular = snapshot.val().popular;
  loadHome();
  loadSide();
});

var homeHtml = "Instance/main-tile.html";
var list = "Instance/list.html";
var post = "Instance/post.html";
var sideBar = "Instance/side-bar.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

var insertList = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  var propString = "";
  for (var i = 0; i < propValue.length; i++) {
    propString += "<li>";
    propString += propValue[i];
    propString += "</li>";
    if(propName === "Method") {
      propString += "<br>";
    }
  }
  string = string
    .replace(new RegExp(propToReplace, "g"), propString);
  return string;
}

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

var loadHome = function() {
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
  	for (var i = 0; i < 7; i++) {

  		var text = "Title " + i;
      var img = "Image " + i;
  		responseText = insertProperty(responseText, text , popular[i]);
      responseText = insertProperty(responseText, img , database[i].image);
  	}
    document.querySelector("#home")
      .innerHTML = responseText;
  },
  false);
};

var loadSide = function() {
$ajaxUtils.sendGetRequest(
  sideBar,
  function (responseText) {
  	for (var i = 1; i < 6; i++) {
  		var text = "Post " + i;
  		responseText = insertProperty(responseText, text , database[database.length - i].Title);
  	}
    document.querySelector("#latest")
      .innerHTML = responseText;
  },
  false);
};

var loadPost = function(title) {
$ajaxUtils.sendGetRequest(
  post,
  function (responseText) {
    for (var i = 0; i < database.length; i++) {
      if (database[i].Title === title) {
        responseText = insertProperty(responseText, "Post Title", database[i].Title);
        responseText = insertProperty(responseText, "Image", database[i].image);
        responseText = insertProperty(responseText, "Caption", database[i].Caption);
        responseText = insertList(responseText, "Ingredients", database[i].Ingredients);
        responseText = insertProperty(responseText, "embedded", database[i].Video);
        responseText = insertList(responseText, "Method", database[i].Method);        
      }
    }
    document.querySelector("#home")
      .innerHTML = responseText;
  },
  false);
};

var loadItem = function(title, cap, img) {
$ajaxUtils.sendGetRequest(
  list,
  function (responseText) {
    responseText = insertProperty(responseText, "Post Title", title);
    responseText = insertProperty(responseText, "Image", img);
    responseText = insertProperty(responseText, "Caption", cap);
    document.querySelector("#home")
      .innerHTML += responseText;
  },
  false);
}

var searchMe = function(str) {
  var inner = "<br><h5>The Search Results for '" + str + "' are: </h5>"
  flag = 0;
  str = str.toLowerCase();
  document.querySelector("#home")
  .innerHTML = inner;
  for (var i = database.length - 1; i >= 0; i--) {
    var head = database[i].Title.search(str);
    var tag = database[i].Tags.find(function(hit){
      return hit == str;
    });
    if(head === str) {
      loadItem(database[i].Title, database[i].Caption, database[i].image);
      flag=1;
    }
    else if(tag === str) {
      loadItem(database[i].Title, database[i].Caption, database[i].image);
      flag=1;
    }
  }
};