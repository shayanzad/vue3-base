export default defineNuxtRouteMiddleware((to, from) => {
    // فقط در سمت کلاینت به localStorage دسترسی داریم
    if (process.client) {
      const token = localStorage.getItem('token');
  
      // اگر توکن وجود ندارد، کاربر را به صفحه ورود هدایت کن
      if (!token) {
        return navigateTo('/auth/login');
      }
    }
  });
