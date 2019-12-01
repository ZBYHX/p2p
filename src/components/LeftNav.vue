<template>
	<!-- <el-menu :unique-opened="true" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
	 @close="handleClose" background-color="#334157" text-color="#fff" active-text-color="#ffd04b" :collapse="collapsed"
	 :collapse-transition="bb">
		<div class="logobox">
			<img class="logoimg" src="../assets/img/logo.png" alt="">
		</div>
		<el-submenu v-for="(t, index1) in treeNodeList" :key="index1" :index="'index-'+index1">
			<template slot="title">
				<i :class="t.right_icon"></i>
				<span>{{t.right_text}}</span>
			</template>
			<el-menu-item v-for="(childrens, index2) in t.children" :key="index2" :index="childrens.right_url">
				<template slot="title">
					<i :class="childrens.right_icon"></i>
					<span>{{childrens.right_text}}</span>
				</template>
			</el-menu-item>
		</el-submenu>
	</el-menu> -->
	<el-menu default-active="2" class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"
	 :collapse="collapsed" :collapse-transition="bb" >
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>导航一</span>
			</template>
			<el-menu-item-group>
				<template slot="title">分组一</template>
				<el-menu-item index="1-1">选项1</el-menu-item>
				<el-menu-item index="1-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
				<template slot="title">选项4</template>
				<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
			<span slot="title">导航二</span>
		</el-menu-item>
		<el-menu-item index="3" disabled>
			<i class="el-icon-document"></i>
			<span slot="title">导航三</span>
		</el-menu-item>
		<el-menu-item index="4">
			<i class="el-icon-setting"></i>
			<span slot="title">导航四</span>
		</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
		data: function() {
			return {
				bb: true,
				collapsed: false,
				treeNodeList: []
			};
		},
		created: function() {
			this.$root.Bus.$on("aside-toggle", (v) => {
				this.collapsed = v;
			});

		// 	let url = this.axios.urls.SYS_TREENODE_LISTALL;
		// 	let id = this.$store.getters.userid;
		// 	this.axios.post(url, {
		// 		userid: id
		// 	}).then((resp) => {
		// 		this.treeNodeList = resp.data.result;
		// 	}).catch((error) => {});

		// 	if (this.$store.getters.myid == null) {
		// 		this.$router.push({
		// 			path: '/wother/Img'
		// 		});
		// 		this.$store.commit('setMyid', {
		// 			myid: 0
		// 		});
		// 	}

		}
	}
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 400px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
		text-align: left;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}

	.el-menu-bg {
		background-color: #1f2d3d !important;
	}

	.el-menu {
		border: none;
	}

	.logobox {
		height: 40px;
		line-height: 40px;
		color: #9d9d9d;
		font-size: 20px;
		text-align: center;
		padding: 20px 0px;
	}

	.logoimg {
		height: 40px;
	}
</style>
