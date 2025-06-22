(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    if (typeof WOW !== 'undefined') new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    if ($(".testimonial-carousel").length > 0) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            margin: 24,
            dots: true,
            loop: true,
            nav : false,
            responsive: {
                0:{ items:1 },
                768:{ items:2 },
                992:{ items:3 }
            }
        });
    }
    
})(jQuery);

// Animation hero-header (sécurisé)
if (document.querySelector('.hero-header')) {
    document.querySelector('.hero-header').classList.add('animate'); // Activer
    document.querySelector('.hero-header').classList.remove('animate'); // Désactiver
}

// Animation word-item (sécurisé)
document.addEventListener('DOMContentLoaded', () => {
    const wordItems = document.querySelectorAll('.word-item');
    let currentWordIndex = 0;
    if (wordItems.length > 0) {
        function rotateWords() {
            wordItems[currentWordIndex].classList.remove('active');
            currentWordIndex = (currentWordIndex + 1) % wordItems.length;
            wordItems[currentWordIndex].classList.add('active');
        }
        setInterval(rotateWords, 2000);
    }
});

// Animation countdown (sécurisé)
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("days")) {
        let countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 16);
        countdownDate.setHours(countdownDate.getHours() + 5);
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;
            if (distance < 0) {
                document.querySelector('.countdown').innerHTML = "Temps écoulé !";
                return;
            }
            const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
            const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secondes = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("days").textContent = String(jours).padStart(2, '0');
            document.getElementById("hours").textContent = String(heures).padStart(2, '0');
            document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
            document.getElementById("seconds").textContent = String(secondes).padStart(2, '0');
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderAmountOptions();
    // Correction : active le bouton Continue si les champs sont déjà remplis
    if (typeof calculateReturn === 'function') calculateReturn();

    // Exécuter ce code UNIQUEMENT sur validation.html
    if (window.location.pathname.includes('validation.html')) {
        const validationForm = document.getElementById('validationForm');
        if (validationForm) {
            validationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Formulaire validation soumis : JS actif'); // Test debug
                // Récupération des champs
                const nom = document.getElementById('fullName').value;
                const pays = document.getElementById('country').value;
                const ville = document.getElementById('city').value;
                const email = document.getElementById('email').value;
                const recu = document.getElementById('receiptNumber').value;
                const montant = document.getElementById('selectedAmount').value;
                const devise = document.getElementById('currencyLabel').textContent;
                const duree = document.getElementById('chosenDuration').value;
                const messageOpt = document.getElementById('optionalMessage').value;

                let texte = `Validation de souscription\n`;
                texte += `Nom: ${nom}\n`;
                texte += `Pays: ${pays}\n`;
                texte += `Ville: ${ville}\n`;
                texte += `Email: ${email}\n`;
                texte += `Numéro de reçu: ${recu}\n`;
                texte += `Montant: ${montant} ${devise}\n`;
                texte += `Durée: ${duree}\n`;
                if (messageOpt) texte += `Message: ${messageOpt}\n`;

                const texteEncode = encodeURIComponent(texte);
                const numero = '237653377867'; // Remplace par ton numéro WhatsApp si besoin
                const url = `https://wa.me/${numero}?text=${texteEncode}`;
                window.location.href = url;
            });
        }
    }

    // Restaure la devise si elle existe en localStorage
    if (currencySelect) {
        const savedCurrency = localStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            if (savedCurrency.toLowerCase() === 'usd') currencySelect.value = 'usd';
            else currencySelect.value = 'fcfa';
        }
        renderAmountOptions();
        amountSelect.selectedIndex = 0;
        if (durationSelect) durationSelect.selectedIndex = 0;
        if (resultValue) resultValue.textContent = '—';
        const simuErrorMsg = document.getElementById('simuErrorMsg');
        if (simuErrorMsg) simuErrorMsg.textContent = '';
        currencySelect.addEventListener('change', function() {
            localStorage.setItem('selectedCurrency', currencySelect.value);
            renderAmountOptions();
            amountSelect.selectedIndex = 0;
            if (durationSelect) durationSelect.selectedIndex = 0;
            if (resultValue) resultValue.textContent = '—';
            if (simuErrorMsg) simuErrorMsg.textContent = '';
            if (typeof calculateReturn === 'function') calculateReturn();
        });
    }
});

const amountSelect = document.getElementById('amountSelect');
const durationSelect = document.getElementById('durationSelect');
const currencySelect = document.getElementById('currencySelect');
const continueBtn = document.getElementById('continueBtn');
const resultValue = document.getElementById('resultValue');
const resultLoader = document.getElementById('resultLoader');

function calculateReturn() {
  const amount = parseInt(amountSelect.value, 10);
  const days = parseInt(durationSelect.value, 10);
  const currency = currencySelect ? currencySelect.value : 'fcfa';
  const currencyLabel = currency === 'usd' ? 'USD' : 'FCFA';
  if (!amount || !days) {
    resultValue.textContent = '—';
    continueBtn.disabled = true;
    return;
  }
  resultValue.style.display = 'none';
  resultLoader.style.display = '';
  setTimeout(() => {
    let result = amount;
    if (days === 1) result *= 2;
    else if (days === 2) result *= 4;
    else if (days === 3) result *= 8;
    resultLoader.style.display = 'none';
    resultValue.style.display = '';
    resultValue.textContent = result.toLocaleString() + ' ' + currencyLabel;
  }, 500);
  continueBtn.disabled = false;
}

amountSelect.addEventListener('change', calculateReturn);
durationSelect.addEventListener('change', calculateReturn);
if (currencySelect) {
  currencySelect.addEventListener('change', () => {
    resultValue.textContent = '—';
    continueBtn.disabled = true;
    // Correction : réinitialise le calcul et l'affichage du résultat selon la nouvelle devise
    calculateReturn();
  });
}

continueBtn.addEventListener('click', function(e) {
  const currency = currencySelect ? currencySelect.value : 'fcfa';
  const currencyLabel = currency === 'usd' ? 'USD' : 'FCFA';
  if (!amountSelect.value || !durationSelect.value) {
    document.getElementById('simuErrorMsg').textContent = 'Veuillez remplir tous les champs';
    e.preventDefault();
    return;
  }
  document.getElementById('simuErrorMsg').textContent = '';
  localStorage.setItem('selectedAmount', amountSelect.options[amountSelect.selectedIndex].text);
  localStorage.setItem('chosenDuration', durationSelect.options[durationSelect.selectedIndex].text);
  localStorage.setItem('selectedCurrency', currencyLabel);
  window.location.href = 'validation.html';
});
// Efface le message d'erreur dès qu'un champ change
amountSelect.addEventListener('input', function(){ document.getElementById('simuErrorMsg').textContent = ''; });
durationSelect.addEventListener('input', function(){ document.getElementById('simuErrorMsg').textContent = ''; });
if(currencySelect) currencySelect.addEventListener('input', function(){ document.getElementById('simuErrorMsg').textContent = ''; });

function initMap() {
    // Coordonnées de Ngeme, Limbe
    const ngemeLimbe = { lat: 4.0173, lng: 9.2012 };

    // Créer la carte centrée sur Ngeme
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: ngemeLimbe,
    });

    // Ajouter un marqueur
    const marker = new google.maps.Marker({
        position: ngemeLimbe,
        map: map,
        title: "LKE",
    });
}

$(document).ready(function() {
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false
    });
});

// --- Début logique devise/montant centralisée ---
// Liste des montants pour chaque devise
const amounts = {
  fcfa: Array.from({length: 50}, (_, i) => (i + 1) * 10000), // 10 000 à 500 000
  usd: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500]
};
const currencyLabels = { fcfa: 'FCFA', usd: 'USD' };

function renderAmountOptions() {
  if (!currencySelect || !amountSelect) return;
  const currency = currencySelect.value;
  amountSelect.innerHTML = '<option value="">Choisir un montant</option>' +
    amounts[currency].map(v => `<option value="${v}">${v.toLocaleString()} ${currencyLabels[currency]}</option>`).join('');
}

// --- Fin logique devise/montant centralisée ---