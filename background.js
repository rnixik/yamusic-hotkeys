(function() {
    'use strict';

    const PORT_NAME = 'music-hotkeys-port';

    chrome.runtime.onInstalled.addListener(function () {

        let messagePort;

        chrome.runtime.onConnect.addListener(function(port) {
            if (port.name !== PORT_NAME) {
                return;
            }
            messagePort = port;
        });

        chrome.commands.onCommand.addListener(function (command) {
            messagePort.postMessage({ command });
        });
    });
})();
