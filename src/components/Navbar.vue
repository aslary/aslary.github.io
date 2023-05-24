<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="tui-nav">
        <span class="tui-datetime" data-format="h:m:s a"></span>
        <ul>
            <li>
                <RouterLink to="/"><span class="red-168-text">H</span>ome</RouterLink>
            </li>
            <li>
                <RouterLink to="/about"><span class="red-168-text">A</span>bout</RouterLink>
            </li>
        </ul>
    </nav>
</template>