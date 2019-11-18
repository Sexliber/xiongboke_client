// *
// * 全局过滤器
// *
export default {
    // 去除换行和空格
    textLength: function (value, length) {
        value = value + '';
        value = value.replace(/[\r\n]/g, "").replace(/[\n]/g, "").replace(/[\r]/g, "").replace(/[ ]/g, "");
        if (value.length <= length) {
            return value;
        } else {
            return value.substring(0, length) + '...';
        }
    },
    //过滤器,时间修饰
    dateMod: function (value) {
        var oldDate = new Date(value);
        var newDate = new Date();
        var dif = newDate - oldDate;
        if (dif / 1000 / 60 / 60 / 24 / 30 > 1) {
            return `${parseInt(dif / 1000 / 60 / 60 / 24 / 30)}个月前`;
        } else {
            if (dif / 1000 / 60 / 60 / 24 > 1) {
                return `${parseInt(dif / 1000 / 60 / 60 / 24)}天前`;
            } else {
                if (dif / 1000 / 60 / 60 > 1) {
                    return `${parseInt(dif / 1000 / 60 / 60)}个小时之前`;
                } else {
                    if (dif / 1000 / 60 > 1) {
                        return `${parseInt(dif / 1000 / 60)}分钟以前`;
                    }
                }
            }
        }
    },
    // 过滤器,整数0占位到指定长度
    numPlace: function (value, length) {
        var mtp = length - value.toString().length;
        var numPlace = value.toString();
        for (var i = 0; i < mtp; i++) {
            numPlace = 0 + numPlace;
        }
        return numPlace;
    },
    // 过滤器,未定义值转换为指定文字
    undefinedTo: function (value, toString) {
        if (value == undefined || value == "") return toString;
        else return value;
    }
}