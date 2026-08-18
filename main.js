// Shree Ganesh Tour and Travels — site scripts
// Plain JS, no build step, no external dependency.

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var menuBtn = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* Fare calculator */
  // PLACEHOLDER RATES — modeled on typical Goa taxi market pricing.
  // Replace with your actual verified rates before this site goes live.
  var ROUTE_RATES = {
    'dabolim-calangute':  { label: 'Dabolim Airport → Calangute',  km: 34, sedan: 1250, suv: 1550 },
    'mopa-calangute':     { label: 'Mopa Airport → Calangute',     km: 35, sedan: 1150, suv: 1400 },
    'madgaon-panaji':     { label: 'Madgaon Station → Panaji',     km: 33, sedan: 1150, suv: 1400 },
    'panaji-oldgoa':      { label: 'Panaji → Old Goa Churches',    km: 10, sedan: 500,  suv: 650  }
  };
  var HOURLY_RATES = {
    '4':  { label: '4 Hours / 40 KM',  sedan: 1350, suv: 1750 },
    '8':  { label: '8 Hours / 80 KM',  sedan: 2400, suv: 3100 },
    '12': { label: '12 Hours / 120 KM', sedan: 3300, suv: 4200 }
  };
  var OUTSTATION_PER_KM = { sedan: 12, suv: 16 };
  var OUTSTATION_MIN_KM = 250;

  var calc = document.getElementById('fare-calculator');
  if (calc) {
    var tabs = calc.querySelectorAll('.calc-tab');
    var panels = calc.querySelectorAll('.calc-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.getAttribute('data-target');
        panels.forEach(function (p) { p.style.display = (p.id === target) ? 'block' : 'none'; });
      });
    });

    var routeSelect = document.getElementById('calc-route');
    var routeResultSedan = document.getElementById('route-result-sedan');
    var routeResultSuv = document.getElementById('route-result-suv');
    var routeWhatsapp = document.getElementById('route-whatsapp-link');
    function updateRoute() {
      if (!routeSelect) return;
      var r = ROUTE_RATES[routeSelect.value];
      if (!r) return;
      routeResultSedan.textContent = '₹' + r.sedan.toLocaleString('en-IN');
      routeResultSuv.textContent = '₹' + r.suv.toLocaleString('en-IN');
      if (routeWhatsapp) {
        var msg = 'Hi Shree Ganesh Tour and Travels, I would like to book a taxi for ' + r.label + ' (' + r.km + ' km). Sedan: ₹' + r.sedan + ', SUV: ₹' + r.suv + '.';
        routeWhatsapp.href = 'https://wa.me/918668204526?text=' + encodeURIComponent(msg);
      }
    }
    if (routeSelect) { routeSelect.addEventListener('change', updateRoute); updateRoute(); }

    var hourSelect = document.getElementById('calc-hours');
    var hourResultSedan = document.getElementById('hour-result-sedan');
    var hourResultSuv = document.getElementById('hour-result-suv');
    var hourWhatsapp = document.getElementById('hour-whatsapp-link');
    function updateHourly() {
      if (!hourSelect) return;
      var h = HOURLY_RATES[hourSelect.value];
      if (!h) return;
      hourResultSedan.textContent = '₹' + h.sedan.toLocaleString('en-IN');
      hourResultSuv.textContent = '₹' + h.suv.toLocaleString('en-IN');
      if (hourWhatsapp) {
        var msg = 'Hi Shree Ganesh Tour and Travels, I would like an hourly rental (' + h.label + '). Sedan: ₹' + h.sedan + ', SUV: ₹' + h.suv + '.';
        hourWhatsapp.href = 'https://wa.me/918668204526?text=' + encodeURIComponent(msg);
      }
    }
    if (hourSelect) { hourSelect.addEventListener('change', updateHourly); updateHourly(); }

    var kmInput = document.getElementById('calc-km');
    var outResultSedan = document.getElementById('out-result-sedan');
    var outResultSuv = document.getElementById('out-result-suv');
    var outWhatsapp = document.getElementById('out-whatsapp-link');
    function updateOutstation() {
      if (!kmInput) return;
      var km = Math.max(parseInt(kmInput.value, 10) || 0, OUTSTATION_MIN_KM);
      var sedan = km * OUTSTATION_PER_KM.sedan;
      var suv = km * OUTSTATION_PER_KM.suv;
      outResultSedan.textContent = '₹' + sedan.toLocaleString('en-IN');
      outResultSuv.textContent = '₹' + suv.toLocaleString('en-IN');
      if (outWhatsapp) {
        var msg = 'Hi Shree Ganesh Tour and Travels, I would like an outstation quote for approx ' + km + ' km. Sedan: ₹' + sedan + ', SUV: ₹' + suv + '.';
        outWhatsapp.href = 'https://wa.me/918668204526?text=' + encodeURIComponent(msg);
      }
    }
    if (kmInput) { kmInput.addEventListener('input', updateOutstation); updateOutstation(); }
  }

});
