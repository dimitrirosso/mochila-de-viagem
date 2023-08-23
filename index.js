const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaelemento(elemento)
})
    

form.addEventListener("submit", (evento) =>{
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value)


    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if(existe) {
        itemAtual.id = existe.id
        atualizaelemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0

        criaelemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaelemento(item){

    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroitem = document.createElement("strong")
    numeroitem.innerHTML = item.quantidade
    numeroitem.dataset.id = item.id
    novoItem.appendChild(numeroitem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaodeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaelemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
    
}

function botaodeleta(id) {
    const elementobotao = document.createElement("button")
    elementobotao.innerText = "X"

    elementobotao.addEventListener("click", function(){
        deletaelemento(this.parentNode, id)
    })

    return elementobotao
}
function deletaelemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id))
    console.log(itens)
    localStorage.setItem("itens", JSON.stringify(itens))
}


