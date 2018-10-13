(function() {
	'use strict';

    const PORT_NAME = 'music-hotkeys-port';

    const COMMAND_PREV_TRACK = 'prev-track';
    const COMMAND_PAUSE_TRACK = 'pause-track';
    const COMMAND_NEXT_TRACK = 'next-track';

    function clickSelector(selector) {
        if (!selector) {
            return;
        }
        const element = document.querySelector(selector);
        if (!element) {
        	console.warn(`Selector '${selector}' not found to click`);
        	return;
		}
        element.click();
	}

    const port = chrome.runtime.connect({name: PORT_NAME});
    port.onMessage.addListener((msg) => {
        if (!msg.command) {
        	return;
		}
		console.log("Command from hotkeys: ", msg.command);
		switch (msg.command) {
			case COMMAND_PREV_TRACK:
            	clickSelector(window.HOTKEYS_SELECTOR_PREV_TRACK);
            	break;
            case COMMAND_PAUSE_TRACK:
                clickSelector(window.HOTKEYS_SELECTOR_PAUSE_TRACK);
                break;
            case COMMAND_NEXT_TRACK:
                clickSelector(window.HOTKEYS_SELECTOR_NEXT_TRACK);
                break;
        }
    });
})();
