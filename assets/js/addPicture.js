chrome.storage.sync.get({iconSize: 30}, function(options) {

	var newsNode = document.querySelector(".news");

	if (newsNode) {
		var firstEntries = document.querySelectorAll(".news .alert.simple");
		addPictureToNodes(firstEntries);

		var observer = new MutationObserver(function(mutations) {
			for (var f = 0; f < mutations.length; f++) {
				addPictureToNodes(mutations[f].addedNodes);
			}
		});
		observer.observe(newsNode, {childList: true});
	}


	function addPictureToNodes(nodes) {
		for (var f = 0; f < nodes.length; f++) {
			var node = nodes[f];

			if (node.className && node.className.indexOf("simple") !== -1) {
				var entry = node.querySelector("a");
				var username = entry.innerHTML;

				var avatarImg = document.createElement("img");
				avatarImg.setAttribute("src", `//github.com/${username}.png?size=${options.iconSize * 2}`);
				avatarImg.setAttribute("width", options.iconSize);
				avatarImg.setAttribute("height", options.iconSize);
				avatarImg.className = "userPicture";

				entry.prepend(avatarImg);
			}
		}
	}

});
