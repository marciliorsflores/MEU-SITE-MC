document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const phoneNumber = '5551999713739';

    // Lista de produtos com imagens
    const products = [
        { name: "SACOLA PLÁSTICA 20X30CM", price: 0.66, image: "imagens/SACOLAS.webp" },
        { name: "SACOLA PLÁSTICA 30X40CM", price: 0.77, image: "imagens/SACOLAS.webp" },
        { name: "SACOLA PLÁSTICA 40X50CM", price: 0.88, image: "imagens/SACOLAS.webp" },
        { name: "CARTÃO DE VISITA SIMPLES 9X5CM", price: 120, image: "imagens/CARTOES DE VISITAS SIMPLES.webp" },
        { name: "CARTÃO DE VISITA EXECUTIVO VERNIZ LOCALIZADO 9X5CM", price: 250, image: "imagens/Servicos_TiposSiteImg171@mbmw350mh500mcwmch.webp" },
        { name: "PANFLETO COCHÊ BRILHO 90GR - P - 10X14CM - 4X4 OU 4X0", price: 160, image: "imagens/Panfletos Folder Folhetos 10x14 90g Impressão Frente e Verso.jpg" },
        { name: "BANNERS m²", price: 150, image: "imagens/Servicos_TiposSiteImg116@mbmw350mh500mcwmch.webp" },
        { name: "FAIXA BIXO m²", price: 150, image: "imagens/Servicos_TiposSiteImg636@mbmw350mh500mcwmch.png" },
        { name: "WIND BANNER BANDEIRA KIT - BASE + ANTENA + TECIDO 15X200CM", price: 260, image: "imagens/wind banner 75x200cm.jpg" },
        { name: "ADESIVOS IMPRESSÃO DIGITAL m²", price: 150, image: "imagens/9tl96a_b1k_-_3.webp" },
        { name: "ADESIVO RECORTADO PLOTER m²", price: 160, image: "imagens/RECORTE PLOTER.jpg" },
        { name: "ADESIVOS PERFURADO m²", price: 150, image: "imagens/Servicos_TiposSiteImg121@mbmw350mh500mcwmch.png" },
        { name: "BLOCO DE PEDIDO 15X20CM", price: 250, image: "imagens/download.jpg" },
        { name: "BLOCO DE RECEITUÁRIO COPIATIVO 2 VIAS 15X20CM", price: 250, image: "imagens/bloco-de-pedido-comum-15x20cm-15x20cm-papel-53g-sem-revestimento-blocagem-50x2-vias-4x0-1-via-branca-2-via-amarela-12521569887112.png" },
        { name: "COMANDAS 10X20CM", price: 150, image: "imagens/COMANDAS 10X20CM.jpg" },
        { name: "FUNDO DE BANDEJAS OU JOGO AMERICANO DE PAPEL SULFITE 56G (2X0)", price: 420, image: "imagens/Jogo de Papel Personalisado.webp" },
        { name: "TAPETE DE PAPEL PARA CARRO SULFITE 56G (2X0)", price: 420, image: "imagens/tapete-para-carro-29-7x42cm-papel-offset-70g-4x0-colorido-1-lado20470888425fedeb4d30e06.png" },
        { name: "PASTA ECONÔMICA COM BOLSA - 46X31 CM - 4X0", price: 260, image: "imagens/Pasta Econômica com Bolsa - 46x31 cm - 4x0.jpg" },
        { name: "PAPEL TIMBRADO A4 PERSONALISADO", price: 120, image: "imagens/PAPEL TIMBRADO A4 PERSONALISADO.webp" }
    ];

    // Orçamento Personalizado no Banner
    const orcamentoBtn = document.getElementById('orcamento-btn');
    const orcamentoMessage = document.getElementById('orcamento-message');
    orcamentoBtn.addEventListener('click', () => {
        const baseMessage = "Olá! Quero um orçamento personalizado.";
        const customMessage = orcamentoMessage.value.trim();
        const finalMessage = customMessage ? `${baseMessage}\n\nDetalhes:\n${customMessage}` : baseMessage;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');
    });

    // Carrinho de Orçamento
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const sendCartBtn = document.getElementById('send-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            cart.push({ product, price });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.product} - R$ ${item.price.toFixed(2)} <button class="btn-remove" data-index="${index}">REMOVER</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);

        const removeButtons = document.querySelectorAll('.btn-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    sendCartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Adicione produtos ao carrinho primeiro!');
            return;
        }
        let message = "Olá! Quero orçar os seguintes itens:\n\n";
        cart.forEach(item => {
            message += `${item.product} - R$ ${item.price.toFixed(2)}\n`;
        });
        message += `\nTotal: R$ ${cartTotal.textContent}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Promoção Dinâmica
    const promoItem = document.getElementById('promo-item');
    const promoImage = document.getElementById('promo-image');
    const countdown = document.getElementById('countdown');
    const promoOrcamentoBtn = document.getElementById('promo-orcamento');
    const promoDuration = 3 * 24 * 60 * 60 * 1000; // 3 dias em milissegundos

    function getRandomProduct() {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    }

    function setPromoItem() {
        const currentPromo = getRandomProduct();
        promoItem.textContent = currentPromo.name;
        promoImage.src = currentPromo.image;
        localStorage.setItem('promoItem', currentPromo.name);
        localStorage.setItem('promoImage', currentPromo.image);
        localStorage.setItem('promoEndTime', Date.now() + promoDuration);

        promoOrcamentoBtn.onclick = () => {
            const message = `Olá! Quero um orçamento do item em promoção: ${currentPromo.name} (10% OFF)`;
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        };
    }

    const storedPromoItem = localStorage.getItem('promoItem');
    const storedPromoImage = localStorage.getItem('promoImage');
    let promoEndTime = parseInt(localStorage.getItem('promoEndTime'));

    if (!storedPromoItem || !storedPromoImage || !promoEndTime || Date.now() > promoEndTime) {
        setPromoItem();
        promoEndTime = parseInt(localStorage.getItem('promoEndTime'));
    } else {
        promoItem.textContent = storedPromoItem;
        promoImage.src = storedPromoImage;
        promoOrcamentoBtn.onclick = () => {
            const message = `Olá! Quero um orçamento do item em promoção: ${storedPromoItem} (10% OFF)`;
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        };
    }

    setInterval(() => {
        const now = Date.now();
        const distance = promoEndTime - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        if (distance < 0) {
            setPromoItem();
            promoEndTime = parseInt(localStorage.getItem('promoEndTime'));
        }
    }, 1000);

    // Botão de Agendamento de Retirada
    const schedulePickupBtn = document.getElementById('schedule-pickup');
    schedulePickupBtn.addEventListener('click', () => {
        const message = "Olá! Gostaria de agendar a retirada no balcão físico. Qual horário está disponível?";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
});
