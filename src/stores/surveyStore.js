import { defineStore } from 'pinia'

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    questions: [],
    currentQuestionIndex: 0,
    scores: {}
  }),
  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex] || null,
    isFirstQuestion: (state) => state.currentQuestionIndex === 0,
    isLastQuestion: (state) => state.currentQuestionIndex === state.questions.length - 1,
    highestScoringClown: (state) => {
      const maxScore = Math.max(...Object.values(state.scores))
      const highestClown = Object.keys(state.scores).find(
        (clown) => state.scores[clown] === maxScore
      )
      return highestClown
    }
  },
  actions: {
    loadQuestions(questionData) {
      this.questions = questionData
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },
    setQuestionIndex(index) {
      if (index >= 0 && index < this.questions.length) {
        this.currentQuestionIndex = index
      }
    },
    resetQuiz() {
      this.scores = []
      this.currentQuestionIndex = 0 // gotta check that one
    },
    selectAnswer(answerValue) {
      if (this.scores[answerValue] == null) {
        this.scores[answerValue] = 0
      }
      this.scores[answerValue]++
      console.log(this.scores)
    }
  }
})
