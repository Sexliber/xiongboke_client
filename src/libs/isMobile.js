// *
// * 判断是否为移动设备,是则返回true,否则返回false
// *
export default (function () {
    var screenWidth = document.body.offsetWidth | document.documentElement.offsetWidth;
    if (screenWidth <= 1024) return true;
    else return false;
})();