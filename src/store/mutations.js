export default {
	// type(事件类型)： 其值为setResturantName
	// payload：官方给它还取了一个高大上的名字：载荷，其实就是一个保存要传递参数的容器
	setResturantName: function(state, payload) {
		state.resturantName = payload.resturantName;
	},
	setUsername: function(state, payload) {
		state.username = payload.username;
	},
	setJwt: function(state, payload) {
		state.jwt = payload.jwt;
	},
	clear: function(state) {
		for (let attrName in state) {
			state[attrName] = null;
		}
	},
	setUserid: function(state, payload) {
		state.userid = payload.userid;
	},
	setMyid: function(state, payload) {
		state.myid = payload.myid;
	},
	setMyurls: function(state, payload) {
		state.myurls = payload.myurls;
	}
}
