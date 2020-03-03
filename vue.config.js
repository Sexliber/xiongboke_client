const path = require('path');
const config = {

	// api代理
	devServer: {
		proxy: "http://localhost:8888",
		port: 9999,     // 端口
	},

	// *
	// * 取消eslint验证(如无此操作,上述配置可能无效)
	// *
	lintOnSave: false
};

module.exports = config;