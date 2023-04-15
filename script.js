const produtos_selecionados = [];


function selecionarProduto(categoria, posicao) {
   const items = document.querySelectorAll('div#' + categoria + ' > div.item')
   for (let count = 0; count < items.length; count++) {
      const element = items[count];
      if (count == posicao) {
         element.classList.add('borda')
      } else {
         element.classList.remove('borda')
      }
   }
}