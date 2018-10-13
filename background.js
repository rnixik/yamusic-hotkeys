(function() {
    'use strict';

    const PORT_NAME = 'music-hotkeys-port';

    chrome.runtime.onInstalled.addListener(() => {

        let messagePort;

        chrome.runtime.onConnect.addListener((port) => {
            if (port.name !== PORT_NAME) {
                return;
            }
            messagePort = port;

            messagePort.onDisconnect.addListener(() => {
                messagePort = null;
            });
        });

        chrome.commands.onCommand.addListener((command) => {
            if (!messagePort) {
                return;
            }
            messagePort.postMessage({ command });
        });
    });
})();
