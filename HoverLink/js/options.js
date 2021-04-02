(function(window) {

	var document = window.document,
		container = document.getElementById('container'),
		shortLink = document.getElementById('short-link'),
		normalLink = document.getElementById('normal-link'),
		icon = document.getElementById('icon'),
		fontSize = document.getElementById('font-size'),
		maxWidth = document.getElementById('max-width'),
		delayTime = document.getElementById('delay-time'),
		xOffset = document.getElementById('x-offset'),
		yOffset = document.getElementById('y-offset'),
		position = document.getElementsByName('position'),
		copyBtn = document.getElementById('copy-btn'),
		save = document.getElementById('save'),
		message = document.getElementById('message'),
		keyBind,
		showIcons,
		mapping = false,
		awaitingBind = false;


	loadSettings();
	save.addEventListener('click', saveData, false);
	copyBtn.addEventListener('click', bind, false);

	window.addEventListener('keyup', keyUp, false);


	function bind(event) {

		copyBtn.disabled = true;
		copyBtn.innerHTML = 'Press key';
		awaitingBind = true;

	}

	function keyUp(event) {

		if ( !awaitingBind ||
			 event.keyCode === 16 ||
			 event.keyCode === 17 ||
			 event.keyCode === 18 ||
			 event.keyCode === 91 )
			return;

		if ( event.keyCode === 27 ) {
			keyBind = 'None';
			copyBtn.innerHTML = 'None';
			copyBtn.disabled = false;
			awaitingBind = false;
			return;
		}

		var str = '', bind;

		if ( event.shiftKey )
			str += 'Shift + ';
		else if ( event.ctrlKey )
			str += 'Ctrl + ';
		else if ( event.altKey )
			str += 'Alt + ';

		bind = str;
		str += fromKeyCode(event.keyCode);
		bind += event.keyCode;
		keyBind = bind;

		copyBtn.innerHTML = str;
		copyBtn.disabled = false;
		awaitingBind = false;

	}

	function saveData() {

		message.style.display = 'none';
		message.innerHTML = 'Saved!';

		if ( isNaN(Number(xOffset.value)) || isNaN(Number(yOffset.value)) ) {
			message.innerHTML = 'Offset must be a number!';
			showMessage();
			return;
		}

		if ( isNaN(Number(fontSize.value)) ) {
			message.innerHTML = 'Font size must be a number!';
			showMessage();
			return;
		}

		if ( isNaN(Number(maxWidth.value)) ) {
			message.innerHTML = 'Max width must be a number!';
			showMessage();
			return;
		}

		if ( isNaN(Number(delayTime.value)) ) {
			message.innerHTML = 'Hover delay must be a number!';
			showMessage();
			return;
		}

		var data = {
			hoverLinkShort: ( (shortLink.checked) ? true : false ),
			hoverLinkNormal: ( (normalLink.checked) ? true : false ),
			hoverLinkIcon: ( (icon.checked) ? true : false ),
			hoverLinkFontSize: Number(fontSize.value),
			hoverLinkMaxWidth: Number(maxWidth.value),
			hoverLinkPosition: null,
			hoverLinkOffsetX: Number(xOffset.value),
			hoverLinkOffsetY: Number(yOffset.value),
			hoverLinkDelayTime: Number(delayTime.value),
			hoverLinkCopy: keyBind
		};

		for ( var i=position.length-1; i >= 0; i-- )
			if ( position[i].checked ) {
				data.hoverLinkPosition = position[i].value;
				break;
			}

		chrome.storage.sync.set(data, function() {

			if ( icon.checked != showIcons )
				if ( icon.checked ) {
					showIcons = true;
					showAllIcons();
				} else {
					showIcons = false;
					hideAllIcons();
				}

			showMessage();

		});

	}

	function showMessage() {
		$(message).show('fast', function() {
			setTimeout(hideMessage, 1500);
		})
	}

	function hideMessage() {
		$(message).hide('fast');
	}

	function loadSettings() {
		chrome.storage.sync.get([

			'hoverLinkShort',
			'hoverLinkNormal',
			'hoverLinkIcon',
			'hoverLinkPosition',
			'hoverLinkOffsetX',
			'hoverLinkOffsetY',
			'hoverLinkFontSize',
			'hoverLinkMaxWidth',
			'hoverLinkDelayTime',
			'hoverLinkCopy'], 

		function(data) {

			shortLink.checked = data.hoverLinkShort;
			normalLink.checked = data.hoverLinkNormal;
			icon.checked = data.hoverLinkIcon;
			showIcons = data.hoverLinkIcon;
			document.getElementById(data.hoverLinkPosition).checked = true;
			xOffset.value = data.hoverLinkOffsetX;
			yOffset.value = data.hoverLinkOffsetY;
			fontSize.value = data.hoverLinkFontSize;
			maxWidth.value = data.hoverLinkMaxWidth;
			delayTime.value = data.hoverLinkDelayTime;

			if ( data.hoverLinkCopy === 'None' )
				copyBtn.innerHTML = data.hoverLinkCopy;
			else {

				var b = data.hoverLinkCopy;
				keyBind = b;

				if ( b.indexOf('Ctrl') === 0 || b.indexOf('Alt') === 0 || b.indexOf('Shift') === 0 ) {

					var a = b.substr(b.indexOf('+')+1).trim(),
						key = fromKeyCode(Number(a));

					copyBtn.innerHTML = b.replace(a, key);

				} else {
					copyBtn.innerHTML = fromKeyCode(Number(b.trim()));
				}

			}

		});
	}


	function fromKeyCode(n) {
		if( 47<=n && n<=90 ) return unescape('%'+(n).toString(16))
		if( 96<=n && n<=105) return 'NUM '+(n-96)
		if(112<=n && n<=135) return 'F'+(n-111)

		if(n==3)  return 'Cancel' //DOM_VK_CANCEL
		if(n==6)  return 'Help'   //DOM_VK_HELP
		if(n==8)  return 'Backspace'
		if(n==9)  return 'Tab'
		if(n==12) return 'NUM 5'  //DOM_VK_CLEAR
		if(n==13) return 'Enter'
		if(n==16) return 'Shift'
		if(n==17) return 'Ctrl'
		if(n==18) return 'Alt'
		if(n==19) return 'Pause|Break'
		if(n==20) return 'CapsLock'
		if(n==27) return 'Esc'
		if(n==32) return 'Space'
		if(n==33) return 'PageUp'
		if(n==34) return 'PageDown'
		if(n==35) return 'End'
		if(n==36) return 'Home'
		if(n==37) return 'Left Arrow'
		if(n==38) return 'Up Arrow'
		if(n==39) return 'Right Arrow'
		if(n==40) return 'Down Arrow'
		if(n==42) return '*' //Opera
		if(n==43) return '+' //Opera
		if(n==44) return 'PrntScrn'
		if(n==45) return 'Insert'
		if(n==46) return 'Delete'

		if(n==91) return 'WIN Start'
		if(n==92) return 'WIN Start Right'
		if(n==93) return 'WIN Menu'
		if(n==106) return '*'
		if(n==107) return '+'
		if(n==108) return 'Separator' //DOM_VK_SEPARATOR
		if(n==109) return '-'
		if(n==110) return '.'
		if(n==111) return '/'
		if(n==144) return 'NumLock'
		if(n==145) return 'ScrollLock'

		//Media buttons (Inspiron laptops) 
		if(n==173) return 'Media Mute On|Off'
		if(n==174) return 'Media Volume Down'
		if(n==175) return 'Media Volume Up'
		if(n==176) return 'Media >>'
		if(n==177) return 'Media <<'
		if(n==178) return 'Media Stop'
		if(n==179) return 'Media Pause|Resume'

		if(n==182) return 'WIN My Computer'
		if(n==183) return 'WIN Calculator'
		if(n==186) return '; :'
		if(n==187) return '= +'
		if(n==188) return ', <'
		if(n==189) return '- _'
		if(n==190) return '. >'
		if(n==191) return '/ ?'
		if(n==192) return '\` ~'
		if(n==219) return '[ {'
		if(n==220) return '\\ |'
		if(n==221) return '] }'
		if(n==222) return '\' "'
		if(n==224) return 'META|Command'
		if(n==229) return 'WIN IME'

		if(n==255) return 'Device-specific' //Dell Home button (Inspiron laptops)

		return null
	}

}) (window);