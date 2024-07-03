<template>
  <div class="adminHome">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right: 5px">员工姓名：</label>
        <el-input
          v-model="input"
          placeholder="请输入员工姓名"
          style="width: 15%"
          clearable
          @clear="init"
          @keyup.enter.native="initFun"
        />
        <el-button class="normal-btn continue" @click="init(true)">查询</el-button>
        <el-button type="primary" style="float: right" @click="addEmployeeHandle('add')">+ 添加员工</el-button>
      </div>
      <el-table :data="tableData" stripe v-if="tableData.length" class="tableBox">
        <el-table-column prop="name" label="员工姓名" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column label="账号状态">
          <template #default="{ scope }">
            <div class="tableColumn-status" :class="{ 'stop-use': String(scope.row.status) === '0' }">
              {{ String(scope.row.status) === '0' ? '禁用' : '启用' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后操作时间" />
        <el-table-column label="操作" width="160" align="center">
          <template #default="{ scope }">
            <el-button
              type="text"
              size="small"
              class="blueBug"
              :class="{ 'disabled-text': scope.row.username === 'admin' }"
              :disabled="scope.row.username === 'admin'"
              @click="addEmployeeHandle(scope.row.id, scope.row.username)"
            >
              修改
            </el-button>
            <el-button
              :disabled="scope.row.username === 'admin'"
              type="text"
              size="small"
              class="non"
              :class="{
                'disabled-text': scope.row.username === 'admin',
                blueBug: scope.row.status == '0',
                delBut: scope.row.status != '0',
              }"
              @click="statusHandle(scope.row)"
            >
              {{ scope.row.status == '1' ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Empty v-else :is-search="isSearch" />
      <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import HeadLable from '@/components/HeadLable/index.vue'
import { getEmployeeList, enableOrDisableEmployee } from '@/api/employee'
import { UserModule } from '@/store/modules/user'
import InputAutoComplete from '@/components/InputAutoComplete/index.vue'
import Empty from '@/components/Empty/index.vue'

export default {
  name: 'Employee',
  components: {
    HeadLable,
    InputAutoComplete,
    Empty,
  },
  data() {
    return {
      input: '',
      counts: 0,
      page: 1,
      pageSize: 10,
      tableData: [],
      id: '',
      status: '',
      isSearch: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    initProp(val) {
      this.input = val
      this.initFun()
    },
    initFun() {
      this.page = 1
      this.init()
    },
    async init(isSearch) {
      this.isSearch = isSearch
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input || undefined,
      }
      try {
        const res = await getEmployeeList(params)
        if (String(res.data.code) === '1') {
          this.tableData = res.data?.data?.records || []
          this.counts = res.data?.data?.total || 0
        }
      } catch (err) {
        this.$message.error('请求出错了：' + err.message)
      }
    },
    addEmployeeHandle(st, username) {
      if (st === 'add') {
        this.$router.push({ path: '/employee/add' })
      } else {
        if (username === 'admin') {
          return
        }
        this.$router.push({ path: '/employee/add', query: { id: st } })
      }
    },
    statusHandle(row) {
      if (row.username === 'admin') {
        return
      }
      this.id = row.id
      this.status = row.status
      this.$confirm('确认调整该账号的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        enableOrDisableEmployee({ id: this.id, status: !this.status ? 1 : 0 })
          .then((res) => {
            if (String(res.status) === '200') {
              this.$message.success('账号状态更改成功！')
              this.init()
            }
          })
          .catch((err) => {
            this.$message.error('请求出错了：' + err.message)
          })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.page = val
      this.init()
    },
  },
  computed: {
    userName() {
      return UserModule.username
    },
  },
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
