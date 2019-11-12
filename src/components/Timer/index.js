class Timer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = ` <div class="timer">
            <div class="timer-content" id="timer-content">5</div>
            <div class="timer-text">Timer</div>
        </div>`;
    }
  }
      
customElements.define('timer-component', Timer);