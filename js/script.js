// class
class UI {
  constructor() {
    this.form = document.querySelector("form");
    this.numberpicker = document.querySelector("#numberPicker");
    this.gameBox = document.querySelector("#gameBox");
    this.userBtn = document.querySelector('.btn-primary');
    this.resetBtn = document.querySelector('#resetBtn');
    this.rules = document.querySelector('#rules');
    this.chancesN = 3;
    this.winningNumber;
    this.low = 1;
    this.high = 10;
  }
  // add chances to ui
  startUI() {
    document.querySelector("#chances").textContent = `${this.chancesN} chances left`;
    this.winningNumber = UI.randomNumber(this.low, this.high);
  }
  // get the random number number
  static randomNumber(low, high) {
    const randomNum = Math.floor(Math.random() * (high - low + 1)) + low;
    return randomNum;
  }

  // receive user input
  matchUserInput(e) {
    e.preventDefault();
    let userInput = this.numberpicker.value;
    // match users number with winning number
    if (this.chancesN > 1) {
    if (userInput == this.winningNumber) {
      let ui = new UI();
      ui.ChangeUI("text-success", "You Won");
      this.numberpicker.setAttribute('disabled', true);
          this.userBtn.setAttribute('disabled', true);
    } else if (userInput > this.winningNumber) {
      let ui = new UI();
      ui.ChangeUI("text-danger", "Your number is greater");
    } else if (userInput < this.winningNumber) {
      let ui = new UI();
      ui.ChangeUI("text-danger", "Your number is smaller");
    }
    this.chancesLeft(); // reduces chances
    } else {
    //when there is only 1 chances
      if (userInput == this.winningNumber) {
          let ui = new UI();
          ui.ChangeUI("text-success", "You Won");
          this.chancesLeft();
      } else if (this.chancesN > -1){
        let ui = new UI();
        ui.ChangeUI("text-danger", "you lost the match");
        this.chancesLeft();
      }
    }
  }

  // show output based on users input alert or won text
  ChangeUI(styleClass, textP) {
    this.numberpicker.value = "";
    const findResultP = document.getElementById("resultP");
      // two methods to delete entire style classes— findResultP.className = ""; // findResultP.classList.remove(...findResultP.classList);
      findResultP.className = styleClass; // findResultP.classList.add(`${styleClass}`);
      findResultP.textContent = `${textP}`;
      this.gameBox.insertBefore(findResultP, this.form);
  }

  // change chance number
  chancesLeft() {
    this.chancesN--;
    document.querySelector("#chances").textContent = `${this.chancesN} chances left`;
    if(this.chancesN == 0){
        this.numberpicker.setAttribute('disabled', true);
        this.userBtn.setAttribute('disabled', true);
    }
  }

  // to reset
  handleResetBtnClick() {
    // two ways to reset— 1. reload the site, 2. reset all actions. choosing 2 to avoid reload and to make it user friendly
    this.chancesN = 3;
    this.numberpicker.value = "";
    document.querySelector("#chances").textContent = `${this.chancesN} chances left`;
    document.querySelector("#resultP").textContent = ``;
    this.winningNumber = UI.randomNumber(this.low, this.high);
    this.numberpicker.removeAttribute('disabled');
    this.userBtn.removeAttribute('disabled');
    this.numberpicker.setAttribute('required', true);
  }
  
}

let ui = new UI();
ui.startUI();
ui.form.addEventListener("submit", ui.matchUserInput.bind(ui));
ui.resetBtn.addEventListener("click", ui.handleResetBtnClick.bind(ui));

