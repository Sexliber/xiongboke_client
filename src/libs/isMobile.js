// *
// * 判断是否为移动设备,是则返回true,否则返回false
// *
export default !function () {
    for (var n = window.navigator.userAgent, i = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"], o = !0, e = 0, r = i.length; e < r; e++)if (0 < n.indexOf(i[e])) { o = !1; break } if (!o) {
        return true;
    }
}();