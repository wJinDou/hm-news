<template>
  <div>
      <hm-header>栏目管理</hm-header>
      <div class="delTab">
          <div>点击删除以下频道(最少保留4条)</div>
          <ul>
              <li v-for="item in activeList" @click="del(item.id)" :key="item.id" > {{item.name}} </li>
          </ul>
      </div>
      <div class="addTab">
          <div>点击添加以下频道</div>
          <ul>
              <li v-for="item in deactiveList" :key="item.id" @click="add(item.id)" > {{item.name}} </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      deactiveList: []

    }
  },
  created () {
    this.getTablist()
  },
  methods: {
    async getTablist () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
      if (activeList) {
        this.activeList = activeList
        this.deactiveList = deactiveList
        return
      }
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
      }
    },
    del (id) {
      if (this.activeList.length <= 4) return this.$toast('最少保留4条')
      const idx = this.activeList.findIndex((item) => {
        return item.id === id
      })
      this.deactiveList.push(this.activeList[idx])
      this.activeList.splice(idx, 1)
    },
    add (id) {
      const idx = this.deactiveList.findIndex((item) => {
        return item.id === id
      })
      this.activeList.push(this.deactiveList[idx])
      this.deactiveList.splice(idx, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler () {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped >
    .delTab,.addTab{
        font-size: 14px;
        color: #666;
        padding: 10px 15px;
        div{
            padding: 10px 0;
        }
        ul {
            overflow: hidden;
            li {
            width: 76px;
            height: 38px;
            border: 1px solid #999;
            margin: 5px;
            text-align: center;
            line-height: 38px;
            font-size: 18px;
            float: left;
            }
        }
    }
</style>
