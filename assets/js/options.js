var iconSizeSelector = document.getElementById("iconSize");

(function init() {
	chrome.storage.sync.get({
		iconSize: 30
	}, function(options) {
		iconSizeSelector.value = options.iconSize;
	});
})();

iconSizeSelector.addEventListener("change", function() {
	chrome.storage.sync.set({
		iconSize: this.value
	});
});

document.getElementById("closeBtn").addEventListener("click", function() {
	window.close();
});
