import Config from 'config';
import WatchdogTimer from 'lib/watchdogTimer';

import HttpClient from 'core/cseClient/http';
import MqttClient from 'core/cseClient/mqtt';
import WsClient from 'core/cseClient/ws';
import CoapClient from 'core/cseClient/coap';
import TasServer from 'core/tasServer';

let state = 'init_cseClient';

let CSEClient = null;

if(Config.useProtocol === 'http') {
    CSEClient = HttpClient;
} else if(Config.useProtocol === 'mqtt') {
    CSEClient = MqttClient;
} else if(Config.useProtocol === 'ws') {
    CSEClient = WsClient;
} else if(Config.useProtocol === 'coap') {
    CSEClient = CoapClient;
}

const initialize = async () => {
    try {
        if(state === 'init_cseClient') {
            state = await CSEClient.initialize();
        } else if(state === 'create_ae') {
            state = await CSEClient.createAE();
        } else if(state === 'retrieve_ae') {
            state = await CSEClient.retrieveAE();
        } else if(state === 'create_cnt') {
            state = await CSEClient.createCnt();
        } else if(state === 'delete_sub') {
            state = await CSEClient.deleteSub();
        } else if(state === 'create_sub') {
            state = await CSEClient.createSub();
        } else if(state === 'start_tasServer') {
            state = await TasServer.start();
        } else if(state === 'ready') {
            console.log('[Application Entity] : is ready');
            WatchdogTimer.deleteWatchdogTimer('app');
            WatchdogTimer.setWatchdogTimer('aeClient/upload', 1, CSEClient.uploadCin);
        }
    } catch (error) {
        console.log(error);
    }
}

WatchdogTimer.setWatchdogTimer('app', 1, initialize);