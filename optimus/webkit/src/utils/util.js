/**
 * 通用工具类
 * User: gaogy
 * Date: 2016/12/26
 * Time: 20:26
 */

let miliFormat = (() => {
    let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
    let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
    return (num) => num && num.toString()
        .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','))
})();

let compare = (prop) => {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}

function stringToBytes(str) {
    var ch = [];
    var st = [];
    var re = [];
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push(ch & 0xFF);  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while (ch);
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat(st.reverse());
    }
    // return an array of bytes
    return re;
}

/**
 * 数组去重
 * @param array
 * @returns {Array}
 */
function arrayUnique(array) {
    var res = [];
    var json = {};
    for (var i = 0; i < array.length; i++) {
        if (!json[array[i]]) {
            res.push(array[i]);
            json[array[i]] = 1;
        }
    }
    return res;
}

/**
 * 单位转换
 * @param size
 * @returns {*}
 */
function unitTransform(size) {
    if (!isNaN(Number(size)) && Number(size) && Number(size) >= 0) {
        var i = 0;
        var units = ['B', 'KB', 'M', 'G', 'T'];
        while (Math.abs(size) >= 1024) {
            size = size / 1024;
            i++;
            if (i === 4) {
                break;
            }
        }
        var newSize = ((Number)(size)).toFixed(2);
        return (newSize + ' ' + units[i]);
    } else {
        return '0B';
    }

    if (typeof size === 'number') {

    } else if (typeof size === 'string') {
        if (isNaN(Number(size))) {
            return '0B'
        } else {

        }
    } else {
        return '0B'
    }
}

/**
 * 字符串截取
 * @param str
 * @param len
 * @returns {*}
 */
function cutStr(str, len) {

    if (!str) {
        return '-';
    }

    let strLength = 0;
    let strLen = 0;
    let strCut = '';
    strLen = str.length;
    for (let i = 0; i < strLen; i++) {
        let a = str.charAt(i);
        strLength++;
        if (escape(a).length > 4) {
            // 中文字符的长度经编码之后大于4
            strLength++;
        }
        strCut = strCut.concat(a);
        if (strLength >= len) {
            strCut = strCut.concat('...');
            return strCut;
        }
    }
    // 如果给定字符串小于指定长度，则返回源字符串；
    if (strLength < len) {
        return str;
    }
}

/**
 * 日期字符串格式化
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param date
 * @param fmt
 * @returns {*}
 */
function dateFormat(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,                 // 月份
        'd+': date.getDate(),                    // 日
        'h+': date.getHours(),                   // 小时
        'm+': date.getMinutes(),                 // 分
        's+': date.getSeconds(),                 // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}

/**
 * 输入Excel
 *
 * @param targetId
 * @param json
 * @param type
 */
function downloadExl(targetId, json, type) {
    var tmpDown = '';
    var keyMap = [];// 获取键
    for (let k in json[0]) {
        keyMap.push(k);
    }
    var tmpdata = [];// 用来保存转换好的json
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    var outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
    var tmpWB = {
        SheetNames: ['数据明细'], // 保存的表标题
        Sheets: {
            '数据明细': Object.assign({}, tmpdata, // 内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                })
        }
    };
    tmpDown = new Blob([s2ab(window.XLSX.write(tmpWB,
        {bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}// 这里的数据是用来定义导出的格式类型
    ))], {
        type: ''
    });

    // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); // 创建对象超链接
    document.getElementById(targetId).href = href; // 绑定a标签
    document.getElementById(targetId).click(); // 模拟点击实现下载
    setTimeout(function () { // 延时释放
        URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

function s2ab(s) { // 字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    // let temCol = '';
    let s = '';
    let m = 0;
    while (n > 0) {
        m = n % 26 + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
    }
    return s
}

export { miliFormat, compare, stringToBytes, arrayUnique, unitTransform, cutStr, dateFormat, downloadExl }
