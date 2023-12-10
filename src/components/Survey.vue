<template>
  <div class="survey" v-if="currentQuestion">
    <div :key="surveyStore.currentQuestion.id">
      {{ surveyStore.currentQuestion.id }} - {{ surveyStore.currentQuestion.question }}
      <Answers
        :answers="currentQuestion.answers"
        :questionId="currentQuestion.id"
        @answer-selected="handleAnswerSelected"
      />
    </div>
    <button @click="prevQuestion">Previous</button>
    <button @click="nextQuestion">Next</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSurveyStore } from '../stores/surveyStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Answers from './Answers.vue'

const router = useRouter()

const surveyStore = useSurveyStore()
const { currentQuestion, isFirstQuestion, isLastQuestion } = storeToRefs(surveyStore)

const score = ref(null)

function prevQuestion() {
  if (!isFirstQuestion.value) {
    surveyStore.prevQuestion()
  } else {
    router.push('/')
  }
}

function nextQuestion() {
  if (!isLastQuestion.value) {
    surveyStore.selectAnswer(score.value)
    surveyStore.nextQuestion()
  } else {
    surveyStore.selectAnswer(score.value)
    router.push('/result')
  }
}

function handleAnswerSelected(answer) {
  score.value = answer
}
onMounted(async () => {
  if (surveyStore.questions.length === 0) {
    import('../questions.json')
      .then((module) => {
        surveyStore.loadQuestions(module.default)
      })
      .catch((error) => {
        console.error('Error importing questions.json:', error)
      })
  }
})
</script>
