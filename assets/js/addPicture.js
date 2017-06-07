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

	function hasClass(node, className) {
		return node.className.indexOf(className) !== -1;
	}

	function addPictureToNodes(nodes) {
		for (var f = 0; f < nodes.length; f++) {

			var node = nodes[f];

			if (node.className && hasClass(node, "simple")) {
				var links = node.querySelectorAll("a");
				var userLink = links[0];
				var isAddEntry = hasClass(node, "member_add");
				if (isAddEntry) {
					userLink = links[1];
				}
				var username = userLink.innerHTML;

				var avatarImg = document.createElement("img");
				avatarImg.setAttribute("src", `//github.com/${username}.png?size=${options.iconSize * 2}`);
				avatarImg.setAttribute("width", options.iconSize);
				avatarImg.setAttribute("height", options.iconSize);
				avatarImg.className = "userPicture";

				var avatarLink = document.createElement("a");
				avatarLink.setAttribute("href", userLink.getAttribute("href"));
				avatarLink.appendChild(avatarImg);

				var title = node.querySelector(".title");
				if (isAddEntry) {
					// for better readability, we'll rephrase the entry
					// from 'X added Y to REPO' into 'Y was added by X to REPO'
					title.innerHTML = "";
					title.appendChild(avatarLink);
					title.appendChild(links[1]);
					title.appendChild(document.createTextNode(" was added by "));
					title.appendChild(links[0]);
					title.appendChild(document.createTextNode(" to "));
					title.appendChild(links[2]);
				}
				else {
					title.prepend(avatarLink);
				}
			}
		}
	}

});
