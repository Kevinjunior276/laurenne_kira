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

// Variables globales pour le simulateur
const amountSelect = document.getElementById('amountSelect');
const durationSelect = document.getElementById('durationSelect');
const currencySelect = document.getElementById('currencySelect');
const continueBtn = document.getElementById('continueBtn');
const resultValue = document.getElementById('resultValue');
const resultLoader = document.getElementById('resultLoader');

// Listes des montants et rendements FCFA selon la durée
const fcfa24hOptions = [
  { amount: 20000, rendement: 80000 },
  { amount: 30000, rendement: 120000 },
  { amount: 40000, rendement: 160000 },
  { amount: 50000, rendement: 200000 },
  { amount: 80000, rendement: 320000 },
  { amount: 100000, rendement: 400000 },
  { amount: 150000, rendement: 650000 },
  { amount: 200000, rendement: 850000 },
  { amount: 250000, rendement: 1100000 },
  { amount: 300000, rendement: 1300000 },
  { amount: 350000, rendement: 1720000 }
];

const fcfa48hOptions = [
  { amount: 20000, rendement: 130000 },
  { amount: 30000, rendement: 210000 },
  { amount: 40000, rendement: 290000 },
  { amount: 50000, rendement: 360000 },
  { amount: 80000, rendement: 410000 },
  { amount: 100000, rendement: 480000 },
  { amount: 150000, rendement: 670000 },
  { amount: 200000, rendement: 890000 },
  { amount: 250000, rendement: 1170000 },
  { amount: 300000, rendement: 1460000 },
  { amount: 350000, rendement: 2000000 }
];

// Liste des montants et rendements USD
const usdOptions = [
  { amount: 100, rendement: 800 },
  { amount: 150, rendement: 1300 },
  { amount: 200, rendement: 1900 },
  { amount: 500, rendement: 4100 },
  { amount: 1000, rendement: 9000 },
  { amount: 3000, rendement: 12000 }
];

// Fonction pour afficher les options de montant
function renderAmountOptions() {
  if (!currencySelect || !amountSelect) return;
  const currency = currencySelect.value;
  const duration = durationSelect ? durationSelect.value : '';

  // Gestion des durées selon la devise
  if (currency === 'usd' && durationSelect) {
    durationSelect.innerHTML = '<option value="1" selected>24H</option>';
    durationSelect.value = '1';
    durationSelect.setAttribute('disabled', 'disabled');
  } else if (currency === 'fcfa' && durationSelect) {
    durationSelect.removeAttribute('disabled');
    durationSelect.innerHTML = '<option value="">Choisir la durée</option>' +
      '<option value="1">24H</option>' +
      '<option value="2">48H</option>';
  }

  // Affichage de tous les montants FCFA quelle que soit la durée
  if (currency === 'fcfa') {
    const allOptions = [...fcfa24hOptions, ...fcfa48hOptions]
      .filter((opt, idx, arr) => arr.findIndex(o => o.amount === opt.amount) === idx);
    amountSelect.innerHTML = '<option value="">Choisir un montant</option>' +
      allOptions.map(opt => `<option value="${opt.amount}">${opt.amount.toLocaleString()} FCFA</option>`).join('');
    amountSelect.disabled = false;
  } else if (currency === 'usd') {
    amountSelect.innerHTML = '<option value="">Choisir un montant</option>' +
      usdOptions.map(opt => `<option value="${opt.amount}">${opt.amount.toLocaleString()} USD</option>`).join('');
    amountSelect.disabled = false;
  } else {
    amountSelect.innerHTML = '<option value="">Choisir un montant</option>';
    amountSelect.disabled = false;
  }
}

// Fonction pour calculer le rendement
function calculateReturn() {
  if (!resultValue || !resultLoader) return;
  
  const amount = parseInt(amountSelect.value, 10);
  const days = parseInt(durationSelect.value, 10);
  const currency = currencySelect ? currencySelect.value : 'fcfa';
  const currencyLabel = currency === 'usd' ? 'USD' : 'FCFA';
  let result = 0;
  
  if (!amount || !days) {
    resultValue.textContent = '—';
    if (continueBtn) continueBtn.disabled = true;
    return;
  }
  
  resultValue.style.display = 'none';
  resultLoader.style.display = '';
  
  setTimeout(() => {
    if (currency === 'fcfa' && days === 1) {
      const found = fcfa24hOptions.find(opt => opt.amount === amount);
      result = found ? found.rendement : 0;
    } else if (currency === 'fcfa' && days === 2) {
      const found = fcfa48hOptions.find(opt => opt.amount === amount);
      result = found ? found.rendement : 0;
    } else if (currency === 'usd') {
      const found = usdOptions.find(opt => opt.amount === amount);
      result = found ? found.rendement : 0;
    }
    
    resultLoader.style.display = 'none';
    resultValue.style.display = '';
    resultValue.textContent = result ? result.toLocaleString() + ' ' + currencyLabel : '—';
    
    if (continueBtn) continueBtn.disabled = false;
  }, 500);
}

// Fonction pour initialiser la carte Google Maps
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

// Tout le code principal dans un seul DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Animation hero-header (sécurisé)
  if (document.querySelector('.hero-header')) {
    document.querySelector('.hero-header').classList.add('animate');
    document.querySelector('.hero-header').classList.remove('animate');
  }

  // Animation word-item (sécurisé)
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

 // Compte à rebours cyclique (tous les 15 jours à partir d'une date de départ)
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {
  // Date de départ fixe (commune pour tous les visiteurs)
  const PROMO_START = new Date('2025-06-28T00:00:00'); // change selon ta campagne
  const CYCLE_DURATION_MS = 15 * 24 * 60 * 60 * 1000; // 15 jours

  function getCurrentCycleEndDate() {
    const now = new Date();
    const timeSinceStart = now.getTime() - PROMO_START.getTime();

    // Combien de cycles de 15 jours se sont écoulés ?
    const cyclesElapsed = Math.floor(timeSinceStart / CYCLE_DURATION_MS);

    // Début du prochain cycle = date de départ + (cycles écoulés + 1) * 15 jours
    return new Date(PROMO_START.getTime() + (cyclesElapsed + 1) * CYCLE_DURATION_MS);
  }

  function updateCountdown() {
    const now = new Date();
    const end = getCurrentCycleEndDate();
    const timeLeft = end.getTime() - now.getTime();

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  }       

  // Initialisation du simulateur (seulement si les éléments existent)
  if (amountSelect && durationSelect && currencySelect) {
    renderAmountOptions();
    
    // Restaure la devise si elle existe en localStorage
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
    
    // Event listeners pour le simulateur
    currencySelect.addEventListener('change', function() {
        localStorage.setItem('selectedCurrency', currencySelect.value);
        renderAmountOptions();
        amountSelect.selectedIndex = 0;
        if (durationSelect) durationSelect.selectedIndex = 0;
        if (resultValue) resultValue.textContent = '—';
        if (simuErrorMsg) simuErrorMsg.textContent = '';
        calculateReturn();
    });
    
    if (amountSelect) {
      amountSelect.addEventListener('change', calculateReturn);
      amountSelect.addEventListener('input', function(){ 
        if (simuErrorMsg) simuErrorMsg.textContent = ''; 
      });
    }
    
    if (durationSelect) {
      durationSelect.addEventListener('change', calculateReturn);
      durationSelect.addEventListener('input', function(){ 
        if (simuErrorMsg) simuErrorMsg.textContent = ''; 
      });
    }
    
    if (continueBtn) {
      continueBtn.addEventListener('click', function(e) {
        const currency = currencySelect ? currencySelect.value : 'fcfa';
        const currencyLabel = currency === 'usd' ? 'USD' : 'FCFA';
        
        if (!amountSelect.value || !durationSelect.value) {
          if (simuErrorMsg) simuErrorMsg.textContent = 'Veuillez remplir tous les champs';
          e.preventDefault();
          return;
        }
        
        if (simuErrorMsg) simuErrorMsg.textContent = '';
        localStorage.setItem('selectedAmount', amountSelect.options[amountSelect.selectedIndex].text);
        localStorage.setItem('chosenDuration', durationSelect.options[durationSelect.selectedIndex].text);
        localStorage.setItem('selectedCurrency', currencyLabel);
        
        if (resultValue && resultValue.textContent && resultValue.textContent !== '—') {
          localStorage.setItem('potentialReturn', resultValue.textContent);
        }
        
        window.location.href = 'validation.html';
      });
    }
    
    // Calcul initial
    calculateReturn();
  }
});

// Initialisation du carousel de témoignages
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
