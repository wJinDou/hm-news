<template>
  <div>
      <div class="search_header">
          <div class="back" @click="back" >
              <span class="iconfont iconjiantou2" ></span>
          </div>
          <div class="search">
            <span class="iconfont iconsearch" ></span>
              <input @keyup.enter="onSearch" ref="input" @input="_searching" type="search" v-model="key" placeholder="通灵兽消失术" >
          </div>
          <div class="btn" @click="onSearch" >搜索</div>
      </div>
      <div class="recommend_list" v-if="recommendList.length" >
        <div class="item" v-for="item in recommendList" @click="goSearch(item.title)" :key="item.id" >{{item.title}} <span class="iconfont iconjiantou1" ></span> </div>
      </div>
      <div v-else-if="list.length" >
        <hm-post :post='item' v-for="item in list" :key="item.id" ></hm-post>
      </div>
      <div v-else >
        <div class="history public">
          <h3>历史记录 <span @click="clearHistory" >清空历史记录</span> </h3>
          <div class="history_list publi_list ">
            <div class="item" v-for="item in history_list" :key="item" @click="goSearch(item)" > {{item}} </div>
          </div>
          <hr>
        </div>
        <div class="hot public">
          <h3>热门搜索</h3>
          <div class="hot_list publi_list ">
            <div class="item" v-for="item in hot_list" :key="item" @click="goSearch(item)" > {{item}} </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      key: '',
      list: [],
      history_list: [],
      hot_list: ['茄子', '情火', '华为', '大事', '文章', '埃及'],
      recommendList: [],
      // 控制页面有内容时是否进行发送请求
      flag: false
    }
  },
  mounted () {
    console.log('渲染完dom')
    this.$refs.input.focus()
  },
  created () {
    const history_list = JSON.parse(localStorage.getItem('history_list')) || []
    this.history_list = history_list
  },
  destroyed () {
    clearTimeout(this.timeid)
  },
  methods: {
    // 发送请求获取搜索的内容
    async onSearch () {
      if (!this.key) return this.$toast('请输入内容')
      this.flag = true
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
      this.recommendList = []
      this.history_list = this.history_list.filter(item => {
        return item !== this.key
      })
      this.history_list.unshift(this.key)
      localStorage.setItem('history_list', JSON.stringify(this.history_list))
    },
    // 回退按钮的功能
    back () {
      if (this.key) {
        this.list = []
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    // 历史记录搜索
    goSearch (item) {
      this.key = item
      this.onSearch()
    },
    // 清空历史记录
    clearHistory () {
      localStorage.removeItem('history_list')
      this.history_list = []
    },
    // 输入框输入内容搜索-手动防抖
    async searching () {
      clearTimeout(this.timeid)
      this.timeid = setTimeout(async () => {
        if (!this.key) return this.$toast('请输入内容')
        const res = await this.$axios.get('/post_search', {
          params: {
            keyword: this.key
          }
        })
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data)
          this.recommendList = data
        }
      }, 1000)
    },
    // 鲁大师内容搜索-插件防抖
    _searching: _.debounce(async function () {
      if (!this.key) return this.$toast('请输入内容')
      if (this.flag) return this.$toast('页面已有内容，无需再次请求')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log(data)
        this.recommendList = data
      }
    }, 1000)
  },
  watch: {
    key (val) {
      if (!val) {
        this.list = []
        this.recommendList = []
      }
      this.flag = false
    }
  }
}
</script>

<style lang="less" scoped >
.recommend_list{
  margin-top: 20px;
  padding: 0 20px;
  .item {
    padding: 12px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    span {
      float: right;
    }
  }
}
.public{
  margin-top: 20px;
  padding: 0 20px;
  h3 {
    font-size: 16px;
    span {
      float: right;
      color: #666;
      font-size: 14px;
      font-weight: normal;
    }
  }
  hr {
    border-color: #fefefe;
  }
  .publi_list{
    padding: 20px 0;
    overflow: hidden;
    .item {
      font-size: 14px;
      width: 56px;
      height: 30px;
      background-color: #eee;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 30px;
      float: left;
      margin: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-spacing :normal;
    }
  }
}
.search_header{
  display: flex;
  height: 50px;
  align-items: center;
  padding: 10px ;
  text-align: center;
  .back,.btn {
    width: 45px;
  }
  .search{
    flex: 1;
    position: relative;
    input {
      width: 100%;
      border-radius: 35px;
      height: 35px;
      border: 1px solid #ccc;
      outline: none;
      font-size: 14px;
      padding-left: 36px;
    }
    .iconsearch{
      position: absolute;
      top: 10px;
      left: 15px;
      color: #666;
    }
  }
  .back{
    padding-right: 10px;
    .iconjiantou2 {
      font-size: 18px;
    }
  }
  .btn{
    padding-left: 10px;
    font-size: 16px;
    color: #666;
  }
}
</style>
