export default {
  setResturantNameByAsync: function(context, payload) {
    console.log('setResturantNameByAsync 开始执行(start).....');
    /* setTimeout(() => {
       context.commit('setResturantName', payload); //Action提交的是mutation
     }, 3000); */
    let _this = payload._this;
    let url = _this.axios.urls.SYS_VUEXACTION_EDIT;
    _this.axios.post(url, {
      resturantName: payload.resturantName
    }).then((resp) => {
      context.commit('setResturantName', {
        resturantName: resp.data.result
        // resturantName: payload.resturantName
      });
    }).catch((error) => {});

    console.log('setResturantNameByAsync 执行结束(end) .....');
  }
}
