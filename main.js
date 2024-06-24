let listaDeItens = [];


const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const itemListaEscolhidos = document.getElementById('lista-de-itens');
const itemListaComprados = document.getElementById('itens-comprados');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  salvarItem();
  mostrarItem();
  itensInput.focus();
});

function salvarItem() {
  const comprasItem = itensInput.value.trim();
  const itemDuplicado = listaDeItens.some(elemento => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

  if (itemDuplicado) {
    alert('Item já está na lista')
  } else {
    listaDeItens.push({
      valor: comprasItem,
      checar: false
    })
  }
  
  itensInput.value = '';
}

function mostrarItem() {
  itemListaEscolhidos.innerHTML = '';
  itemListaComprados.innerHTML = '';

  listaDeItens.forEach((elemento, index) => {
    if (elemento.checar) {
      itemListaComprados.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
          <input type="checkbox" checked class="is-clickable" />  
          <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
      `
    } else {
        itemListaEscolhidos.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
          </div>
          <div>
            <i class="fa-regular fa-floppy-disk is-clickable"></i>
            <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      ` 
    }
  })

  const inputCheck = document.querySelectorAll('input[type="checkbox"]');

  inputCheck.forEach(input => {
    input.addEventListener('click', (evento) => {
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaDeItens[valorDoElemento].checar = evento.target.checked
      mostrarItem()
    })
  })

  const deletarObjetos = document.querySelectorAll('.deletar')

  deletarObjetos.forEach(input => {
    input.addEventListener('click', (evento) => {
      const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaDeItens.splice(valorDoElemento, 1,)
      mostrarItem()
    })
  })

  

}

