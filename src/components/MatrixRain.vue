<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../router';

const show = ref(false);

function finish() {
    localStorage.clear();
    localStorage.setItem("finished", "true");
    router.go(0);
}

onMounted(() => {
    // Source: https://www.sololearn.com/compiler-playground/WpFa2Yz9WP8g
    const canvas: any = document.getElementById("canvas");
    const context: any = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: string | any[] = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = canvas.height;
    }

    // basically, each column stores the y position of its current character
    // in each frame (around 30ms), a translucent black rect is drawn, this creates the disappearence illusion
    // so in reality, only "columns" many y positions are stored in "rainDrops"
    const draw = () => {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            // without random, all characters would be at the same y value
            // this causes artificial distortion
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);

    setTimeout(() => {
        show.value = true
    }, 3000);
})
</script>

<template>
    <canvas id="canvas"></canvas>
    <div class="actions" v-if="show">
        <img src="../assets/rickroll.gif"><br>
        <button class="tui-button full-width" @click="finish()">Thanks, finish by clicking</button>
    </div>
</template>

<style scoped>
canvas {
    position: absolute;
    height: 100%;
    widows: 100%;
    left: 0;
    top: 0;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.actions {
    height: 80vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    animation: fadeIn 4s normal;
}

img {
    height: 90%;
}
</style>
