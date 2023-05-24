<script setup lang="ts">
import MatrixRain from '@/components/MatrixRain.vue';
import { onMounted, ref } from 'vue';

var finished = ref(false);
var showPrize = ref(false);
var solved = ref(false);
var gameStarted = ref(false);
var understood = ref(false);
var wrong = ref(false);
var questions = ref(
    [
        {
            prompt: "At a Christmas party, everyone shook hands with everyone else. There were a total of 66 handshakes that happened during the party. How many people were present?",
            rightAnswer: ["12"],
            userAnswer: ""
        },
        {
            prompt: "A notebook and a mouse cost 1100$ in total. The notebook costs 1000$ more than the mouse. How much does the mouse cost?",
            rightAnswer: ["50"],
            userAnswer: ""
        },
        {
            prompt: "Given a circle with 3 randomly selected points on its circumference forming a triangle, what is the probability that the center of the circle is in the triangle? Input your solution as a probability, e.g. 51% = 0.51. Truncate all decimal places, do not round, e.g. 51.999% = 0.51.",
            rightAnswer: ["0.25", "0,25"],
            userAnswer: ""
        },
    ]
)

function show() {
    localStorage.setItem("showPrize", "true");
    showPrize.value = true;
}

function startGame() {
    localStorage.setItem("gameStarted", "true");
    gameStarted.value = true;
}

function understand() {
    localStorage.setItem("understood", "true");
    understood.value = true;
}

function solve() {
    localStorage.setItem("solved", "true");
    solved.value = true;
}

function submit() {
    for (const question of questions.value) {
        if (question.rightAnswer.indexOf(question.userAnswer.trim()) === -1) {
            solved.value = false;
            wrong.value = true;
            return;
        }
    }
    solve();
}

function restart() {
    localStorage.clear();
    finished.value = false;
    showPrize.value = false;
    gameStarted.value = false;
    understood.value = false;
    solved.value = false;
    wrong.value = false;
}

function clear() {
    solved.value = false;
    wrong.value = false;
    questions.value.forEach(question => {
        question.userAnswer = ""
    })
}

onMounted(() => {
    showPrize.value = localStorage.getItem("showPrize") === 'true';
    finished.value = localStorage.getItem("finished") === 'true';
    gameStarted.value = localStorage.getItem("gameStarted") === 'true';
    understood.value = localStorage.getItem("understood") === 'true';
    solved.value = localStorage.getItem("solved") === 'true';
})
</script>

<template>
    <div class="prize center" v-if="showPrize">
        <MatrixRain></MatrixRain>
    </div>

    <div class="container" v-else-if="finished">
        <div class="tui-window full-width first">
            <fieldset class="tui-fieldset tui-border-double">
                <legend>Finished</legend>
                <p>You have already seen the universe's secret...</p>
                <p>Click below to restart the game</p>
                <button class="tui-button" @click="restart()">Restart</button>
            </fieldset>
        </div>
    </div>

    <div class="container" v-else-if="solved">
        <div class="tui-window full-width first">
            <fieldset class="tui-fieldset tui-border-double">
                <legend>You did it</legend>
                <p>Congratulations, you have solved the challenge!</p>
                <button class="tui-button" @click="show()">Show me the prize, finally...</button>
            </fieldset>
        </div>
    </div>

    <div class="container" v-else>
        <div class="tui-window full-width first" v-if="!gameStarted">
            <fieldset class="tui-fieldset tui-border-double">
                <legend>Are you ready?</legend>
                <p>Finish this game to win a neat price!</p>
                <button class="tui-button" @click="startGame()">Let's go</button>
            </fieldset>
        </div>

        <div class="tui-window full-width first" v-else-if="!understood">
            <fieldset class="tui-fieldset tui-border-double">
                <legend>Rules</legend>
                <p>1. Answer the questions without using help (Google, ChatGPT, ...).</p>
                <p>2. Don't stress yourself, take your time.</p>
                <p>3. After receiving the secret, you hereby promise to not share it with anyone.</p>
                <button class="tui-button" @click="understand()">Understood, I agree</button>
            </fieldset>
        </div>

        <div class="tui-window full-width first" v-else>
            <fieldset class="tui-fieldset tui-border-double">
                <legend>Questions</legend>
                <p>Answer the following questions.</p>

                <div class="tui-window full-width tui-no-shadow" v-for="(question, i) in questions">
                    <fieldset class="tui-fieldset tui-border-solid">
                        <legend>{{ i + 1 }}</legend>
                        <p>{{ question.prompt }}</p>
                        <input class="tui-input full-width" v-model="question.userAnswer" v-bind:disabled="wrong">
                    </fieldset>
                </div>

                <h1 v-if="wrong" class="danger-text">At least one answer was wrong.</h1>

                <button v-if="wrong" class="tui-button" @click="clear()">Retry</button>
                <button v-else class="tui-button" @click="submit()">Submit</button>
            </fieldset>
        </div>
    </div>
</template>

<style scoped>
.first {
    margin-top: 40px;
}

.tui-window {
    margin-bottom: 50px;
}

.prize {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: black;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>