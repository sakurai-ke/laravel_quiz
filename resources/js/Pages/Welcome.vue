<template>
    <div>
      <Head title="Welcome" />
  
      <div class="relative min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:bg-gradient-to-b dark:from-blue-700 dark:to-blue-900">
        <!-- 白い丸 -->
        <div class="absolute w-60 h-60 bg-white opacity-20 top-1/8 left-1/4 rounded-full rotate-45 animate-bounce-slow" style="animation-delay: 0s;"></div>
        <div class="absolute w-96 h-96 bg-white opacity-20 top-3/4 left-2/3 rounded-full -rotate-45 animate-bounce-slow" style="animation-delay: 0.2s;"></div>
        <div class="absolute w-96 h-96 bg-white opacity-20 top-2/3 left-1/6 rounded-full -rotate-45 animate-bounce-slow" style="animation-delay: 0.4s;"></div>
        <div class="absolute w-72 h-72 bg-white opacity-20 bottom-2/3 left-3/4 rounded-full rotate-45 animate-bounce-slow" style="animation-delay: 0.6s;"></div>
        <div class="absolute w-48 h-48 bg-white opacity-20 top-2/4 right-3/4 rounded-full transform -translate-x-1/6 -translate-y-1/6 animate-bounce-slow" style="animation-delay: 0.8s;"></div>
        <div class="absolute w-36 h-36 bg-white opacity-20 top-1/4 right-3/4 rounded-full transform -translate-x-2/5 -translate-y-1/5 animate-bounce-slow" style="animation-delay: 0.6s;"></div>
        <div class="absolute w-36 h-36 bg-white opacity-20 top-1/4 left-3/4 rounded-full transform -translate-x-3/4 -translate-y-1/4 animate-bounce-slow" style="animation-delay: 0.4s;"></div>
        <div class="absolute w-36 h-36 bg-white opacity-20 bottom-1/4 left-1/4 rounded-full transform -translate-x-1/3 -translate-y-1/3 animate-bounce-slow" style="animation-delay: 0.2s;"></div>
        <div class="absolute w-24 h-24 bg-white opacity-20 top-2/3 left-2/3 rounded-full transform -translate-x-2/3 -translate-y-2/3 animate-bounce-slow" style="animation-delay: 0s;"></div>
        <div class="absolute w-24 h-24 bg-white opacity-20 top-3/4 left-1/4 rounded-full transform -translate-x-1/4 -translate-y-3/4 animate-bounce-slow" style="animation-delay: 0.2s;"></div>
        <div class="absolute w-48 h-48 bg-white opacity-20 top-4/5 left-4/5 rounded-full transform -translate-x-4/5 -translate-y-4/5 animate-bounce-slow" style="animation-delay: 0.4s;"></div>
        <div class="absolute w-12 h-12 bg-white opacity-20 top-4/5 left-4/5 rounded-full transform -translate-x-5/6 -translate-y-5/6 animate-bounce-slow" style="animation-delay: 0.6s;"></div>
        <div class="absolute w-60 h-60 bg-white opacity-20 top-2/4 left-3/4 rounded-full transform -translate-x-5/6 -translate-y-5/6 animate-bounce-slow" style="animation-delay: 0.6s;"></div>

  
        <!-- 画像 -->
        <div class="flex justify-center items-center min-h-screen">
          <img src="/logo/logo.png" class="max-w-full" style="transform: translateY(-10%);" />
        </div>
  
        <!-- ログインと登録リンク -->
        <div class="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
        <template v-if="canLogin || canRegister">
          <div class="mb-4 text-center">
            <Link
              v-if="canLogin"
              :href="route('login')"
              class="font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-full transition duration-300 inline-block"
            >ログインはこちら</Link>
          </div>

          <div class="text-center">
            <Link
              v-if="canRegister"
              :href="route('register')"
              class="font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-full transition duration-300 inline-block"
            >ご登録はこちら</Link>
          </div>
        </template>
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Head, Link } from '@inertiajs/vue3';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
  });
  </script>
  
  <style>
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s infinite;
  }

  .bottom-1\/2 {
    bottom: 35%;
}
  </style>
  