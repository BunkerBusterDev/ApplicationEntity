import Ip from 'ip';
import Net from 'net';
import Shortid from 'shortid';

import Config from 'config';
import ContentInstance from './contentInstance';

let Server = null;

let SocketBuffer = {};
let TASBuffer = {};

async function onData(data) {
    TASBuffer[this.id] += data.toString();
    let dataArray = TASBuffer[this.id].split('<EOF>');

    if(dataArray.length >= 2) {
        for(let i=0; i<dataArray.length-1; i++) {
            let line = dataArray[i];

            TASBuffer[this.id] = TASBuffer[this.id].replace(`${line}<EOF>`, '');

            let lineToJson = JSON.parse(line);
            let containerName = lineToJson.containerName;
            let content = lineToJson.content;

            SocketBuffer[containerName] = this;

            console.log(`----> got data for[${containerName}] from thingAdationSoftware ---->`);

            if(content==='hello') {
                this.write(`${line}<EOF>`);
            } else if(containerName==='all') {
                for(let j=0; j<content.length; j++) {
                    for(let k=0; k<Config.containerArray.length; k++) {
                        if(Config.containerArray[k].name===content[j].containerName) {
                            ContentInstance.setContentInstance(content[j].containerName, content[j].content);
                        }
                    }
                }
            } else {
                for(let j=0; j<Config.containerArray.length; j++) {
                    if(Config.containerArray[j].name===containerName) {
                        try {
                            ContentInstance.setContentInstance(containerName, content);
                            break;
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        }
    }
}

exports.start = () => {
    return new Promise((resolve, reject) => {
        try {
            Server = Net.createServer((socket) => {
                console.log('[TasServer] : socket connect');

                socket.id = Shortid.generate();
                TASBuffer[socket.id] = '';
                
                socket.on('data', onData);
                socket.on('end', () => {
                    console.log('[TasServer] : socket end');
                    socket.destroy();
                });
                socket.on('close', () => {
                    console.log('[TasServer] : socket close');
                });
                socket.on('error', (error) => {
                    console.log(`[TasServer] : ${error.message}`);
                    socket.destroy();
                });
            });

            Server.listen(Config.applicationEntity.thingPort, () => {
                console.log(`TCP Server (${Ip.address()}) for TAS is listening on port ${Config.applicationEntity.thingPort}`)
                resolve('ready');
            });
        } catch (error) {
            reject(error);
        }
    });
}