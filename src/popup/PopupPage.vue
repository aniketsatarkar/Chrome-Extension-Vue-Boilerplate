<template>
  <div class="popup-page">
    <template v-if="!isPlaying">
      <p>
        <textarea
          rows="10"
          v-model="text"
          placeholder="Past the text here..."
        ></textarea>
      </p>
      <p>
        <button @click="play">Play</button>
      </p>
    </template>
    <template v-else>
      <p>
        <button @click="pause">Pause</button>
        <button @click="resume">Resume</button>
        <button @click="cancel">Cancel</button>
      </p>
      <div style="width: calc(100vw - 20px)">
        {{ runningText }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class PopupPage extends Vue {
  text = "";
  runningText = "";
  TTS = null;
  isPlaying = false;

  play() {
    this.TTS = new SpeechSynthesisUtterance();

    this.TTS.onboundary = (e) => {
      const start = e.charIndex;
      const end = e.charIndex + e.charLength;
      this.runningText += this.text.substring(start, end) + " ";
    };

    this.TTS.onend = function () {
      this.TTS = null;
      this.runningText = "";
      this.isPlaying = false;
    };

    this.TTS.text = this.text;
    window.speechSynthesis.speak(this.TTS);
    this.isPlaying = true;
  }

  pause() {
    window.speechSynthesis.pause();
  }

  resume() {
    window.speechSynthesis.resume();
  }

  cancel() {
    window.speechSynthesis.cancel();
    this.isPlaying = false;
    this.runningText = "";
  }

  mounted() {
    // ...
  }
}
</script>

<style lang="scss" scoped>
.popup-page {
  width: 400px;
}
textarea {
  font-size: 12px;
  letter-spacing: 1px;
}
textarea {
  width: calc(100vw - 20px);
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
