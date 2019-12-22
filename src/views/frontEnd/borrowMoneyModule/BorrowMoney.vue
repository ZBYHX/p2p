<template>
  <div style="background-color: #E9F6FC ">

    <div>
      <img src="../static/images02/IMG_20191221_092451.png" width="1700px" height="320px">
      <hr style="color: pink;"/>
    </div>
    <!--图片下部分-->
    <div class="myCss001">
      <div style="padding-top: 70px;">
        <el-row style="text-align: center;">
          <el-button size="medium" type="default" class="myCss002">中等按钮</el-button>&emsp;&emsp;
          <el-button size="medium" type="default" class="myCss002">中等按钮</el-button>&emsp;&emsp;
          <el-button size="medium" type="default" class="myCss002">中等按钮</el-button>&emsp;&emsp;
          <el-button size="medium" type="default" class="myCss002">中等按钮</el-button>
        </el-row>
      </div>

      <div style="width:80%;color: #9ab9cc;margin: auto;font-weight: bold;margin-top: 20px;">
        <hr/>
      </div>

      <div>
        <!--第一部分   左边-->
        <div style="width: 35%;display: inline-block;background-color: lightcyan;" >

              <div style="color:gray;margin-top: 50px;margin-left: 12px;">
                <p>亿人宝平台的借款功能旨在帮助借款用户以 </p>
                <p>低成本获得借款。用户在需要资金时，可以将</p>
                <p> 自有房产和车产作为抵押物，小油菜线下审核</p>
                <p> 通过后，根据抵押物的价值融资。</p>
              </div>
              <hr style="width: 85%;"  />

              <div style="color:gray;margin-top: 20px;margin-left: 12px;">
                <p>亿人宝平台的借款功能旨在帮助借款用户以 </p>
                <p>低成本获得借款。用户在需要资金时，可以将</p>
                <p> 自有房产和车产作为抵押物，小油菜线下审核</p>
                <p> 通过后，根据抵押物的价值融资。</p>
              </div>
              <hr style="width: 85%;"  />

              <div style="color:gray;margin-top: 20px;margin-left: 12px;">
                <el-tag type="warning"
                        style="width: 150px;height: 40px;text-align: center;font-size: 16px;">申&emsp;请&emsp;条&emsp;件</el-tag>
                <div class="contain" style="margin-left: 40px;">
                  <p>
                    <el-button icon="el-icon-user" style="width: 245px;">年满18周岁以上的公民&emsp;&emsp;&emsp;</el-button>
                  </p>
                  <p>
                    <el-button icon="el-icon-house" style="width: 245px;"> 需要北京房产或车产抵押&emsp;&emsp;</el-button>
                  </p>
                  <p>
                    <el-button icon="el-icon-office-building" style="width: 245px;"> 个人或企业银行征信记录良好</el-button>
                  </p>
                  <p>
                    <el-button icon="el-icon-no-smoking" style="width: 245px;"> 无现有诉讼记录&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</el-button>
                  </p>
                </div>
              </div>
              <hr style="width: 85%;"  />

              <div style="color:gray;margin-top: 20px;margin-left: 12px;">
                <el-tag type="warning"
                        style="width: 150px;height: 40px;text-align: center;font-size: 16px;">提&emsp;交&emsp;资&emsp;料</el-tag>
                <div style="margin-left: 40px;">
                  <p>
                    <el-button icon="el-icon-postcard"  style="width: 200px;"> 身&ensp;份&ensp;证</el-button>
                  </p>
                  <p>
                    <el-button icon="el-icon-s-ticket" style="width: 200px;"> 申请资料</el-button>
                  </p>
                  <p>
                    <el-button icon="el-icon-s-finance" style="width: 200px;"> 其&emsp;&ensp;他</el-button>
                  </p>
                </div>

              </div>
            </div>
            <!--第二部分  右边-->
            <div style="width: 65%;display: inline-block;float: right;">
              <div style="margin-left: 7px;margin-top: 60px;margin-right: 40px;">



                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动时间">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                  </el-form-item>
                  <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                      <el-checkbox label="地推活动" name="type"></el-checkbox>
                      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>


              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  .myCss002 {
    width: 150px;
    height: 60px;
    font-size: 20px;
  }

  .myCss002:hover {
    background-color: dodgerblue;
    color: white;
  }


  .myCss01:hover {
    font-weight: bold;
  }

  .contain p {
    color: #9c9c9c;
  }

  .myCss001 {
    margin: auto;
    width: 70%;
    background-color: white;
    margin-top: 50px;
  }
</style>

