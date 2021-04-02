(function(window) {


    var document = window.document,
        body = document.body,
        input = document.getElementById('input'),
        working = false,
        xhr = null,
        currentURL,
        currentTab,
        currentId;


    chrome.runtime.onInstalled.addListener(firstRun);
    chrome.runtime.onMessage.addListener(messageReceived);
    chrome.tabs.onUpdated.addListener(tabOnUpdate);
    
    chrome.webRequest.onBeforeRequest.addListener(function(info) {
        
        if ( info.url.indexOf('http://hoverlinkurl/') === 0 ) {
            currentURL = info.url.substr(20);
            currentId = info.requestId;
            return {redirectUrl: currentURL};
        } else if ( info.url === currentURL && info.requestId !== currentId )
            return {cancel: true};

    }, {
        urls: [ '*://*/*' ],
        types: [ 'xmlhttprequest' ]
    },
    ['blocking']);


    chrome.webRequest.onHeadersReceived.addListener(function(info) {

        if ( !working || info.requestId !== currentId || info.url !== currentURL )
            return;

        var headers = info.responseHeaders,
            h = getRelevantHeaders(headers);

        if ( !h.validType )
            sendURL(info.url);
        else if ( h.location !== null )
            currentURL = h.location;

    }, {
        urls: [ '*://*/*' ],
        types: [ 'xmlhttprequest' ]
    },
    ['responseHeaders']);

    chrome.webRequest.onResponseStarted.addListener(function(info) {

        if ( info.requestId === currentId )
            currentURL = info.url;

    }, {
        urls: [ '*://*/*' ],
        types: [ 'xmlhttprequest' ]
    },
    ['responseHeaders']);


    function fixURL(url) {

        try {
            return (new URL(url)).href;
        } catch(e) {
            return null;
        }

    }

    function getRelevantHeaders(headers) {

        var data = {
            location: null,
            validType: true
        };

        for ( var i=headers.length-1; i >= 0; i-- ) {

            var name = headers[i].name.toLowerCase();

            if ( name === 'location' )
                data.location = headers[i].value;

            else if ( name === 'content-type' ) {
                var val = headers[i].value.toLowerCase();
                if ( !val.match(/text\/html/) && !val.match(/application\/xhtml/) )
                    data.validType = false;
            }

        }

        return data;

    }


    function findURL(url) {

        working = true;

        url = fixURL(url);

        if ( url === null ) {
            sendError('unknown');
            return;
        }

        currentURL = 'http://hoverLinkURL/' + url;

        xhr = new XMLHttpRequest();
        xhr.addEventListener('load', xhrLoad, false);
        xhr.addEventListener('error', xhrError, false);
        xhr.open('GET', currentURL, true);
        xhr.send();

    }

    function xhrLoad() {
        
        if ( xhr.status === 200 ) {

            var holder = document.createElement('div');

            holder.innerHTML = xhr.responseText.replace(/<noscript[^>]*>/gi, '<div>').replace(/<\/noscript>/gi, '</div>');
            meta = holder.getElementsByTagName('meta');

            if ( meta.length )
                for ( var i=meta.length-1; i >= 0; i-- ) {

                    var m = meta[i];

                    if ( m.hasAttribute('http-equiv') && m.hasAttribute('content') && m.getAttribute('http-equiv').toLowerCase() === 'refresh' ) {

                        var url = m.getAttribute('content');

                        url = url.match(/\d+;\s*url=(.+)$/i)[1];
                        url = fixURL(url);

                        if ( url ) {
                            findURL(url);
                            return;
                        }

                    }

                }

            sendURL(currentURL);

        } else {
            sendError(xhr.status);
        }

    }

    function xhrError() {
        sendError('unknown');
    }

    function messageReceived(request, sender, sendResponse) {
        if ( request.hoverLink )
            if ( request.hoverLink === 'findURL' ) {
                currentTab = sender.tab.id;
                findURL(request.url);
            } else if ( request.hoverLink === 'cancelURLFind' )
                cancelURLFind();
            else if ( request.hoverLink === 'copyURL' )
                copyURL(request.url);
    }

    function copyURL(url) {

        input.value = url;
        input.focus();
        input.select();

        document.execCommand('Copy');

    }

    function sendURL(link) {
        if ( !working )
            return;
        killXHR();
        sendMessage({hoverLink: 'responseURL',url: link});
        working = false;
    }

    function sendError(sc) {
        if ( !working )
            return;
        killXHR();
        sendMessage({hoverLink: 'error',statusCode: sc});
        working = false;
    }

    function sendMessage(message) {
        chrome.tabs.sendMessage(currentTab, message, empty);
    }

    function cancelURLFind() {
        if ( !working )
            return;
        working = false;
        killXHR();
    }

    function killXHR() {
        if ( xhr === null )
            return;
        xhr.abort();
        xhr = null;
    }

    function firstRun(details) {

        if ( details.reason !== 'install' )
            return;

        chrome.storage.sync.set({
            hoverLinkShort: true,
            hoverLinkNormal: false,
            hoverLinkIcon: true,
            hoverLinkPosition: 'top-right',
            hoverLinkOffsetX: 10,
            hoverLinkOffsetY: 10,
            hoverLinkFontSize: 16,
            hoverLinkMaxWidth: 500,
            hoverLinkDelayTime: 300,
            hoverLinkCopy: 'None'
        }, empty);

        showAllIcons();

    }

    function tabOnUpdate(tabId) {
        chrome.storage.sync.get(['hoverLinkIcon'], function(data) {
             if ( data['hoverLinkIcon'] )
                showIcon(tabId);
        });
    }

    function empty() {}



}) (window);





