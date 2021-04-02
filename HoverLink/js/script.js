(function(window) {


	var shortURLDomains = [
		'0rz.tw', '1url.com', '2.gp', '2tu.us', '3.ly', '4ms.me', '4sq.com', '7.ly', 'a.gg', 'adf.ly', 'alturl.com', 'amzn.to', 'atu.ca', 'azc.cc',
		'b23.ru', 'bcool.bz', 'binged.it', 'bit.ly', 'bizj.us', 'bravo.ly', 'bsa.ly', 'budurl.com', 'canurl.com', 'chilp.it', 'chzb.gr', 'clck.ru',
		'clickthru.ca', 'conta.cc', 'cort.as', 'cot.ag', 'crks.me', 'ctvr.us', 'cutt.us', 'dai.ly', 'decenturl.com', 'dfl8.me', 'disq.us', 'dld.bz',
		'dlvr.it', 'doiop.com', 'eepurl.com', 'fa.by', 'fav.me', 'fb.me', 'fbshare.me', 'ff.im', 'fire.to', 'firsturl.de', 'firsturl.net', 'flic.kr',
		'flq.us', 'fly2.ws', 'fon.gs', 'freak.to', 'fuseurl.com', 'fuzzy.to', 'fwd4.me', 'fwib.net', 'g.ro.lt', 'gizmo.do', 'gl.am', 'go.9nl.com', 'go.ign.com',
		'go.usa.gov', 'goo.gl', 'goshrink.com', 'gurl.es', 'hex.io', 'hiderefer.com', 'hmm.ph', 'href.in', 'hsblinks.com', 'htxt.it', 'huff.to', 'hulu.com',
		'hurl.me', 'hurl.ws', 'icanhaz.com', 'idek.net', 'ilix.in', 'is.gd', 'its.my', 'ix.lt', 'j.mp', 'jijr.com', 'kl.am', 'klck.me', 'korta.nu', 'krunchd.com',
		'l9k.net', 'lat.ms', 'liip.to', 'liltext.com', 'linkbee.com', 'linkbun.ch', 'liurl.cn', 'ln-s.net', 'ln-s.ru', 'lnk.gd', 'lnk.ms', 'lnkd.in',
		'lnkurl.com', 'lru.jp', 'lt.tl', 'lurl.no', 'macte.ch', 'mash.to', 'merky.de', 'migre.me', 'miniurl.com', 'minurl.fr', 'mke.me', 'moby.to', 'moourl.com',
		'mrte.ch', 'myloc.me', 'myurl.in', 'n.pr', 'nbc.co', 'nblo.gs', 'nn.nf', 'not.my', 'notlong.com', 'nsfw.in', 'nutshellurl.com',	'nxy.in', 'nyti.ms',
		'o-x.fr', 'oc1.us', 'om.ly', 'omf.gd', 'omoikane.net', 'on.cnn.com', 'on.mktw.net', 'onforb.es', 'orz.se', 'ow.ly', 'ping.fm', 'pli.gs', 'pnt.me',
		'politi.co', 'post.ly', 'pp.gg', 'profile.to', 'ptiturl.com', 'pub.vitrue.com', 'qlnk.net', 'qte.me', 'qu.tc', 'qy.fi', 'r.im', 'rb6.me', 'read.bi',
		'readthis.ca', 'reallytinyurl.com', 'redir.ec', 'redirects.ca', 'redirx.com', 'retwt.me', 'ri.ms', 'rickroll.it', 'riz.gd', 'rt.nu', 'ru.ly',
		'rubyurl.com', 'rurl.org', 'rww.tw', 's4c.in', 's7y.us', 'safe.mn', 'sameurl.com', 'sdut.us', 'shar.es', 'shink.de', 'shorl.com', 'short.ie', 'short.to',
		'shortlinks.co.uk', 'shorturl.com', 'shout.to', 'show.my', 'shrinkify.com', 'shrinkr.com', 'shrt.fr', 'shrt.st', 'shrten.com', 'shrunkin.com', 'simurl.com',
		'slate.me', 'smallr.com', 'smsh.me', 'smurl.name', 'sn.im', 'snipr.com', 'snipurl.com', 'snurl.com', 'sp2.ro', 'spedr.com', 'srnk.net', 'srs.li',
		'starturl.com', 'su.pr', 'surl.co.uk', 'surl.hu', 't.cn', 't.co', 't.lh.com', 'ta.gd', 'tbd.ly', 'tcrn.ch', 'tgr.me', 'tgr.ph', 'tighturl.com',
		'tiniuri.com', 'tiny.cc', 'tiny.ly', 'tiny.pl', 'tinylink.in', 'tinyuri.ca', 'tinyurl.com', 'tk.', 'tl.gd', 'tmi.me', 'tnij.org', 'tnw.to', 'tny.com',
		'to.', 'to.ly', 'togoto.us', 'totc.us', 'toysr.us', 'tpm.ly', 'tr.im', 'tra.kz', 'trunc.it', 'twhub.com', 'twirl.at', 'twitclicks.com', 'twitterurl.net',
		'twitterurl.org', 'twiturl.de', 'twurl.cc', 'twurl.nl', 'u.mavrev.com', 'u.nu', 'u76.org', 'ub0.cc', 'ulu.lu', 'updating.me', 'ur1.ca', 'url.az',
		'url.co.uk', 'url.ie', 'url360.me', 'url4.eu', 'urlborg.com', 'urlbrief.com', 'urlcover.com', 'urlcut.com', 'urlenco.de', 'urli.nl', 'urls.im',
		'urlshorteningservicefortwitter.com', 'urlx.ie', 'urlzen.com', 'usat.ly', 'use.my', 'vb.ly', 'vgn.am', 'vl.am', 'vm.lc', 'w55.de', 'wapo.st',
		'wapurl.co.uk', 'wipi.es', 'wp.me', 'x.vu', 'xr.com', 'xrl.in', 'xrl.us', 'xurl.es', 'xurl.jp', 'y.ahoo.it', 'yatuc.com', 'ye.pe', 'yep.it', 'yfrog.com',
		'yhoo.it', 'yiyd.com', 'youtu.be', 'yuarel.com', 'z0p.de', 'zi.ma', 'zi.mu', 'zipmyurl.com', 'zud.me', 'zurl.ws', 'zz.gd', 'zzang.kr'
	];

	


	var document = window.document,
		body = document.body,
		a = document.getElementsByTagName('a'),
		currentLinks = [],
		currentLength = a.length,
		unallowedDomains,
		zIndex = 100,
		displayTimeout,
		urlDisplayed = false,
		currentUrl,
		delayTime,
		keyBind,
		shortURL,
		normalURL,
		eligibleURL,
		working,
		container,
		label;

	loadSettings();
	addEvents();
	drawWindow();
	checkForChanges();


	function validDomain() {

		var domain = (new URL(location.href)).hostname.toLowerCase();

		if ( inArray(unallowedDomains, domain) )
			return false;

		return true;

	}


	function loadSettings() {
		chrome.storage.sync.get([
			'hoverLinkShort',
			'hoverLinkNormal',
			'hoverLinkPosition',
			'hoverLinkOffsetX',
			'hoverLinkOffsetY',
			'hoverLinkFontSize',
			'hoverLinkMaxWidth',
			'hoverLinkDelayTime',
			'hoverLinkCopy',
			'hoverLinkUnallowed'],
		function(data) {
			shortURL = data.hoverLinkShort;
			normalURL = data.hoverLinkNormal;
			moveBox(data.hoverLinkPosition, data.hoverLinkOffsetX, data.hoverLinkOffsetY);
			label.style.fontSize = data.hoverLinkFontSize + 'px';
			label.style.maxWidth = data.hoverLinkMaxWidth + 'px';
			delayTime = data.hoverLinkDelayTime;
			keyBind = data.hoverLinkCopy;
			unallowedDomains = data.hoverLinkUnallowed;
		});
	}

	function addEvents() {
		for ( var i=currentLength-1; i >= 0; i-- ) {
			addEvent(a[i]);
			currentLinks.push(a[i]);
		}
		chrome.runtime.onMessage.addListener(receiveMessage);
		chrome.storage.onChanged.addListener(loadSettings);
		window.addEventListener('blur', function() {
			sendMessage({hoverLink: 'cancelURLFind'});
		}, false);
		window.addEventListener('keyup', keyUp, false);
	}

	function addEvent(a) {
		a.addEventListener('mouseover', linkMouseOver, false);
		a.addEventListener('mouseout', linkMouseOut, false);
	}

	function keyUp(event) {

		if ( keyBind === 'None' || !urlDisplayed )
			return;

		if ( keyBind.indexOf('Shift') === 0 && event.shiftKey ||
			 keyBind.indexOf('Ctrl') === 0 && event.ctrlKey ||
			 keyBind.indexOf('Alt') === 0 && event.altKey ||
			 keyBind.indexOf('Win') === 0 && event.metaKey ) {

			var key = keyBind.substr(keyBind.lastIndexOf('+')+1).trim();

			if ( Number(key) === event.keyCode )
				copyURL();

		}

	}

	function copyURL() {

		sendMessage({
			hoverLink: 'copyURL',
			url: currentUrl
		})

		insertLabel('Copied');

		urlDisplayed = false;
		setTimeout(hideBox, 2000);

	}

	function checkForChanges() {

		if ( a.length === currentLength ) {
			setTimeout(checkForChanges, 500);
			return;
		}

		currentLength = a.length;
		var newCurrentLinks = [];

		for ( var i=currentLength-1; i >= 0; i-- )
			if ( !inArray(currentLinks, a[i]) ) {
				addEvent(a[i]);
				newCurrentLinks.push(a[i]);
			}

		currentLinks = newCurrentLinks;

		setTimeout(checkForChanges, 500);

	}

	function drawWindow() {

		var all = document.getElementsByTagName('*');

		for ( var i=all.length; i >= 0; i-- ) {
			var style = getComputedStyle(all[i]);
			if ( !style )
				continue;
			var z = parseInt(style.getPropertyValue('z-index'));
			if ( z > zIndex )
				zIndex = z+1;
		}

		var _container = document.createElement('div'),
			_label = document.createElement('div');

		_container.id = 'hoverLinkContainer';
		_container.style.zIndex = zIndex;
		_label.id = 'hoverLinkLabel';
		_label.innerHTML = 'Loading...';

		_container.appendChild(_label);

		container = _container;
		label = _label;

	}

	function moveBox(s, x, y) {

		var a = s.substring(0, s.indexOf('-')),
			b = s.substr(s.indexOf('-')+1);

		container.setAttribute('style', 'z-index:'+zIndex+';');

		container.style[a] = y + 'px';
		container.style[b] = x + 'px';

	}

	function requestURL(link) {
		
		if ( !working )
			return;

		sendMessage({
			hoverLink: 'findURL',
			url: link
		});

	}

	function cancelURL() {
		working = false;
		sendMessage({hoverLink: 'cancelURLFind'});
	}

	function linkMouseOver(event) {

		var a = this,
			url = this.href;

		displayTimeout = setTimeout(function() {
			mouseOver(url);
		}, delayTime);

	}

	function linkMouseOut(event) {

		urlDisplayed = false;
		clearTimeout(displayTimeout);

		if ( !eligibleURL )
			return;

		if ( working )
			cancelURL();

		hideBox();
		insertLabel('');

	}

	function mouseOver(url) {

		if ( !eligible(url) ) {
			eligibleURL = false;
			return;
		}

		working = true;
		eligibleURL = true;

		insertLabel('Loading...');
		displayBox();
		requestURL(url);

	}

	function eligible(url) {

		try {
			url = new URL(url);
		} catch(e) {
			return false;
		}

		if ( url.protocol !== 'http:' && url.protocol !== 'https:' ) {
			return false;
		}

		if ( (new URL(location.href)).hostname === url.hostname && url.pathname === '/' && url.search === '' ) {
			return false;
		}

		if ( shortURL && normalURL ) 
			return true;

		if ( !shortURL && !normalURL )
			return false;

		if ( inArray(shortURLDomains, url.hostname) && url.pathname !== '/' && url.search !== '' ) {
			if ( shortURL )
				return true;
			return false;
		}

		if ( normalURL )
			return true;

		return false;

	}

	function inArray(array, item) {
		for ( var i=array.length; i >= 0; i-- )
			if ( array[i] === item )
				return true;
		return false;
	}

	function sendMessage(message) {
		chrome.runtime.sendMessage(message, empty);
	}

	function receiveMessage(request, sender, sendResponse) {
	    if ( request.hoverLink )
	    	if ( request.hoverLink === 'responseURL' && working )
	    		showFinalURL(request.url);
	   		else if ( request.hoverLink === 'error' && working )
	   			showError(request.statusCode);
	}

	function showFinalURL(url) {
		working = false;
		urlDisplayed = true;
		currentUrl = url;
		insertLabel(url);
	}

	function showError(statusCode) {
	   	insertLabel('Ooops. Something went wrong!' + ( (statusCode !== 'unknown') ? '('+statusCode+')' : '' ) );
	}

	function displayBox() {
		body.appendChild(container);
		$(container).show('fast');
	}

	function hideBox() {
		try {
			body.removeChild(container);
		} catch(e) {}
		container.style.display = 'none';
	}

	function insertLabel(txt) {
		label.innerHTML = txt;
	}

	function empty() {}


}) (window);