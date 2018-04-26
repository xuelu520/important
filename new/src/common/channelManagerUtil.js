const ExportTool = require('js-export-excel-react');

const getRandomPassword = (minLength, maxLength) => {
    var text = ['abcdefghijklmnopqrstuvwxyz_', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '1234567890', '~@#$%^&*_+-='];
    var rand = function (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    var len = rand(minLength, maxLength); // 长度为6-12
    var pw = '';
    for (var i = 0; i < len; ++i) {
        var strpos = rand(0, 3);
        pw += text[strpos].charAt(rand(0, text[strpos].length-1));
    }
    return pw;
};

const dealDownloadTitle = (cols) => {
    let columns = cols.map(function (item) {
        if (item.dataIndex != '') {
            return item.title
        }
    });
    for (let i = 0; i < columns.length; i++) {
        if (typeof columns[i] == 'undefined') {
            columns.splice(i, 1);
            i--;
        }
    }
    return columns;
};

const dealDownloadColumns = (columns) => {
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].dataIndex == '') {
            columns.splice(i, 1);
            i--;
        }
    }
    return columns;
};

const dealDownloadData = (datas, columns) => {
    let newObjs = [];
    for (let j = 0; j < datas.length; j++) {
        newObjs[j] = {};
    }
    for (let i = 0; i < columns.length; i++) {
        let curKey = columns[i].dataIndex;
        for (let j = 0; j < datas.length; j++) {
            let curObj = datas[j];
            switch (curKey) {
                case 'appCode' :
                    newObjs[j][curKey] = curObj[curKey] == '24' ? 'Android' : 'iOS';
                    break;
                case 'channelCategory' :
                    newObjs[j][curKey] = curObj[curKey] == '1' ? '线上' : '线下';
                    break;
                case 'isFree' :
                    newObjs[j][curKey] = curObj[curKey] == '0' ? '是' : '否';
                    break;
                default:
                    newObjs[j][curKey] = curObj[curKey];
            }
        }
    }
    return newObjs;
};

const getDownloadName = (data) => {

    let prefix = '机型管理-';
    let fileName = '全部';
    if (data.brand) {
        fileName = data.brand;
    } else if (data.firm) {
        fileName = data.firm;
    } else if (data.deviceModel) {
        fileName = data.deviceModel;
    } else if (data.appCode) {
        fileName = data.appCode == '24' ? 'Android' : 'iOS';
    }
    return prefix + fileName + '.xlsx';
};

const downloadExcle = (dataList, columns, fileName) => {
    let option = {};
    option.fileName = fileName;
    option.datas = [
        {
            sheetData: dataList,
            sheetHeader: columns
        }
    ];
    let toExcel = new ExportTool(option);
    toExcel.saveExcel();
};

export {
    getRandomPassword,
    getDownloadName,
    downloadExcle,
    dealDownloadTitle,
    dealDownloadData,
    dealDownloadColumns
};