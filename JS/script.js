const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons button");
const foto = document.querySelector("#foto");
let offsetX, offsetY;//posição do mouse em relação a foto.
let position = 0;

foto.addEventListener('mousedown', function e(event) {
  // salva as posições do mouse em relação à imagem
  offsetX = event.clientX - foto.offsetLeft;
  offsetY = event.clientY - foto.offsetTop;
  // adiciona um listener de eventos mousemove no documento
  document.addEventListener('mousemove', mousemoveHandler);
  position += 100;
  foto.style.transform = `translatex(${position}px)`;
    
},10);

function mousemoveHandler(event){
  if(event.buttons === 1 ){
    //define a nova posição da imagem para seguir o movimento do mouse.
    foto.style.left = event.clientX - offsetX + 'px';
    foto.style.top = event.clientY - offsetY + 'px';
  }
}



class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  addDigit(digit) {
    console.log(digit);

    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }



  processOperation(operation) {
 
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }
    
    let operationValue;
    //extrai valores numéricos de elementos HTML e armazena em variáveis para realizar operações.
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  //Atualização da interface do usuário com a operação e seu resultado.
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    //Se o valor da operação for null
    if (operationValue === null) {
      //adiciona o valor da CurrentOperation à propriedade innerText.
      this.currentOperationText.innerText += this.currentOperation;
      //se não for null
    } else {
      //Se "previous" é igual a zero, o valor atual ("current")
      //será atribuído à variável "operationValue"
      if (previous === 0) {
        operationValue = current;
      }
      //Em seguida, o valor de "operationValue" e a operação atual são 
      //exibidos no elemento HTML referenciado por "this.previousOperationText
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      //"this.currentOperationText" é definida como uma string vazia para preparar o 
      //elemento para a próxima operação
      this.currentOperationText.innerText = "";
    }
  }

  //Alterar operação = verifica se o novo tipo de operação está incluído em uma matriz
  // de operações matemáticas válidas e, em seguida, atualizando o texto do elemento 
  //HTML correspondente com o novo tipo de operação.
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

 
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
 //"this.previousOperationText.innerText" é dividido em duas partes, separadas por um 
 //espaço em branco, usando o método "split()" com o argumento " ".
 // O objetivo é obter o segundo elemento do array resultante, que contém a operação 
 //matemática atual que está sendo realizada.
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
  
}

const calc = new Calculator(previousOperationText, currentOperationText);
//Utilizamos o foreach em uma matriz de buttons para adicionar um evento de click
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //essa variável armazena o valor do botão que foi clicado.
    const value = e.target.innerText;
    //se o valor for um número ou um ponto, a função addDigit é chamada na instância calc
    //Isso indica que o botão clicado é um dígito numérico que deve ser adicionado ao número
    // atual da calculadora.
    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else { //se não esse valor é atribuído a uma operação.
      calc.processOperation(value);
    }
  });
});

/*document.addEventListener('mouseup', function(event){
  // remove o listener de eventos mousemove do documento
 document.removeEventListener('mousemove', mousemoveHandler);
});*/