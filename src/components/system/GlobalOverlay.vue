<!-- <template>
  <div v-if="visible" class="global-overlay">
  </div>
</template>

<script>
import { ref,  onUnmounted } from 'vue';

export default {
  name: 'GlobalOverlay',
  setup() {
    const visible = ref(false);

    // 监听弹窗数量的变化，控制笼罩层的显示状态
    const handleOverlayVisibility = () => {
      const dialogs = document.querySelectorAll('.modal-dialog'); // 适配实际弹窗组件的选择器
      visible.value = dialogs.length > 0; // 当弹窗数量大于0时显示笼罩层，否则隐藏
    };




    // 页面加载时初始化监听
    handleOverlayVisibility();

    // 监听页面上弹窗组件的动态变化
    const observer = new MutationObserver(handleOverlayVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    // 组件销毁时移除监听
    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      visible,
    };
  },
};
</script>

<style scoped>
.global-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
  z-index: 999;
  transition: opacity 0.3s ease; /* 可根据需要添加过渡效果 */
}
</style> -->


<template>
  <transition name="fade">
    <div v-if="showOverlay" class="overlay"></div>
  </transition>
</template>

<script>
export default {
  props: {
    showOverlay: Boolean
  }
};



</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; /* 确保在导航栏之上 */
}
</style>
