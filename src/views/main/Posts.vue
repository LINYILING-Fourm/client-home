<template>
  <div class="posts-page">
    <!-- 帖子分类栏 -->
    <div class="category-section">
      <h2  v-if="windowWidth >= 629">帖子分类</h2>




      <div v-if="source === 'route'">
      <p>user</p>
    </div>
    <div v-else-if="source === 'direct'">
      <p>admin</p>
    </div>



    <el-button @click="addCategory" v-if="isAdmin">管理分类</el-button>

<el-button  class="admin-continue" @click="addClass('class')" v-if="isAdmin" style="margin-left:0;margin-bottom:0px;">新增分类</el-button>
<el-button  class="user-continue" @click="addClass('class')" v-if="isUser && source === 'route'" style="margin-left:0;margin-bottom:0px;">申请新增分类</el-button>




      <ul>
        <li v-for="(category, index) in categories" :key="index">
          {{ category.name }} 第{{ index }}个分类
          <button @click="deleteCategory(index)" v-if="category.posts.length === 0">删除</button>
        </li>


      </ul>
    </div>
  



    <!-- 帖子标题一览 -->
    <div class="posts-section">
      <!-- 右上角按钮栏 -->
      <div class="top-right-buttons">
        
        <el-button v-if="isAdmin&&source === 'route'" @click="toggleBatchMode">批量管理</el-button>
        <el-button v-if="isOwner" @click="toggleBatchMode">批量管理</el-button>



        <el-button v-if="isAdmin" @click="goToPostPage">发布</el-button>

        <el-button v-if="isUser" @click="goToPostPage">发布</el-button>

      </div>
  
      <div class="post-list">
        <div v-for="(post, index) in posts" :key="index" class="post-item">
          <input type="checkbox" v-model="selectedPosts" :value="post.id" v-if="batchMode">
          <span>{{ post.title }} 第{{ index }}个帖子</span>
        </div>
        <!-- 如果没有帖子，显示提示信息 -->
        <div v-if="posts.length === 0" class="no-post-message">暂无帖子</div>
      </div>
    </div>
  </div>



  <el-dialog :title="classData.title"
               :visible.sync="classData.dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form ref="classData"
               :model="classData"
               class="demo-form-inline"
               :rules="rules"
               label-width="100px">
        <el-form-item label="分类名称："
                      prop="name">
          <el-input v-model="classData.name"
                    placeholder="请输入分类名称"
                    maxlength="20" />
        </el-form-item>
        <el-form-item label="排序："
                      prop="sort">
          <el-input v-model="classData.sort"
                    placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="medium"
                   @click="
            ;(classData.dialogVisible = false), $refs.classData.resetFields()
                   ">取 消</el-button>
        <el-button type="primary"
                   :class="{ continue: actionType === 'add' }"
                   size="medium"
                   @click="submitForm()">确 定</el-button>
        <el-button v-if="action != 'edit'"
                   type="primary"
                   size="medium"
                   @click="submitForm('go')">
          保存并继续添加
        </el-button>
      </span>
    </el-dialog>



</template>

<script>
export default {
  name: 'Posts',
  props: {
    source: {
      type: String,
      required: true
    }
  },


  data() {
    return {
      categories: [], // 帖子分类数据
      posts: [], // 帖子数据
      isOwner:false,  //是否为最高管理者
      isAdmin: true, // 是否为管理员
      isUser: false, // 是否为会员
      batchMode: false, // 是否为批量管理模式
      selectedPosts: [] ,// 已选择的帖子
      windowWidth: window.innerWidth,

      classData: {
      title: '添加分类',
      dialogVisible: false,
      name: '',
      sort: ''
    }


    };
  },
  


  mounted() {
    window.addEventListener('resize', this.handleResize);
    },
    unmounted() {
    window.removeEventListener('resize', this.handleResize);
    },



  methods: {



    rules() {
    return {
      name: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            var reg = new RegExp('^[A-Za-z\u4e00-\u9fa5]+$');
            if (!value) {
              callback(new Error(this.classData.title + '不能为空'));
            } else if (value.length < 2) {
              callback(new Error('分类名称输入不符，请输入2-20个字符'));
            } else if (!reg.test(value)) {
              callback(new Error('分类名称包含特殊字符'));
            } else {
              callback();
            }
          }
        }
      ],
      sort: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value || String(value) === '0') {
              const reg = /^\d+$/;
              if (!reg.test(value)) {
                callback(new Error('排序只能输入数字类型'));
              } else if (Number(value) > 99) {
                callback(new Error('排序只能输入0-99数字'));
              } else {
                callback();
              }
            } else {
              callback(new Error('排序不能为空'));
            }
          }
        }
      ]
    }
  },



  // 添加分类
  addClass(st) {
      if (st === 'class') {
        this.classData.title = '新增菜品分类';
        this.type = '1';
      } else {
        this.classData.title = '新增套餐分类';
        this.type = '2';
      }
      this.action = 'add';
      this.classData.name = '';
      this.classData.sort = '';
      this.classData.dialogVisible = true;
      this.actionType = 'add';
    },
    // 修改分类
    editHandle(dat) {
      this.classData.title = '修改分类';
      this.action = 'edit';
      this.classData.name = dat.name;
      this.classData.sort = dat.sort;
      this.classData.id = dat.id;
      this.classData.dialogVisible = true;
      this.actionType = 'edit';
    },
    // 关闭弹窗
    handleClose(st) {
      console.log(this.$refs.classData, 'this.$refs.classData');
      this.classData.dialogVisible = false;
      this.$refs.classData.resetFields();
    },
    // 状态修改
    statusHandle(row) {
      this.id = row.id;
      this.status = row.status;
      this.$confirm('确认调整该分类的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'customClass'
      }).then(() => {
        enableOrDisableEmployee({ id: this.id, status: !this.status ? 1 : 0 })
          .then(res => {
            if (String(res.status) === '200') {
              this.$message.success('分类状态更改成功！');
              this.init();
            }
          })
          .catch(err => {
            this.$message.error('请求出错了：' + err.message);
          });
      });
    },
    // 删除分类
    deleteHandle(id) {
      this.$confirm('此操作将永久删除该分类，是否继续？', '确定删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleCategory(id)
          .then(res => {
            if (res.data.code === 1) {
              this.$message.success('删除成功！');
              this.init();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error('请求出错了：' + err.message);
          });
      });
    },
    // 数据提交
    submitForm(st) {
      if (this.action === 'add') {
        this.$refs.classData.validate(valid => {
          if (valid) {
            addCategory({
              name: this.classData.name,
              type: this.type,
              sort: this.classData.sort
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$message.success('分类添加成功！');
                  this.$refs.classData.resetFields();
                  if (!st) {
                    this.classData.dialogVisible = false;
                  }
                  this.init();
                } else {
                  this.$message.error(res.data.desc || res.data.msg);
                }
              })
              .catch(err => {
                this.$message.error('请求出错了：' + err.message);
              });
          }
        });
      } else {
        this.$refs.classData.validate(valid => {
          if (valid) {
            editCategory({
              id: this.classData.id,
              name: this.classData.name,
              sort: this.classData.sort
            })
              .then(res => {
                if (res.data.code === 1) {
                  this.$message.success('分类修改成功！');
                  this.classData.dialogVisible = false;
                  this.$refs.classData.resetFields();
                  this.init();
                } else {
                  this.$message.error(res.data.desc || res.data.msg);
                }
              })
              .catch(err => {
                this.$message.error('请求出错了：' + err.message);
              });
          }
        });
      }
   
  
    },

    
    // 发布帖子，跳转到帖子发布页面
    goToPostPage() {
      // 实现跳转到帖子发布页面的逻辑
    },
    // 切换批量管理模式
    toggleBatchMode() {
      this.batchMode = !this.batchMode;
    },
    
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  
}
};
</script>

<style scoped>
.posts-page {
  display: flex;
}



.category-section {
  height: 100vh; /* 设置分类栏的高度为视口高度 */
  background-color: #fff; /* 默认白色背景 */
  overflow-y: auto; /* 如果内容超出视口高度，允许垂直滚动 */

  width: 20%; 
  max-width: 250px; /* 固定最大宽度为 300px */
  box-sizing: border-box; /* 计算宽度包括内边距和边框 */
  padding: 5px; /* 示例添加内边距 */
}

.posts-section {
  flex: 1; 
}

.top-right-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}

.no-post-message {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #999;
}

.posts-section-no-data {
  background-color: #f2f2f2; /* 没数据时灰色背景 */
}




</style>