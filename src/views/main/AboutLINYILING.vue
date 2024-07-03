<template>
  <div class="aboutPage">
    <div class="left-column">
      <!-- Left side with photo -->
      <img src="@/assets/images/about/LINYILING.jpg" alt="Designer's Photo" class="about-photo">
    </div>
    <div class="right-column">
      <!-- Right side with personal experiences -->
      <div class="personal-experiences">
        <!-- Your personal experiences content here -->
        <h2>LINYILING的个人简介</h2>
        <p>       
          1998年4月出生于中国福州的一个普通家庭，喜欢美术和口琴，对理科有强烈兴趣。
          毕业于福建师范大学外语系，大学期间同时拿到文学学位和经济学学位。
          2019年初次接触编程，最早接触的编程语言使python，到目前为止已经自学了java、python和vue.js，用过springboot和mybatis以及
          mybatis-plus等框架，善于设计数据库以及数据库相关代码。
        </p>
        <p>
          
          本网站是用vue3和springboot为基础框架编写，参考了vue项目的主流设计框架，其中涉及到的技术栈有vuex、element、ajax、mybatis，
          这是一个前后端分离的项目，由于前后端分离的项目布恩那个用session共享数据，因此利用token进行用户登录信息管理以及和后端进行数据交互，
          jwt加密技术辅助，防止用户利用封包跨权限滥发请求。
          
        </p>
        <p>

          所有代码都已经开源，有需要的朋友可以到我的githap下载，欢迎学习以及提交修改建议。
        </p>

        
      </div>
    </div>
  </div>
</template>

<style scoped>
.aboutPage {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.left-column {
  width: 30%;
  max-width: 400px;
  min-width: 200px;
  position: sticky;
  top: 20px;
}

.about-photo {
  width: 100%;
  display: block;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.right-column {
  flex: 1;
  margin-left: 30px; /* Adjust margin as needed */
}

.personal-experiences {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.personal-experiences h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}



</style>