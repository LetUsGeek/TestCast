window.debug = true;

function checkDebug() {
    if (window.debug) {
        document.getElementById('debug').style.display = 'block';
        document.getElementById('maze').style.margin = '30px';
    } else {
        document.getElementById('debug').style.display = 'none';
        document.getElementById('maze').style.margin = '30px auto';
    }
}

$(document).ready(function () {

    // TODO log level
    cast.receiver.logger.setLevelValue(1);

    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    log('Starting receiver manager');

    window.castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    window.messageBus = window.castReceiverManager
    .getCastMessageBus('urn:x-cast:fr.BuibuiNicho');

    window.castReceiverManager.onSenderConnected = function (event) {
        log('Received sender connected event ' + event.data);
        var color = addPlayer(event.senderId);
        window.messageBus.send(event.senderId, JSON.stringify({color: color}));
    };

    window.castReceiverManager.onSenderDisconnected = function (event) {
        log('Received sender disconnected event ' + event.data);
        removePlayer(event.senderId);
    };

    window.messageBus.onMessage = function (event) {
        log('Message Nicho [' + event.senderId + '] ' + event.data);
        handleMessage(event.data, event.senderId);
        // var tonImage = document.createElement("img");
        // tonImage.setAttribute("src", "https://www.lug-grandfougeray.fr/wp-content/uploads/2019/12/Logo-LUG-web1_v1-e1575273875713.png");
        // tonImage.setAttribute("width", "304");
        // tonImage.setAttribute("height", "228");
        // tonImage.setAttribute("alt", "Ton Image");
        // document.getElementById('debug').appendChild(tonImage);


    };

    window.castReceiverManager.start({statusText: "Application is starting"});
    log('Receiver manager started');

    /**
     * Misc method to log into console box in web view
     * @param msg message to log
     */
    function log(msg) {
        if (window.debug) {
            var debug = document.getElementById('debug');
            var tmpHTML = debug.innerHTML;
            debug.innerHTML = '';
            debug.innerHTML = msg + '<br/>' + tmpHTML;
        }
    }
});