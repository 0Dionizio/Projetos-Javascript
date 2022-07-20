'use strict'

const openModal = () => document.getElementById('modal')//Abre o modal
    .classList.add('active')

const closeModal = () => {//Fecha a janela modal
  clearFields();
  document.getElementById('modal').classList.remove('active')
}

// CRUD

//CRUD - DELETE

const deleteClient = (index) => {
  const dbClient = readClient(); //Faz a leitura do banco e armazena na variável
  dbClient.splice(index , 1); //Splice() sendo utilizado para remover dados do array a partir do index selecionado
  setLocalStorage(dbClient); //Atualizando banco com array removido
} 

//CRUD - UPDATE

const updateClient = (index, client) => { //Recebe e atuliza os novos dados do cliente
  const dbClient = readClient() //Vai ler os dados no banco de dados e ira colocar em uma variável
  dbClient[index] = client //Através indice será selecionado o cliente que terá o dados atualizados 
  setLocalStorage(dbClient); //Atualizando dados
}

//CRUD - READ

const readClient = () => getLocalStorage() //Função para leitura e retorno da lista de clientes

//CRUD - CREATE
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []; //Armazenando os dados convertidos em JSON na variável e lendo oque existe no banco
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient)); //Envia os dados convertindos em string para o banco  

const createClient = (client) =>{  //Funçao que vai criar os arrays 
  const dbClient = getLocalStorage(); //A Variável recebe o banco de dados 
  dbClient.push(client); //Acrescenta mais um dado no final do array 
  setLocalStorage(dbClient);  //Banco é atualizado
}

const isValidFields = () => { //Confere se todos os campos foram preenchidos
  return document.getElementById('form').reportValidity() //Retorna verdadeiro se caso todos os requisitos do HTML forem satisfeitos
}

//Interação com o layout

const clearFields = () => { //Limpa os campos que foram digitados
  const fields = document.querySelectorAll('.modal-field'); //Seleciona todos os elementos usando a classe ".modal-field" e armazena na variável
  fields.forEach(field => field.value = ''); //Percorre os campos e limpa eles
}

const saveClient = () => { //Função feita para salvar os clientes
  if (isValidFields()){ //Confere se os campos sao validos
    const client = {
      nome: document.getElementById('nome').value, //Recebem os valores dos campos digitados
      email: document.getElementById('email').value,
      celular: document.getElementById('celular').value,
      cidade: document.getElementById('cidade').value
    }
    const index = document.getElementById('nome').dataset.index; //A variavel recebe o indice do elemento 
    if (index == 'new') { //Se existir o "new" no elemento, as instruções serao feitas
      createClient(client);
      updateTable();
      closeModal();
    } else { //Caso a condição não for satisfeita, será executada
      document.getElementById("nome").dataset.index = 'new';
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  } 
} 

const createRow = (client, index) => { //Criando os botões e a linhas da tabela no DOM
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <td>${client.nome}</td>
  <td>${client.email}</td>
  <td>${client.celular}</td>
  <td>${client.cidade}</td>
  <td>
      <button type="button" class="button green" id="edit-${index}">Editar</button>
      <button type="button" class="button red" id="delete-${index}">Excluir</button>
  </td>
  `
  document.querySelector('#tableClient>tbody').appendChild(newRow) //Inserção das tabelas no DOM

}

const clearTable = () => { //Usado para limpar as linhas quando o update for feito
  const rows = document.querySelectorAll('#tableClient>tbody tr');
  rows.forEach(row => row.parentNode.removeChild(row));

}

const updateTable = () => { //Função usada para atualizar as tabelas no HTML
  const dbClient = readClient(); //Le oque tem no banco de dados
  clearTable();
  dbClient.forEach(createRow); //Envia o createRow 
}

const fillFields = (client) => { //Função que preenche os campos digitados
  document.getElementById('nome').value = client.nome;
  document.getElementById('email').value = client.email;
  document.getElementById('celular').value = client.celular;
  document.getElementById('cidade').value = client.cidade;
  document.getElementById('nome').dataset.index = client.index;
}

const editClient = (index) => { //Função para o botão de editar 
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  openModal();
}

const editDelete = (event) => { //Criado para editar e deletar os arrays através dos botões
  if (event.target.type == 'button'){
    const [action, index] = event.target.id.split('-');
    if (action == 'edit'){
      editClient(index)
    } else {
      deleteClient(index);
      updateTable();
    }
  }
}

updateTable()

//Eventos 
document.getElementById('cadastrarCliente') 
  .addEventListener('click', openModal);

document.getElementById('modalClose')
  .addEventListener('click', closeModal);

document.getElementById('salvar')
  .addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody')
  .addEventListener('click', editDelete);

document.getElementById('cancelar')
  .addEventListener('click', closeModal);

