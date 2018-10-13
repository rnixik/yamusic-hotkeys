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
            console.log("Connected to port");

            messagePort.onDisconnect.addListener(() => {
                messagePort = null;
                console.log("Disconnected to port");
            });
        });

        chrome.commands.onCommand.addListener((command) => {
            console.log("Command", command);
            if (!messagePort) {
                return;
            }
            messagePort.postMessage({ command });
        });
    });
})();
