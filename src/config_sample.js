let config = {};
let commonServiceEntity = {};
let applicationEntity = {};
let containerArray = [];
let subscriptionArray = [];

config.useProtocol = 'http'; // 'http' or 'mqtt' 중 하나 선택

// build commonServiceEntity
commonServiceEntity.id          = '/Mobius2';
commonServiceEntity.name        = 'Mobius';
commonServiceEntity.host        = 'localhost';
commonServiceEntity.port        = '7579';
commonServiceEntity.mqttPort    = '1883';

// build applicationEntity
applicationEntity.parent       = `/${commonServiceEntity.name}`;
applicationEntity.name         = 'ApplicationEntity';
applicationEntity.id           = `S${applicationEntity.name}`;
applicationEntity.appID        = 'ApplicationEntity';
applicationEntity.port         = '9727';
applicationEntity.thingPort    = '3105';
applicationEntity.bodyType     = 'json';

 // build container
let numIllum = 10;
for(let i=0; i<numIllum; i++) {
    containerArray[i] = {};
    containerArray[i].parent = `/${commonServiceEntity.name}/${applicationEntity.name}`;
    containerArray[i].name = `container_illum_${i+1}`;
}
let numCCT = 10;
for(let i=0; i<numCCT; i++) {
    containerArray[numIllum+i] = {};
    containerArray[numIllum+i].parent = `/${commonServiceEntity.name}/${applicationEntity.name}`;
    containerArray[numIllum+i].name = `container_cct_${i+1}`;
}
let numCurr = 10;
for(let i=0; i<numCurr; i++) {
    containerArray[numIllum+numCCT+i] = {};
    containerArray[numIllum+numCCT+i].parent = `/${commonServiceEntity.name}/${applicationEntity.name}`;
    containerArray[numIllum+numCCT+i].name = `container_curr_${i+1}`;
}
let numLED = 30;
for(let i=0; i<numLED; i++) {
    containerArray[numIllum+numCCT+numCurr+i] = {};
    containerArray[numIllum+numCCT+numCurr+i].parent = `/${commonServiceEntity.name}/${applicationEntity.name}`;
    containerArray[numIllum+numCCT+numCurr+i].name = `container_led_${i+1}`;
}
 
 // build subscription
 for(let i=0; i<numLED; i++){    
    subscriptionArray[i] = {};
    subscriptionArray[i].parent = `/${commonServiceEntity.name}/${applicationEntity.name}/${containerArray[numIllum+numCCT+numCurr+i].name}`;
    subscriptionArray[i].name = 'sub';
    if(config.useProtocol==='http') {
        subscriptionArray[i].nu = `http://${commonServiceEntity.host}:${applicationEntity.port}/noti?ct=json`; // http
    } else if(config.useProtocol==='mqtt') {
        subscriptionArray[i].nu = `mqtt://${commonServiceEntity.host}/${applicationEntity.id}?ct=${applicationEntity.bodyType}`; // mqtt
        // subscriptionArray[i].nu = `mqtt://${commonServiceEntity.host}/${applicationEntity.id}?rcn=9&ct=${applicationEntity.bodyType}`; // mqtt
    }
 }

config.commonServiceEntity = commonServiceEntity;
config.applicationEntity = applicationEntity;
config.containerArray = containerArray;
config.subscriptionArray = subscriptionArray;

module.exports = config;
