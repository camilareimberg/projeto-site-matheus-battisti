// // //DOM

// // Primeiro seleciona o elemento - depois declara um evento - e em seguida executa o que quer
// // //Seleção de elementos
const menuBtn = document.querySelector("#menu");
const closeMenuBtn = document.querySelector("#close-menu");
const menu = document.querySelector("#mobile-navbar");

// //faz a mesma coisa q acima, mas seleciona todos os links da navbar, e não um só
const desktopLinks = document.querySelectorAll("#navbar a");
const mobileLinks = document.querySelectorAll("#mobile-navbar a");
const allLinks = [...desktopLinks, ...mobileLinks];

//para mudar os banners que mudam conforme os dots. Então seleciona os banner e os dots
const slides = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
// cria a variável let pois ela será alterada
let slideIndex = 0;


// Funções - com o prevent default esconde a atualização na url, onde fica a desrcrição conforme clica
function smoothScroll(e) {
  e.preventDefault();

  //this é o elemento atual que clica
  const href = this.getAttribute("href");
  //mostra a seleção do elemento acima, que é o id de cada elemento que clicou. O offsettop é onde ele começa no html, e a partir disso leva o scroll para a tela correta
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });

  //configuração abaixo é para o mobile. Onde fecha o menu ao clicar no link. Se não colocasse esse timeout, o usuário precisaria fechar o menu para exibir a área certa que foi clicada. O 500 equivale a meio segundo, então ao clicar, depois de o.5s ele vai executar alguma coisa. Se no menu, a class list contém a menu-active - para ver se tem o mobile aberto, ai pega a class list e remove a classe active, q é o menu 
  setTimeout(() => {
    if (menu.classList.contains("menu-active")) {
      menu.classList.remove("menu-active");
    }
  }, 500);
}

//essa função é para mudar os slides da página inicial. Seleciona os pontoinhos e os slides. Para isso voltamos no html e criamos mais dois banners, mas sem o active na classe, a partir da linha 57 do html

//percorre os slides, remove a classe ativa. Usa o for para percorrer todos os slides, removendo a classe ativa. 
function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }
//para percorrer o próximo slice, usa o slideIndex++ que faz com que suma o slide atual - com a função acima - e então já prepare para executar o próximo
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  //vai chamar a função, ela vai se invocar infinitamente assim ele passa automaticamente. O 3000 é o tempo para mudar, ou seja, 3s
  setTimeout(showSlides, 3000);
}

// Eventos
// //com o for each ele percorre a lista, onde está as duas opções de botão. Outra opção é fazer igual abaixo. Com o toggle simplifica, pois o que ele faz é: se a classe estiver no menu, ele adiciona, caso não, ele deleta. Independente do botão que clicar, estará ocorrendo a função correta

[menuBtn, closeMenuBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    menu.classList.toggle("menu-active");
  });
});

// // outra opção para fazer a mesma coisa que acima para abrir e fechar o menu - usamos o for each e o toggle acima
// // menuBtn.addEventListener("click", (e)=> {
// //     //class list é a lista das classes do menu, e menu-active está no css com uma ação de mover para a esquerda
// //     menu.classList.add("menu-active");
// // });

// // closeMenuBtn.addEventListener("click", (e) => {
// //     menu.classList.remove("menu-active");
// // });
//criando um evento para todos os links, e chama cada um de link. Quando houver in clique no link, vai fazer alguma coisa, q no caso é a função smooth scroll
allLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

// Inicialização - executa a show slides quando iniciar o site, quando o usuário entrar. Por isso, chamamos a função conforme abaixo
showSlides();
