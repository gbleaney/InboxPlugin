include("jquery")
include("https://gist.githubusercontent.com/jabney/d9d5c13ad7f871ddf03f/raw/99b13e7721f8a50ef8b0c1e9c015eca9fb6e9e8f/setOps.js")

var addBin = function(ul) {

	console.debug("Creating UL jQuery object");
	ul = $(ul);
	console.debug(ul);

	console.debug("Finding pin and done objects");
	var pin = $(ul.find("li[class~=action]")[0]);
	console.debug(pin);

	var done = $(ul.find("li[class~=action]")[2]);
	console.debug(done);


	console.debug("Creating bin object from done object");
	var bin = $(done.clone());

	console.debug("Computing common classes to put on bin");
	var pin_classes = pin.attr("class");
	var done_classes = done.attr("class");
	var bin_classes = setOps.intersection(done_classes.split(" "),pin_classes.split(" "));


	// Morph our copy of the done icon to look like the bin icon
	console.debug("Augmenting bin classes");
	bin_classes = bin_classes.join(" ");
	bin_classes += " itemIconTrash";

	console.debug("Augmenting bin classes");
	bin.attr("class", bin_classes);

	console.debug("Updating bin action to trash");
	bin.attr("jsaction", "click:global.trash");

	console.debug("Adding (possibly invalid) 'jsinstance'"); // TODO: figure out what jsinstance really means 
	bin.attr("jsinstance", "4");

	console.debug("Adding (possibly invalid) 'jsinstance'");
	bin.attr("title", "Move to the Bin");


	console.debug("Finding done icon to change to bin");
	var icon = $(bin.children("img")[0]);
	console.debug(icon)

	console.debug("Modifying icon attributes to look like bin");
	icon.attr("alt", "Move to the Bin");
	icon.attr("srcset", icon.attr("srcset").replace("done", "trash").replace("_r4_", "_r1_"));
	icon.attr("src", icon.attr("src").replace("done","trash").replace("_r4", "_r1"));


	console.debug("Adding bin icon to action list");
	done.after(bin);

	console.debug("Final Product:");
	var action_list = pin.parent();
	console.debug(action_list.get());
}

var addObserverToListItem = function(target) {
	// From: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	for (var i = 0; i < mutation.addedNodes.length; i++) {
	  		var addedNode = mutation.addedNodes[i];
	  		var addedNodeJq = $(addedNode);
	  		console.log("Processing:");
	  		console.log(addedNode);
	  		if (addedNode.tagName == "UL") {
	  			console.log("Calling addBin for mouseover of email or reminder");
	  			addBin(addedNode);
	  		} else if (addedNode.tagName == "DIV" && addedNodeJq.attr("role") == "heading") {
	  			console.log("Calling addBin for expanded email");
	  			addBin(addedNodeJq.find("ul")[0]);
	  		}
	  	};
	  });    
	});
	 
	// configuration of the observer:
	var config = { attributes: false, childList: true, characterData: false, subtree: true };
	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
}


//var trash = container.find('div div li[data-jsaction="global.trash"]').clone()
//var trash_icon = $(trash.find("div img"))

var targets = $(".scroll-list-item").get();
for(idx in targets) {
	target = targets[idx];
	addObserverToListItem(target);
}

var targets = $(".scroll-list-section-body").get();
for(idx in targets) {
	target = targets[idx];

	// From: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	for (var i = 0; i < mutation.addedNodes.length; i++) {
	  		var addedNode = mutation.addedNodes[i];
	  		console.log("Processing:");
	  		console.log(addedNode);
	  		console.log(addedNode.tagName);
	  		console.log(addedNode.className);

	  		if (addedNode.tagName == "DIV" && addedNode.className.indexOf("scroll-list-item") >= 0) {
	  			console.log("Adding an observer to the newly added reminder/email");
	  			addObserverToListItem(addedNode);
	  		}
	  	};
	  });    
	});
	 
	// configuration of the observer:
	var config = { attributes: false, childList: true, characterData: false, subtree: false };
	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
}

