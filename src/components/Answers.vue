<template>
  <div class="answers">
    <div v-for="answer in answers" :key="answer.text" class="answer">
      <input type="radio" :id="answer.text" :value="answer" :name="`answer-${questionId}`" @change="handleAnswerSelect(answer)" />
      <label :for="answer.text">{{ answer.text }}</label>
    </div>
  </div>
 </template>
 
 <script setup>
 defineProps({
  answers: Array,
  questionId: Number
 });
 
 const emit = defineEmits(['answer-selected']);
 
 function handleAnswerSelect(answer) {
   emit('answer-selected', answer.value);
 }
 </script>
 