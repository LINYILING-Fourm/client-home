<template>
    <transition name="fade" >
      <el-dialog v-model="showLogin" :style="{ top: dialogTop }"  :show-close="false"  width="250px"  :close-on-click-modal="false"  >  
        
          <el-button class="close-button" @click="closeDialog">×</el-button>
        
        <div class="login-form">

          <template v-if="currentTab === 1">
            <el-input type="text" v-model="username" placeholder="用户名" ref="usernameInput" @focus="handleFocus" @blur="handleBlur"/>
            <el-input type="password" v-model="password" placeholder="密码" ref="passwordInput" @focus="handleFocus" @blur="handleBlur"/>
            <el-button class="item-button" @click="login">登录</el-button>
            <el-button class="item-button" @click="switchToRegistration" style="margin-left:0;margin-bottom:0px;">注册</el-button>
          </template>
          
          <template v-if="currentTab === 2">
            <el-input type="text" v-model="username" placeholder="请设置用户名" ref="usernameSettingInput" @focus="handleFocus" @blur="handleBlur"/>
            <el-input type="password" v-model="password" placeholder="请设置密码" ref="passwordSettingInput" @focus="handleFocus" @blur="handleBlur"/>
            <el-input type="email" v-model="email" placeholder="请输入注册邮箱" ref="emailInput" @focus="handleFocus" @blur="handleBlur"/>
            <el-input type="text" v-model="checkCode" placeholder="请输入邮箱验证码" ref="checkCodeInput" @focus="handleFocus" @blur="handleBlur">
              <template #append>
                <el-button class="codeCatch" v-if="!counting" @click="handleGetVerificationCode">获取</el-button>
                <span v-else>{{ countdownSeconds }} s</span>
              </template>
            </el-input>
            <div>
              <el-button class="item-button" @click="register">注册</el-button>
              <el-button class="item-button showLogin" @click="switchToLogin" style="margin-left:0;margin-bottom:0px;">返回登录</el-button>
            </div>
          </template>
        </div>
      </el-dialog>
    </transition>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { sendVerificationCode } from '@/api/Login.ts'; // 引入发送验证码的 API 函数
  

  export default defineComponent({
    name: 'LoginDialog',
    props: {
      showLogin: Boolean,

    },
    data() {
      return {
        username: '',
        password: '',
        email: '',
        checkCode: '',
        currentTab: 1,
        dialogTop: '50%', // 初始化对话框垂直居中
        counting: false, // 倒计时状态
        countdownSeconds: 60, // 倒计时剩余秒数
      };
    },
    mounted() {
      console.log('LoginDialog created');
      if (this.isMobileDevice()) {
        this.setupKeyboardListeners();
      }
    },
    methods: {
      handleGetVerificationCode() {
        if (!this.counting) {
          // 倒计时开始
          this.counting = true;
          let seconds = this.countdownSeconds;
          const timer = setInterval(() => {
            seconds--;
            this.countdownSeconds = seconds;
            if (seconds <= 0) {
              clearInterval(timer);
              this.counting = false;
              this.countdownSeconds = 60; // 重置倒计时
            }
          }, 1000);
  
          // 向后端发送验证码请求
          sendVerificationCode(this.email)
            .then(response => {
              console.log('验证码发送成功', response);
            })
            .catch(error => {
              console.error('验证码发送失败', error);
            });
        }
      },
      setupKeyboardListeners() {
        const inputs = [
          this.$refs.usernameInput,
          this.$refs.passwordInput,
          this.$refs.usernameSettingInput,
          this.$refs.passwordSettingInput,
          this.$refs.emailInput,
          this.$refs.checkCodeInput,
        ];
  
        inputs.forEach((input) => {
          if (input) {
            input.addEventListener('focus', this.handleFocus);
            input.addEventListener('blur', this.handleBlur);
          }
        });
      },
      handleFocus() {
        if (this.isMobileDevice()) {
          this.adjustDialogPosition(true);
        }
      },
      handleBlur() {
        if (this.isMobileDevice()) {
          this.adjustDialogPosition(false);
        }
      },
      isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      },
      adjustDialogPosition(isKeyboardOpen) {
        this.dialogTop = isKeyboardOpen ? '30%' : '50%';
      },
      login() {
        // 模拟登录逻辑
        if (this.validateLogin()) {
          alert('登录成功！');
          this.closeDialog();
        } else {
          alert('用户名或密码错误，请重试。');
        }
      },
      validateLogin() {
        // 模拟登录验证逻辑
        return this.username === 'admin' && this.password === 'admin';
      },
      switchToRegistration() {
        // 切换到注册界面
        this.password = '';
        this.currentTab = 2;
      },
      switchToLogin() {
        // 返回到登录界面
        this.username = '';
        this.password = '';
        this.currentTab = 1;
      },
      closeDialog() {
        console.log('LoginDialog close');
        this.username = '';
        this.password = '';
        this.currentTab = 1;
        this.$emit('close');
      },
      register() {
        const userData = {
          username: this.username,
          password: this.password,
        };
  
        // 模拟注册逻辑
        if (this.validateRegister()) {
          alert('注册成功！'); // 模拟注册成功的提示
          console.log('注册成功，用户名：', userData.username);
          this.closeDialog();
        } else {
          alert('注册失败，请重试。'); // 模拟注册失败的提示
        }
      },
      validateRegister() {
        // 模拟注册验证逻辑
        return this.username !== '' && this.password !== '';
      },
    },
  });
  </script>
  
  <style scoped>


.el-dialog .el-dialog__header  {
  display: none ;
}


  .login-form {
   
    flex-direction: column;
    align-items: stretch; /* 确保子元素拉伸到相同宽度 */
  }
  
  .login-form .el-input {
    margin-bottom: 12px;
    padding: 1px;
    font-size: 12px;
    border: none;
    box-shadow: 0 2px 5px rgba(247, 245, 245, 0.1);
    border-radius: 4px;
    width: 100%;
    max-width: 100%; /* 设置最大宽度 */
  }
  
  .login-form .item-button {
    padding: 10px 8px;
    margin-bottom: 10px;
    font-size: 16px;
    background-color: #3d86d4;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 100%; /* 充满父容器宽度 */
    display: block; /* 块级元素 */
    text-align: center; /* 文本居中 */
    max-width: 100%; /* 设置最大宽度 */
  }
  
  .login-form .item-button:hover {
    background-color: #265587;
    transform: translateY(-2px);
  }
  
  .login-form .item-button:active {
    background-color: #1e4d7b;
    transform: translateY(0);
  }

  .close-button {
  position: absolute;
  top: 3px;
  right: 10px;
  background-color: transparent;
  color: #b94949;
  border: none;
  cursor: pointer;
  font-size: 20px;
}
  
  </style>
  