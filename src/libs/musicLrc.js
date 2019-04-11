// *
// * 音乐播放器lrc歌词处理
// *

// 未转义歌词数组
var lrcArrString = [0];

// 已转义歌词数组
var lrcArrParse = [0];

// 单句歌词转义,第一个参数为单句歌词对象,第二个参数为要存放的数组
var lineLrcParse = function (lineLrc, arr) {
    
    arr[0] = lineLrc;
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
            text: cutLrc.substring(cutLrc.lastIndexOf("]") + 1)
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
        var lrc = lineLrcParse(lrcArrString[6], lrcArrParse);
        console.log(lrcArrParse)

    }
}

// 接口
// export default doLrc;





















var lrc =
    `[ti:爱啦啦]
[ar:夏萝]
[offset:500]
[00:00.000] 作曲 : 朱思敏
[00:01.000] 作词 : 朱思敏
[00:16.82][01:04.85]衣服太多没洗干净
[00:18.85][01:06.79]就去看电视
[00:20.85][01:08.82]如果现在被你发现
[00:22.81][01:10.82]一定会生气
[00:24.85][01:12.86]花了好多时间写我的日记
[00:28.85][01:16.81]也许你会觉得我很孩子气
[00:32.00][01:20.81]
[00:32.83][01:20.81]只要和你靠在一起
[00:34.82][01:22.82]就会很甜蜜
[00:36.85][01:24.81]好象整个世界都是
[00:38.78][01:26.81]你给的空气
[00:40.85][01:28.80]你越不讲道理我就越想你
[00:44.83][01:32.81]难道其实是我我在发神经
[00:48.00][01:36.81]
[00:48.82][01:36.84][02:16.79][02:24.83][02:32.89]你爱我你不爱我
[00:50.79][01:38.81][02:18.79][02:26.79][02:34.83]你不爱我谁会爱我
[00:52.78][01:40.81][02:20.79][02:28.83][02:36.80]你烦我你烦着我
[00:54.83][01:42.80][02:22.79][02:30.79][02:38.80]你再烦我你就娶我
[00:56.82][01:44.97]
[02:00.91]我会一直一直一直
[02:02.82]一直在想你
[02:04.82]拿着橡皮擦不掉你
[02:06.82]脑子黑漆漆
[02:08.82]数着你的毛病你的坏脾气
[02:12.79]可是你很爱我那就原谅你
[02:40.89][02:44.87]La……
[02:48.89]`

var getLrc = new DoLrc();
getLrc.parse(lrc);