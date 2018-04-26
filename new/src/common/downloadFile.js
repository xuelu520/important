// parse data，改变数据格式
function sheetFromArrayOfArrays(data, opts) {
    var ws = {};
    var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
    for(var R = 0; R != data.length; ++R) {
        for(var C = 0; C != data[R].length; ++C) {
            if(range.s.r > R) range.s.r = R;
            if(range.s.c > C) range.s.c = C;
            if(range.e.r < R) range.e.r = R;
            if(range.e.c < C) range.e.c = C;
            var cell = {v: data[R][C] };
            if(cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
            if(typeof cell.v === 'number') cell.t = 'n';
            else if(typeof cell.v === 'boolean') cell.t = 'b';
            else cell.t = 's';
            ws[cell_ref] = cell;
        }
    }
    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

/*
 * ws的构造函数
 */

function Workbook() {
    if(!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

/*
 * 校验sheetName的重复性
 */
var allSheetNames = [];
var checkSheetName = function(name){
    if(!name) name = "new";
    if(allSheetNames.indexOf(name) == -1){
        allSheetNames.push(name);
        return name;
    }else{
        return checkSheetName(name += "_new");
    }
}

/*
 * 数据转换
 */
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}


// 导出数据格式为数组元素为数据;eg:[[], [], []];
// wb.SheetNames 为 Array，存放sheet数据; eg:["sheet1", "sheet2"];
// wb.Sheets 为JSON，存放以sheetName和data为键值对的数据; eg:
/*
 * {
 *      "sheet1": xxx,// xxx is sheetFromArrayOfArrays(data)
 *      "sheet2": xxx
 * }
 */

function toXlsx(data, wb_name, ws_name){
	if(arguments.length < 3){
		//console.error("参数错误");)
		return false;
	}
	var wb = new Workbook();
	var ws = sheetFromArrayOfArrays(data);// Excel data
	var ws_name = checkSheetName(ws_name);
	wb.SheetNames.push(ws_name);
	wb.Sheets[ws_name] = ws;
	var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
	saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), wb_name);
}


/*
 * ajax数据到下载数据的转换
 */
function formatData(data){
	var result = data || [[1,2,3],[true, false, "sheetjs"],["foo","bar","0.3"], ["baz", null, "qux"]];
	// data-->result = [[1,2,3],[true, false, "sheetjs"],["foo","bar","0.3"], ["baz", null, "qux"]];
	return result;
}

/*
 * 根据页面元素及规则获取下载文件的名称
 */
function getXlsxName(){
	var result = "test.xlsx";
	return result;
}

export {
	toXlsx,
	formatData,
	getXlsxName
}