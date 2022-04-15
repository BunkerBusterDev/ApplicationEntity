exports.createAE = () => {
    return new Promise((resolve, reject) => {
        console.log('createAE');
        resolve(true);
    });
}

exports.retrieveAE = () => {
    return new Promise((resolve, reject) => {
        console.log('retrieveAE');
        resolve(true);
    });
}

exports.createCnt = () => {
    return new Promise((resolve, reject) => {
        console.log('createCnt');
        resolve(true);
    });
}

exports.deleteSub = () => {
    return new Promise((resolve, reject) => {
        console.log('deleteSub');
        resolve(true);
    });
}

exports.createSub = () => {
    return new Promise((resolve, reject) => {
        console.log('createSub');
        resolve(true);
    });
}

exports.initialize = () => {
    return new Promise((resolve, reject) => {
        console.log('coap');
        resolve('create_ae');
    });
}