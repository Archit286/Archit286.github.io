//console.log(database);
 			(function() {
 				database.push({
					Title: "dope Ice-cream",
    				Caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at elementum nisi. Nulla id sapien ac elit condimentum dignissim. Aenean.",
    				Ingredients: [
    				  "Lorem",
    				  "Ipsum",
    				  "Dolor",
    				  "Sit",
    				  "Amet"
    				],
    				Method: [
    				  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    				  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    				  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    				  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    				  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    				  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    				],
    				Video: "Embedded link here",
    				Tags: [
    				  "Ice-cream"
    				]
				})
			firebase.database().ref('/posts/').update(database);
			})();