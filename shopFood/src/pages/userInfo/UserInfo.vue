<template>
    <div>
      <Header title="个人资料">
        <section class="h_back" @click="$router.go(-1)" slot="left">
          <i class="iconfont icon-jiantou2"></i>
        </section>
      </Header>

      <div class="main">
        <h3>基础信息</h3>
        <ul>
          <li @click="open_a">
            <span>头像</span>
            <div class="r">
              <img :src="avatar_url"   alt="">
              <i class="iconfont icon-jiantou1"></i>
            </div>
          </li>
          <li @click="open_n">
            <span>用户名</span>
            <div class="r">
               <p>{{user.name?user.name:"未知"}}</p>
              <i class="iconfont icon-jiantou1"></i>
            </div>
          </li>
          <li @click="open_p">
            <span>手机号</span>
            <div class="r">
              <p>{{user.phone?user.phone:"未知"}}</p>
              <i class="iconfont icon-jiantou1"></i>
            </div>
          </li>
          <li  @click="open_r">
            <span>收货地址</span>
            <div class="r">
              <i class="iconfont icon-jiantou1"></i>
            </div>
          </li>
        </ul>
      </div>

      <div class="avatar">
        <mt-popup
          v-model="show_a"
          position="bottom">
          <ul class="pop_a">
            <li>
              <label class="input_file">
                <input type="file"  @change="avatar_choose"/>
                <span>上传图片</span>
              </label>
            </li>
            <li @click="close_a">取消</li>
          </ul>
        </mt-popup>
      </div>

      <div class="userName">
        <Toast_r :show="show_n" :close="close_n" title="用户名">
          <section slot="main" class="pop_n">
            <div class="input">
              <input type="text" v-model="name" placeholder="用户名" maxlength="11">
            </div>
            <div class="ok" @click="update_name">
             <button>确认修改</button>
            </div>
          </section>
        </Toast_r>
      </div>

      <div class="phone">
        <Toast_r :show="show_p" :close="close_p" title="电话号码">
          <section slot="main" class="pop_p">
            <div class="input">
              <input type="text" placeholder="电话号码" maxlength="11" v-model="phone">
            </div>
            <div class="ok" @click="update_phone">
              <button>确认修改</button>
            </div>
          </section>
        </Toast_r>
      </div>

      <div class="address">
        <Toast_r :show="show_r" :close="close_r" title="地址编辑">
          <section slot="main" class="pop_r">
            <ul>
              <li v-for="(item,index) in user.address" @click="close_delete" :key="index">
                <div class="top">
                  <p>{{item.adr}}</p>

                </div>

                <div class="bottom">
                  <span>{{item.name}}</span>
                  <p>{{item.phone}}</p>
                </div>

                <div class="right" @click.stop="delete_show(index)">
                  <i  class="iconfont icon-bianji"></i>
                </div>

                <div class="delete" @click.stop="start_delete(index)"
                :class="{delete_active:index===delete_num}">
                  <span>删除</span>
                </div>
              </li>
            </ul>

            <div class="add" @click="open_ad">
              <span>新添</span>
              <div class="r">
                <i class="iconfont icon-jiantou1"></i>
              </div>
            </div>
          </section>
        </Toast_r>
      </div>


      <div class="add_address">
        <Toast_r :show="show_ad" :close="close_ad" title="新增地址">
          <section slot="main" class="pop_ad">
            <ul>
              <li>
                <span>联系人</span>
                <input type="text" placeholder="姓名" v-model="address.name">
              </li>
              <li>
                <span>电话</span>
                <input type="text" placeholder="手机号码" maxlength="11" v-model="address.phone">
              </li>
              <li>
                <span>地址</span>
                <input type="text" placeholder="收货地址" v-model="address.adr">
              </li>
            </ul>
            <div class="ok" @click="add_adr">
              <button>确认</button>
            </div>
          </section>
        </Toast_r>
      </div>

    </div>
</template>

<script>
  import Header from "../../components/header/Header"
  import Toast_r from  "../../components/toast/Toast1"
  import  {mapState} from  "vuex"
  export default {
    name: 'UserInfo',
    components:{
      Header,Toast_r
    },
    data(){
      return {
        show_a:false,
        show_n:false,
        show_p:false,
        show_r:false,
        show_ad:false,
        delete_num:-1,
        update_avatar:false,
        name:"",
        phone:"",
        address:{
          name:"",
          phone:"",
          adr:""
        }
      }
    },
    methods:{
      close_a(){
        this.show_a=false;
      },
      open_a(){
        this.show_a=true;
      },
      close_n(){
        this.show_n=false;
      } ,
      open_n(){
        this.show_n=true;
      },
      close_p(){
        this.show_p=false;
      } ,
      open_p(){
        this.show_p=true;
      },
      close_r(){
        this.show_r=false;
      } ,
      open_r(){
        this.show_r=true;
      },
      delete_show(index){
        this.delete_num=index;
      },
      close_delete(){
        this.delete_num=-1;
      },
      start_delete(index){
        this.$store.dispatch("remove_address",index);
        this.delete_num=-1;
      },
      close_ad(){
        this.show_ad=false;
      } ,
      open_ad(){
        this.show_ad=true;
      },
      avatar_choose(el) {
        var file = el.target.files[0];
        if (file.type.indexOf("image") !== -1) {
          var reader = new FileReader();
          reader.readAsDataURL(file);//发起异步请求
          var that=this;
          reader.onload = function () {
            var data={
              to:"avatar",
              result:this.result
            }
            that.$store.dispatch("update_userInfo",data)
            that.show_a=false;
          }
        }
      },
      update_name(){
        var data={
          to:"name",
          result:this.name
        }
        this.$store.dispatch("update_userInfo",data);
        this.show_n=false;
        this.name="";

      },
      update_phone(){
        var data={
          to:"phone",
          result:this.phone
        }
        this.$store.dispatch("update_userInfo",data);
        this.show_p=false;
        this.phone="";
      },
      add_adr(){
        var data={
          to:"address",
          result:this.address
        }
        this.$store.dispatch("update_userInfo",data);
        this.show_ad=false;
        this.address={
          name:"",
          phone:"",
          adr:""
        }
      }
    },
    computed:{
      ...mapState(["user"]),
      avatar_url(){
        if (this.user.avatar){
          return this.user.avatar;
        } else{
          return "//p1.meituan.net/codeman/e32b47a07b818bf9a1d4086a882c18a62282.png"
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .h_back{
    width: 45/@r;
    height: 100%;
    position: absolute;
    i{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      font-size: 22/@r;
      color: white;
    }
  }
  .main{
    margin-top: 20/@r;
    padding-left: 12/@r;
    h3{
      font-size: 16/@r;
      color: #666;
    }
    ul{
      margin-top:6/@r ;
      li{
        height: 50/@r;
        border-bottom: 0.04rem solid #e4e4e4;
        span{
          font-size: 16/@r;
          line-height: 50/@r;
        }
        .r{
          float: right;
          display: flex;
          height: 100%;
          padding-right: 5/@r;
          align-items: center;
          img{
            border-radius:50%;
            border: 1/@r solid  #999;
            //padding-top: 5/@r;
            width: 40/@r;
            height: 40/@r;
          }
          i{
            color: #999;
            padding-left: 5/@r;
            line-height: 50/@r;
            font-size: 12/@r;
          }
          p{
            font-size: 16/@r;
            color: #666;
          }
        }
      }
    }
  }
  .pop_a{
    width: 100vw;
    li{
      width: 100%;
      height: 40/@r;
      line-height: 40/@r;
      font-size: 16/@r;
      text-align: center;
      border-bottom: 0.04rem solid #e4e4e4;
      box-sizing: border-box;
    }
    li:last-child{
      border: none;
    }
  }
  .pop_n,.pop_p{
    .input{
      margin: 20/@r 0;
      width: 100%;
      height: 40/@r;
      text-align: center;
      input{
        width: 98%;
        height: 40/@r;
        border: 0.04rem solid #e4e4e4;
        box-sizing: border-box;
        font-size: 16/@r;
        line-height: 40/@r;
        text-indent: 10/@r;
      }
    }
    button{
      width: 90%;
      margin: 0 auto;
      display: block;
      font-size: 18/@r;
      padding: 6/@r;
      background: lightcoral;
      border-radius: 8/@r;
      color: white;
    }
  }
  .pop_r{
    background: #eee;
    ul{
      background: white;
      margin-bottom: 10/@r;
      li{
        position: relative;
        width: 100%;
        height: 80/@r;
        padding-left: 20/@r;
        border-bottom: 0.04rem solid #e4e4e4;
        box-sizing: border-box;
        .top{
          p{
            font-size: 16/@r;
            font-weight: bold;
            padding-top: 10/@r;
            line-height: 30/@r;
            width: 80%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        .bottom{
          font-size: 14/@r;
          color: #999;
          p{
            line-height: 30/@r;
            display: inline;
          }
        }
        .right{
          position: absolute;
          z-index: 1;
          top: 30%;
          right: 10/@r;
          i{
            padding: 5/@r;
          }
        }
        .delete{
          visibility: hidden;
          position: absolute;
          transition: .2s;
          z-index: 2;
          width: 80/@r;
          height: 80/@r;
          background: red;
          top: 0;
          right: -100%;
          text-align: center;
          span{
            color: white;
            font-size: 18/@r;
            line-height: 80/@r;
          }
        }
        .delete_active{
          visibility: visible;
          right: 0;
        }
      }
    }
    .add{
      background: white;
      padding-left: 20/@r;
      height: 50/@r;
      border-bottom: 0.04rem solid #e4e4e4;
      span{
        font-size: 16/@r;
        line-height: 50/@r;
      }
      .r{
        float: right;
        display: flex;
        height: 100%;
        padding-right: 5/@r;
        align-items: center;
        i{
          color: #999;
          padding-left: 5/@r;
          line-height: 50/@r;
          font-size: 12/@r;
        }
      }
    }
  }
  .pop_ad{
    background: #eee;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    ul{
      margin-top: 10/@r;
      width: 100%;
      background: white;
      li{
        padding-left: 8/@r;
        border-bottom: 0.04rem solid #e4e4e4;
        box-sizing: border-box;
        width: 100%;
        height: 40/@r;
        span{
          font-weight: bold;
          font-size: 14/@r;
          line-height: 40/@r;
        }
        input{
          float: right;
          width: 84%;
          height: 38/@r;
          margin-top: 1/@r;
          outline: none;
          font-size: 14/@r;
        }
      }
    }
    button{
      width: 90%;
      margin: 15/@r auto;
      display: block;
      font-size: 18/@r;
      padding: 6/@r;
      background: lightcoral;
      border-radius: 8/@r;
      color: white;
    }
  }

  .input_file{
    width: 100%;
    display: block;
    box-sizing: border-box;
    input{
      display: none;
    }
    span{
      font-size: 16/@r;
      line-height: 40/@r;
    }
  }

</style>
