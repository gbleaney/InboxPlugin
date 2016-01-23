include("jquery")
include("https://gist.githubusercontent.com/jabney/d9d5c13ad7f871ddf03f/raw/99b13e7721f8a50ef8b0c1e9c015eca9fb6e9e8f/setOps.js")

var addBin = function(ul) {

	console.debug("Creating UL jQuery object");
	ul = $(ul)

	var pin = $(ul.find("li[class~=action]")[0])
	var done = $(ul.find("li[class~=action]")[2])
	var bin = $(done.clone())

	var action_list = $(first.parentNode)
	var container = $(first.parentNode.parentNode)

	var pin_classes = pin.attr("class")
	var done_classes = done.attr("class")
	var bin_classes = setOps.intersection(done_classes.split(" "),pin_classes.split(" "))

	bin_classes = bin_classes.join(" ")
	bin_classes += " itemIconTrash"

	bin.attr("class", bin_classes)

	action_list.append(bin)
}


//var trash = container.find('div div li[data-jsaction="global.trash"]').clone()
//var trash_icon = $(trash.find("div img"))

var targets = $(".scroll-list-item").get();
for(idx in targets) {
	target = targets[idx]
	// From: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	for (var i = 0; i < mutation.addedNodes.length; i++) {
	  		var addedNode = mutation.addedNodes[i];
	  		console.log("Processing:");
	  		console.log(addedNode);
	  		if (addedNode.tagName == "UL") {
	  			console.log("Calling addBin");
	  			addBin(addedNode)
	  		}
	  	};
	  });    
	});
	 
	// configuration of the observer:
	var config = { attributes: false, childList: true, characterData: false, subtree: true };
	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
}

 

 
// later, you can stop observing
observer.disconnect();