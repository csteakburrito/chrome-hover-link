function showIcon(tabId) {
	chrome.pageAction.show(tabId);
}

function hideIcon(tabId) {
	chrome.pageAction.hide(tabId);
}

function showAllIcons() {
	allTabs(showIcon);
}

function hideAllIcons() {
	allTabs(hideIcon);
}

function allTabs(fn) {
	chrome.tabs.getAllInWindow(null, function(tabs){
        for ( var i=tabs.length-1; i >= 0; i-- )
            fn(tabs[i].id);
    });
}