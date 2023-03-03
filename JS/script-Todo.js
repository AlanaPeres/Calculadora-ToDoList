const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

//retorna o número de caracteres no valor atual do campo de entrada, após remover 
//quaisquer espaços em branco desnecessários no início e no final da string.
const validateInput = () => inputElement.value.trim().length > 0;

//Adicionar Tarefa
const handleAddTask = () => {
    const inputIsValid = validateInput();

    console.log(inputIsValid);

    if(!inputIsValid){
        return inputElement.classList.add("error");
    }
    //cria um elemento html do tipo 'div', esse novo elemento ainda não foi anexado ao doc html
    //e pode ser manipulado antes de ser adicionado a página.
    const taskItemContainer = document.createElement('div')
    //adiciona uma classe CSS chamada "task-item" ao elemento div criado anteriormente. 
    //Isso é útil para aplicar estilos específicos a esse elemento usando CSS.
    taskItemContainer.classList.add('task-item')
    //Conteúdo da Tarefa = criar um novo elemento HTML de parágrafo e definir seu conteúdo 
    //como o valor atual do campo de entrada. 
    const taskContent = document.createElement('p')

    //esta pegando o valor da entrada e atribuindo ao conteúdo do texto de um elemento da classe "taskContent"
    taskContent.innerText = inputElement.value;

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);
}
//Lidar com entrada
const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove("error");
    }
};
//Após ouvir o click a função handleAddTask() é chamada.
addTaskButton.addEventListener("click", () => handleAddTask());
//a função handleInputChange() será chamada qndo o valor do campo de entrada mudar.É comum usar essa técnica em 
//JavaScript para criar interações do usuário com o conteúdo da página, por exemplo, para validar entradas 
//de formulário em tempo real.
inputElement.addEventListener('change', () => handleInputChange());