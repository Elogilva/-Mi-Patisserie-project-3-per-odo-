let carrinho = [];
let total = 0;

function adicionarItem(nome, preco){
    carrinho.push({nome, preco});
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho(){
    let lista = document.getElementById("listaCarrinho");
    let totalTexto = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.nome + " - R$ " + item.preco.toFixed(2);
        lista.appendChild(li);
    });

    totalTexto.innerText = "Total: R$ " + total.toFixed(2);
}

function finalizarPedido(){
    if(carrinho.length === 0) return;

    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push(carrinho);

    localStorage.setItem("historico", JSON.stringify(historico));

    carrinho = [];
    total = 0;

    atualizarCarrinho();
    carregarHistorico();
}

function carregarHistorico(){
    let lista = document.getElementById("historicoLista");
    lista.innerHTML = "";

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historico.forEach((pedido, i) => {
        let li = document.createElement("li");
        li.innerText = "Pedido " + (i+1) + " (" + pedido.length + " itens)";
        lista.appendChild(li);
    });
}



// Buscar

function buscar(){
    let texto = document.getElementById("pesquisa").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let resultados = document.getElementById("resultados");

    resultados.innerHTML = ""
    
    let i = 0
    try{
        for (i = 0; i < cards.length; i++){
            const h3 = cards[i].querySelector('.secao h3')
            console.log(h3.innerHTML)
            if (texto == ""){
                resultados.textContent = "Digite algo válido"
            } else if (h3.innerHTML.toLowerCase().includes(texto)){
                resultados.appendChild(cards[i].cloneNode(true))
            }
        }  
    } catch {
        resultados.innerHTML = "clique novamente";
    }    
};




let index = 0;

function avancar(){
    let carrossel = document.getElementById("carrossel");
    index = (index + 1) % 3;
    carrossel.style.transform = "translateX(-" + (index * 315) + "px)";
}

function voltar(){
    let carrossel = document.getElementById("carrossel");
    index = (index - 1 + 3) % 3;
    carrossel.style.transform = "translateX(-" + (index * 315) + "px)";
}

const botaoTopo = document.getElementById("toggleMenu");
const sidebar = document.querySelector(".header-lateral");
const body = document.body;

function toggleMenu(){
    sidebar.classList.toggle("recolhido");
    body.classList.toggle("recolhido");
}

if(botaoTopo){
    botaoTopo.addEventListener("click", toggleMenu);
}

window.onload = carregarHistorico