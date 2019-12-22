export default {
	// type(事件类型)： 其值为setResturantName
	// payload：官方给它还取了一个高大上的名字：载荷，其实就是一个保存要传递参数的容器
	setResturantName: function(state, payload) {
		state.resturantName = payload.resturantName;
	},
  setUserName: function(state, payload) {
		state.userName = payload.userName;
	},
	setJwt: function(state, payload) {
		state.jwt = payload.jwt;
	},
	clear: function(state) {
		for (let attrName in state) {
			state[attrName] = null;
		}
	},
	setUserId: function(state, payload) {
		state.userId = payload.userId;
	},
	setMyid: function(state, payload) {
		state.myid = payload.myid;
	},
	setMyurls: function(state, payload) {
		state.myurls = payload.myurls;
	},
  setMyPath: function (state, payload) {
    state.myPath = payload.myPath;
  },
  setMyPersonId: function (state, payload) {
    state.myPersonId = payload.myPersonId;
  },
  setNickname: function (state, payload) {
    state.nickname = payload.nickname;
  },
  setPathUserId: function (state, payload) {
    state.pathUserId = payload.pathUserId;
  },
  setHeadImage: function (state, payload) {
    state.headImage = payload.headImage;
  },
  setTempName:function (state, payload) {
    state.tempName = payload.tempName;
  },
  setTempUserid: function (state, payload) {
    state.tempUserid = payload.tempUserid;
  }
}


