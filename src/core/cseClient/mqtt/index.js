import ContentInstance from 'core/tasServer/contentInstance';

exports.createAE = () => {
    return new Promise((resolve, reject) => {
        console.log('createAE');
        resolve('retrieve_ae');
    });
}

exports.retrieveAE = () => {
    return new Promise((resolve, reject) => {
        console.log('retrieveAE');
        resolve('create_cnt');
    });
}

exports.createCnt = () => {
    return new Promise((resolve, reject) => {
        console.log('createCnt');
        resolve('delete_sub');
    });
}

exports.deleteSub = () => {
    return new Promise((resolve, reject) => {
        console.log('deleteSub');
        resolve('create_sub');
    });
}

exports.createSub = () => {
    return new Promise((resolve, reject) => {
        console.log('createSub');
        resolve('start_tasServer');
    });
}

exports.uploadCin = (name) => {
    return new Promise((resolve, reject) => {
        let cin = null;
        let existData = true;
        if(name !== null && name.includes('container')) {
            cin = ContentInstance.getContentInstance(name);
            if(cin.content === '') {
                existData = false;
            }
        } else {
            const allData = ContentInstance.getContentInstance();
            cin = {containerName: 'all', content: allData};

            for(let i=0; i<cin.content.length; i++) {
                if(cin.content[i].content === '') {
                    existData = false;
                }
            }
        }
        console.log(cin);
        if(existData) {
        }
    });
}

exports.initialize = () => {
    return new Promise((resolve, reject) => {
        console.log('mqtt');
        resolve('create_ae');
    });
}