<template>
 <div class="results">
  YOU ARE A CLOWN
  <p>Highest Scoring Clown: {{ highestScoringClown }}</p>
  <button @click=retryQuiz()>Retry</button>
 </div>
</template>

<script setup>
import { useSurveyStore } from '../stores/surveyStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';

const router = useRouter()

const surveyStore = useSurveyStore();
const { highestScoringClown } = storeToRefs(surveyStore);

function retryQuiz() {
 surveyStore.resetQuiz()
  router.push('/')
}
</script>