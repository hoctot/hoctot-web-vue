<template>
  <section class="container">
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
    >
      <b-step-item label="Câu hỏi" :clickable="isStepsClickable">
        <div>
          <div id="editor-question" class="editor"></div>
        </div>
      </b-step-item>

      <b-step-item
        label="Đáp án"
        :clickable="isStepsClickable"
        :type="{'is-success': isProfileSuccess}"
      >
        <div>
          <div id="editor-answer" class="editor"></div>
        </div>
      </b-step-item>

      <b-step-item label="Gợi ý" :clickable="isStepsClickable">
        <div>
          <div id="editor-hint" class="editor"></div>
        </div>
      </b-step-item>

      <b-step-item label="Hoàn thành" :clickable="isStepsClickable">
        <div>
          <div class="text-center">
            <button class="button is-success">Tạo câu hỏi</button>
          </div>
          <div class="my-5">
            <h1 class="title text-center">Xem trước</h1>
          </div>
          <div>// TODO</div>
        </div>
      </b-step-item>
    </b-steps>
  </section>
</template>

<script>
import * as Quill from 'quill/dist/quill'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      questionEditor: null,
      answerEditor: null,
      hintEditor: null,
      // Other
      questionHTML: '',
      answerHTML: '',
      hintHTML: '',
      // Other
      activeStep: 0,
      isAnimated: true,
      hasNavigation: !true,
      customNavigation: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      isStepsClickable: true,
      isProfileSuccess: false,
    }
  },
  mounted() {
    const quillQuestion = new Quill('#editor-question', {
      placeholder: 'Nhập câu hỏi...',
      theme: 'snow',
    })
    this.questionEditor = quillQuestion

    const quillAnswer = new Quill('#editor-answer', {
      placeholder: 'Nhập câu trả lời...',
      theme: 'snow',
    })
    this.answerEditor = quillAnswer

    const quillHint = new Quill('#editor-hint', {
      placeholder: 'Nhập gợi ý...',
      theme: 'snow',
    })
    this.hintEditor = quillHint

    quillQuestion.on('text-change', function(delta, oldDelta, source) {
      const text = quillQuestion.root.innerHTML
      console.log(text)
    })
  },
}
</script>

<style lang="scss">
.editor {
  min-height: 10rem;
}
</style>
