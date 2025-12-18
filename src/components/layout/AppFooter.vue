<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-[215px] py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <p class="text-black text-sm font-normal">
          Copyright 2025 Test. All rights reserved.
        </p>
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a
            href="mailto:info@test.com"
            class="flex items-center gap-2 text-purple text-sm hover:opacity-80 transition-colors"
          >
            <IconMail />
            info@test.com
          </a>
          <a
            href="tel:+380953908751"
            class="flex items-center gap-2 text-purple text-sm hover:opacity-80 transition-colors"
          >
            <IconPhone />
            +380 95 390 87 51
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import IconMail from '@/components/icons/IconMail.vue';
import IconPhone from '@/components/icons/IconPhone.vue';
</script>

