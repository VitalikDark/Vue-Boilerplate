<template>
  <div class="flex items-center gap-3 text-sm text-light-gray-200">
    <div class="flex items-center gap-2">
      <IconCalendar />
      <time :datetime="publicationDate">
        {{ formattedDate }}
      </time>
    </div>
    <span v-if="showAuthor">|</span>
    <p
      v-if="showAuthor"
      class="font-medium"
    >
      written by <span>{{ author }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import IconCalendar from '@/components/icons/IconCalendar.vue';

interface Props {
  publicationDate: string;
  author?: string;
  showAuthor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  author: '',
  showAuthor: true,
});

const formattedDate = computed(() => {
  const date = new Date(props.publicationDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
});
</script>

