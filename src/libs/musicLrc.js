// *
// * 音乐播放器lrc歌词处理
// *

// 未转义歌词数组
var lrcArrString = [0];

// 已转义歌词数组
var lrcArrParse = [0];

// 单句歌词转义,第一个参数为单句歌词对象,第二个参数为要存放的数组
var lineLrcParse = function (lineLrc, arr) {
    // 判断中括号内的是否为时间参数
    var timeString = lineLrc.time;
    if (timeString != undefined) {
        var lrc = lineLrc.lrc;
        if (parseInt(timeString.replace('[', '')) + 10) {
            var flag = true;
            while (flag) {
                var index = timeString.indexOf(']');
                if (index == -1){
                    flag = false;
                    break;
                }
                var calcTime = timeString.substring(1, index)
                var time = parseInt(calcTime.substring(0, calcTime.indexOf(':'))) * 60 +
                    parseInt(calcTime.substring(calcTime.indexOf(':') + 1, calcTime.indexOf('.')))

                arr[time] = lrc;
                timeString = timeString.substring(index + 1)
            }
        }
    }
    return;
}

// 歌词切割方法
var cutLrc = function (lrc) {

    // 歌词时间分离
    var doTime = function (cutLrc) {
        return {
            time: cutLrc.substring(
                cutLrc.indexOf("["),
                cutLrc.lastIndexOf("]") + 1
            ),
            lrc: cutLrc.substring(cutLrc.lastIndexOf("]") + 1)
        };
    }

    // 歌词转义
    var cutLrc = lrc.replace(/\n/g, "&line");
    var flag = true;
    var i = 0;
    while (flag) {
        var index = cutLrc.indexOf("&line");
        if (index != -1) {
            lrcArrString.splice(i, 1, doTime(cutLrc.substring(0, index)));
            cutLrc = cutLrc.substring(index + 5);
            i++;
        } else {
            lrcArrString.splice(i, 1, cutLrc);
            flag = false;
        }
    }
    return lrcArrString;
}

// 歌词处理对象
var DoLrc = function () {

    // 获取处理好的歌词
    this.parse = function (lrc) {

        // 获取未转义的歌词数组
        var lrcArrString = cutLrc(lrc);

        // 循环转义单句歌词
        var i = 0;

        for (i in lrcArrString) {
            lineLrcParse(lrcArrString[i], lrcArrParse);
        }

        // 赋予id号
        let m = 0;
        let id = 0;
        for (m in lrcArrParse) {
            if (lrcArrParse[m] != "") {
                var time = m;
                var lrc = lrcArrParse[m];
                lrcArrParse[m] = {
                    id: id,
                    lrc: lrc
                }
                id++;
            }
        }
        return lrcArrParse;
    }

    // 垃圾清理
    this.flush = function () {
        lrcArrString = [0];
        lrcArrParse = [0];
    }
}

// 接口
export default DoLrc;