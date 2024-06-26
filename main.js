let listaDeItens = [];
let itemAEditar;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const itemListaEscolhidos = document.getElementById('lista-de-itens');
const itemListaComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizaLocalStorage() {
  localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
}
// (false, NaN, 0, null, undefined, "", valores omitidos) retornam false;
if (listaRecuperada) {
  listaDeItens = JSON.parse(listaRecuperada);
  mostrarItem()
} else {
  listaDeItens = [];
}

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
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
          </div>
          <div>
            ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      ` 
    }
  })

  const inputCheck = document.querySelectorAll('input[type="checkbox"]');

  inputCheck.forEach(input => {
    input.addEventListener('click', (evento) => {
      valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaDeItens[valorDoElemento].checar = evento.target.checked
      mostrarItem()
    })
  })

  const deletarObjetos = document.querySelectorAll('.deletar')

  deletarObjetos.forEach(input => {
    input.addEventListener('click', (evento) => {
      valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
      listaDeItens.splice(valorDoElemento, 1,)
      mostrarItem()
    })
  })

  const editarItens = document.querySelectorAll('.editar');

  editarItens.forEach(input => {
    input.addEventListener('click', (evento) => {
      itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
      console.log(itemAEditar);
      mostrarItem()
    })
  })

  atualizaLocalStorage()
}

function salvarEdicao() {
  const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
  //console.log(itemEditado.value);
  listaDeItens[itemAEditar].valor = itemEditado.value;
  console.log(listaDeItens);
  itemAEditar = -1;
  mostrarItem()

}
