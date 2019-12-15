<template>
	<el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
		<el-button class="buttonimg">
			<img class="showimg" :src="collapsed?imgshow:imgsq" @click="doToggle()">
		</el-button>
		<el-submenu index="2" class="submenu">
			<!-- <template slot="title">超级管理员</template> -->
			<template slot="title">{{userName}}</template>
			<el-menu-item index="2-1"><i class="el-icon-s-tools" style="color: white;"></i>设&emsp;置</el-menu-item>
			<el-menu-item index="2-2"><i class="el-icon-user-solid" style="color: white;"></i>个人中心</el-menu-item>
			<el-menu-item @click="exit()" index="2-3"><i class="el-icon-switch-button" style="color: white;"></i>退&emsp;出</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		data: function() {
			return {
				collapsed: false,
				imgshow: require('../assets/img/show.png'),
				imgsq: require('../assets/img/sq.png')
			};
		},
		computed: {
      userName: function() {

				return this.$store.getters.userName;
			}
		},
		methods: {
			
			//退出系统的方法
			exit: function() {
				// this.$router.push({
				// 	path: '/'
				// })
				this.$confirm('你确定要退出系统吗？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '退出成功！'
					});
					this.$store.commit('clear');
					this.$router.push({
						path: '/Login'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '退出已取消！'
					});
				});
			},
			//左侧菜单折叠
			doToggle: function() {
				this.collapsed = !this.collapsed;
				this.$root.Bus.$emit("aside-toggle", this.collapsed);
			},
			doClear: function() {
				this.$store.commit('clear');
			}

		}
	}
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
	}

	.submenu {
		float: right;
	}

	.buttonimg {
		height: 60px;
		background-color: transparent;
		border: none;
	}

	.showimg {
		width: 26px;
		height: 26px;
		position: absolute;
		top: 17px;
		left: 17px;
	}

	.showimg:active {
		border: none;
	}
</style>
