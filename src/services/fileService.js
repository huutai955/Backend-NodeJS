const path = require('path');



const uploadSingle = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let namePath = `DemoName-${Date.now()}${fileObject.name}`;
    let uploadPath = path.join(__dirname, '..', 'public', 'images', 'upload') + '/' + namePath;
    // Use the mv() method to place the file somewhere on your server
    try {
        await fileObject.mv(uploadPath);
        return {
            status: 'success',
            path: namePath,
            error: null
        }
    } catch (err) {
        console.log('check error', err)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }
}


const uploadMultipleFiles = async (fileObject) => {
    let countSuccess = 0;
    let resultArr = []
    for (let i = 0; i < fileObject.length; i++) {
        let namePath = `DemoName-${Date.now()}${fileObject[i].name}`;
        let uploadPath = path.join(__dirname, '..', 'public', 'images', 'upload') + '/' + namePath;
        try {
            await fileObject[i].mv(uploadPath);
            resultArr.push(  {
                status: 'success',
                path: namePath,
                error: null
            })
            countSuccess++;
        } catch (err) {
            console.log('check error', err)
            resultArr.push({
                status: 'failed',
                path: null,
                error: JSON.stringify(err)
            })
        }
    }

    return {
        countSuccess: countSuccess,
        detail: resultArr
    }
}

module.exports = {
    uploadSingle,
    uploadMultipleFiles
}