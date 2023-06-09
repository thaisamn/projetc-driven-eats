const produtos_selecionados = {};


function selecionarProduto(categoria, posicao, produto, preco) {
   const items = document.querySelectorAll('div#' + categoria + ' > div.item');
   const checks = document.querySelectorAll('div#' + categoria + ' > div.item * img.check');
   for (let count = 0; count < items.length; count++) {
      const element = items[count];
      const check = checks[count]
      if (count == posicao) {
         element.classList.add('borda');
         check.classList.remove('escondido')
      } else {
         element.classList.remove('borda');
         check.classList.add('escondido')
      }
   };

   produtos_selecionados[categoria] = {
      produto,
      preco,
      categoria
   };

   if (Object.keys(produtos_selecionados).length === 3) {
      const elemento = document.querySelectorAll('div.rodape > button');
      elemento.forEach(e => {
         e.disabled = false
         e.textContent = 'Fechar Pedido'
      });
   };
}


function fecharPedido() {
   const produtos = Object.keys(produtos_selecionados).map(key => {
      return produtos_selecionados[key];
   });
   const resumo = document.getElementsByClassName('confirmacao');
   let total = 0;
   let listHTML = '';
   produtos.forEach(p => {
      total += p.preco;
      listHTML += `<li><span>${p.produto}</span ><span>${p.preco.toFixed(2)}</span></li >`;
   });

   listHTML += `<li><span>TOTAL</span ><span>${total.toFixed(2)}</span></li >`;
   const resumeList = document.querySelector('div.resumo > ul');

   resumeList.innerHTML = listHTML;

   resumo[0].classList.remove('escondido');
}

function cancelar() {
   const resumo = document.getElementsByClassName('confirmacao');
   resumo[0].classList.add('escondido');
}

function enviarPedido(){
   const produtos = Object.keys(produtos_selecionados).map(key => {
      return produtos_selecionados[key];
   });
   const nome = prompt('digite seu nome');
   const endereco = prompt('digite seu endereço');

   let total = 0;

   let resumo = 'Olá, gostaria de fazer o pedido:\n'
   produtos.forEach(p => {
      total += p.preco;
      resumo += `- ${p.categoria}: ${p.produto}\n`
   })

   resumo += `Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n`

   resumo += `Nome: ${nome}\nEndereço: ${endereco}`

   window.open(`https://wa.me/5511932291668?text=${encodeURIComponent(resumo)}`)
   
}