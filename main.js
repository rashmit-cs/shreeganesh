// Shree Ganesh Tour and Travels — site scripts
// Plain JS, no build step, no external dependency.

var WHATSAPP_NUMBER = '918668204526';

// ---------- Vehicle fleet data ----------
// Rates as supplied by the business owner (Vithal). One flagged assumption:
// the "30 Seater" category had two "Mopa" lines in the source data with no
// Dabolim line. Every other vehicle has Mopa priced higher than Dabolim, so
// the second line is read here as Dabolim = 6000. CONFIRM this with Vithal.
var VEHICLE_ORDER = ['sedan', 'ertiga', 'innova-crysta', 'innova-hycross', 'tempo-15', 'bus-26', 'bus-30', 'bus-40'];

var VEHICLES = {
  'sedan': {
    name: 'Sedan',
    tagline: 'Dzire, Etios or equivalent',
    type: 'Car', ac: true, seats: 4,
    rates: {
      dabolim: [ { d: 'Panjim', p: 1250 }, { d: 'Calangute', p: 1550 }, { d: 'Baga', p: 1650 }, { d: 'Colva', p: 1250 }, { d: 'Mobor', p: 1550 } ],
      mopa:    [ { d: 'Panjim', p: 1500 }, { d: 'Calangute', p: 1600 }, { d: 'Baga', p: 1500 }, { d: 'Colva', p: 2500 }, { d: 'Mobor', p: 3000 } ]
    }
  },
  'ertiga': {
    name: 'Ertiga',
    tagline: 'Maruti Ertiga or equivalent',
    type: 'MUV', ac: true, seats: 6,
    rates: {
      dabolim: [ { d: 'Panjim', p: 1550 }, { d: 'Calangute', p: 1850 }, { d: 'Baga', p: 1950 }, { d: 'Colva', p: 1550 }, { d: 'Mobor', p: 1850 } ],
      mopa:    [ { d: 'Panjim', p: 1700 }, { d: 'Calangute', p: 1800 }, { d: 'Baga', p: 1600 }, { d: 'Colva', p: 3000 }, { d: 'Mobor', p: 3500 } ]
    }
  },
  'innova-crysta': {
    name: 'Innova Crysta',
    tagline: 'Toyota Innova Crysta or equivalent',
    type: 'SUV', ac: true, seats: 7,
    rates: {
      dabolim: [ { d: 'Panjim', p: 1850 }, { d: 'Calangute', p: 2250 }, { d: 'Baga', p: 2350 }, { d: 'Colva', p: 1550 }, { d: 'Mobor', p: 2250 } ],
      mopa:    [ { d: 'Panjim', p: 2000 }, { d: 'Calangute', p: 1900 }, { d: 'Baga', p: 1800 }, { d: 'Colva', p: 4000 }, { d: 'Mobor', p: 4500 } ]
    }
  },
  'innova-hycross': {
    name: 'Innova Hycross',
    tagline: 'Toyota Innova Hycross or equivalent',
    type: 'SUV', ac: true, seats: 7,
    rates: {
      dabolim: [ { d: 'Panjim', p: 2050 }, { d: 'Calangute', p: 2550 }, { d: 'Baga', p: 2550 }, { d: 'Colva', p: 1750 }, { d: 'Mobor', p: 2550 } ],
      mopa:    [ { d: 'Panjim', p: 2500 }, { d: 'Calangute', p: 2000 }, { d: 'Baga', p: 1900 }, { d: 'Colva', p: 4500 }, { d: 'Mobor', p: 5000 } ]
    }
  },
  'tempo-15': {
    name: 'Tempo Traveller',
    tagline: '15-Seater AC Tempo Traveller',
    type: 'Van', ac: true, seats: 15,
    rates: {
      dabolim: [ { d: 'Panjim', p: 3500 } ],
      mopa:    [ { d: 'Panjim', p: 4500 } ]
    }
  },
  'bus-26': {
    name: 'Mini Bus',
    tagline: '26-Seater AC Mini Bus',
    type: 'Bus', ac: true, seats: 26,
    rates: {
      dabolim: [ { d: 'Panjim', p: 5000 } ],
      mopa:    [ { d: 'Panjim', p: 6000 } ]
    }
  },
  'bus-30': {
    name: 'Mini Bus',
    tagline: '30-Seater AC Mini Bus',
    type: 'Bus', ac: true, seats: 30,
    rates: {
      dabolim: [ { d: 'Panjim', p: 6000 } ], // ASSUMED — see note above, confirm with Vithal
      mopa:    [ { d: 'Panjim', p: 6500 } ]
    }
  },
  'bus-40': {
    name: 'Coach',
    tagline: '40-Seater AC Coach',
    type: 'Bus', ac: true, seats: 40,
    rates: {
      dabolim: [ { d: 'Panjim', p: 8000 } ],
      mopa:    [ { d: 'Panjim', p: 9000 } ]
    }
  }
};

// Image files used in the modal header (matches the fleet card banners)
var VEHICLE_IMAGES = {
  'sedan': 'images/vehicle-sedan.jpg',
  'ertiga': 'images/vehicle-ertiga.jpg',
  'innova-crysta': 'images/vehicle-innova-crysta.jpg',
  'innova-hycross': 'images/vehicle-innova-hycross.jpg',
  'tempo-15': 'images/vehicle-tempo-15.jpg',
  'bus-26': 'images/vehicle-bus-26.jpg',
  'bus-30': 'images/vehicle-bus-30.jpg',
  'bus-40': 'images/vehicle-bus-40.jpg'
};

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

  /* ---------- Vehicle fleet modal ---------- */
  var modal = document.getElementById('vehicle-modal');
  var modalClose = document.getElementById('modal-close');
  var modalName = document.getElementById('modal-vehicle-name');
  var modalTagline = document.getElementById('modal-vehicle-tagline');
  var modalBadges = document.getElementById('modal-badges');
  var modalIcon = document.getElementById('modal-icon');
  var modalRateBody = document.getElementById('modal-rate-body');
  var modalBookLink = document.getElementById('modal-book-link');
  var modalTabs = modal ? modal.querySelectorAll('.modal-tab') : [];
  var pkgHalfLink = document.getElementById('pkg-half-link');
  var pkgFullLink = document.getElementById('pkg-full-link');
  var pkgOutstationLink = document.getElementById('pkg-outstation-link');

  var currentVehicleId = null;
  var currentPickup = 'dabolim';

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function renderRateTable(vehicleId, pickup) {
    var v = VEHICLES[vehicleId];
    if (!v || !modalRateBody) return;
    var pickupLabel = pickup === 'dabolim' ? 'Dabolim Airport' : 'Mopa Airport';
    modalRateBody.innerHTML = '';
    v.rates[pickup].forEach(function (row) {
      var tr = document.createElement('tr');
      var priceClass = pickup === 'dabolim' ? 'price-sedan' : 'price-suv';
      tr.innerHTML =
        '<td class="route-name">' + pickupLabel + ' → ' + row.d + '</td>' +
        '<td class="num ' + priceClass + '">₹' + row.p.toLocaleString('en-IN') + '</td>' +
        '<td class="num"><a href="' + waLink('Hi Shree Ganesh Tour and Travels (#GM), I would like to book a ' + v.name + ' from ' + pickupLabel + ' to ' + row.d + '. Fare: ₹' + row.p + '.') + '" target="_blank" rel="noopener noreferrer" class="btn-enquire">Book</a></td>';
      modalRateBody.appendChild(tr);
    });
  }

  function openModal(vehicleId) {
    var v = VEHICLES[vehicleId];
    if (!v) return;
    currentVehicleId = vehicleId;
    currentPickup = 'dabolim';

    modalName.textContent = v.name;
    modalTagline.textContent = v.tagline;
    modalIcon.innerHTML = '<img src="' + (VEHICLE_IMAGES[vehicleId] || '') + '" alt="' + v.name + '" width="120" height="64">';
    modalBadges.innerHTML =
      '<span class="vbadge">' + (v.ac ? 'AC' : 'Non-AC') + '</span>' +
      '<span class="vbadge">' + v.seats + ' Seats</span>' +
      '<span class="vbadge">' + v.type + '</span>';

    modalTabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-pickup') === 'dabolim');
    });
    renderRateTable(vehicleId, 'dabolim');

    modalBookLink.href = waLink('Hi Shree Ganesh Tour and Travels (#GM), I would like to book a ' + v.name + '. Please share availability.');

    pkgHalfLink.href = waLink('Hi Shree Ganesh Tour and Travels (#GM), I would like a Half Day package quote for a ' + v.name + '.');
    pkgFullLink.href = waLink('Hi Shree Ganesh Tour and Travels (#GM), I would like a Full Day package quote for a ' + v.name + '.');
    pkgOutstationLink.href = waLink('Hi Shree Ganesh Tour and Travels (#GM), I would like an Outstation multi-day package quote for a ' + v.name + '.');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.vehicle-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.getAttribute('data-vehicle'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  modalTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      modalTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentPickup = tab.getAttribute('data-pickup');
      renderRateTable(currentVehicleId, currentPickup);
    });
  });

});
