(function ($) {
  'use strict';

  var translations = {
    es: {
      siteTitle: 'Pura Suerte',
      brand: 'pura suerte',
      menu: 'Menú',
      nav: {
        home: 'Inicio',
        coin: 'Moneda',
        number: 'Número',
        raffle: 'Sorteo'
      },
      routes: {
        home: 'Elige una herramienta',
        coin: 'Lanzar moneda',
        number: 'Número aleatorio',
        raffle: 'Sorteo'
      },
      home: {
        eyebrow: 'Un pequeño empujón del universo',
        title: 'Haz tu propia suerte.',
        description: 'Tres herramientas para esos momentos en los que quieres un empujón, un número o un nombre.',
        pickTool: 'Elige tu herramienta',
        chooseChance: 'Elige tu tipo de suerte'
      },
      tool: {
        coin: {
          title: 'Lanzar moneda',
          description: 'Deja que el azar decida.'
        },
        number: {
          title: 'Número aleatorio',
          description: 'Elige un número dentro de tu rango.'
        },
        raffle: {
          title: 'Sorteo',
          description: 'Dale a cada nombre la misma oportunidad.'
        }
      },
      coin: {
        eyebrow: 'Lanzar moneda',
        title: '¿Cara o cruz?',
        description: 'Deja que la decisión se haga sola por un segundo.',
        flip: 'Lanzar moneda',
        air: 'En el aire...',
        result: 'La decisión es',
        heads: 'Cara',
        tails: 'Cruz'
      },
      number: {
        eyebrow: 'Número aleatorio',
        title: 'Define tu rango.',
        description: 'Fija los límites. Nosotros encontraremos el número escondido entre ellos.',
        min: 'Mín',
        max: 'Máx',
        generate: 'Generar un número',
        wholeNumbers: 'Usa números enteros para ambos límites.',
        minMax: 'El mínimo debe ser menor o igual que el máximo.',
        result: 'Tu número'
      },
      raffle: {
        eyebrow: 'Sorteo',
        title: '¿Quién recibe la buena noticia?',
        description: 'Agrega un nombre por línea. Cada línea tiene la misma posibilidad.',
        label: 'Nombres o participantes',
        placeholder: 'Maya\nLuis\nSam',
        oneReady: '1 participante listo',
        count: '{{count}} listos',
        duplicate: 'Los duplicados cuentan por separado',
        pick: 'Elegir ganador',
        result: 'El ganador es',
        entry: 'participante',
        entries: 'participantes'
      }
    },
    en: {
      siteTitle: 'Pura Suerte',
      brand: 'pura suerte',
      menu: 'Menu',
      nav: {
        home: 'Home',
        coin: 'Coin',
        number: 'Number',
        raffle: 'Raffle'
      },
      routes: {
        home: 'Choose a luck tool',
        coin: 'Toss a coin',
        number: 'Random number',
        raffle: 'Raffle'
      },
      home: {
        eyebrow: 'A little help from the universe',
        title: 'Make your own luck.',
        description: 'Three tiny tools for the moments when you want a nudge, a number, or a name.',
        pickTool: 'Pick your tool',
        chooseChance: 'Choose your kind of chance'
      },
      tool: {
        coin: {
          title: 'Toss a coin',
          description: 'Let chance make the call.'
        },
        number: {
          title: 'Random number',
          description: 'Pick a number in your range.'
        },
        raffle: {
          title: 'Raffle',
          description: 'Give every name a fair shot.'
        }
      },
      coin: {
        eyebrow: 'Toss a coin',
        title: 'Heads or tails?',
        description: 'Take the decision out of your hands for a second.',
        flip: 'Flip the coin',
        air: 'In the air...',
        result: 'The call is',
        heads: 'Heads',
        tails: 'Tails'
      },
      number: {
        eyebrow: 'Random number',
        title: 'Name your range.',
        description: 'Set the edges. We will find the number hiding between them.',
        min: 'Min',
        max: 'Max',
        generate: 'Generate a number',
        wholeNumbers: 'Use whole numbers for both limits.',
        minMax: 'Your minimum must be less than or equal to your maximum.',
        result: 'Your number'
      },
      raffle: {
        eyebrow: 'Raffle',
        title: 'Who gets the good news?',
        description: 'Add one name per line. Every line gets one fair shot.',
        label: 'Names or entries',
        placeholder: 'Maya\nLuis\nSam',
        oneReady: '1 entry ready',
        count: '{{count}} ready',
        duplicate: 'Duplicates count separately',
        pick: 'Pick a winner',
        result: 'The winner is',
        entry: 'entry',
        entries: 'entries'
      }
    }
  };

  var routes = {
    '/': { name: 'home' },
    '/coin': { name: 'coin' },
    '/number': { name: 'number' },
    '/raffle': { name: 'raffle' }
  };

  var navItems = [
    { route: '/', key: 'home', icon: 'bi-house-fill' },
    { route: '/coin', key: 'coin', icon: 'bi-circle-fill' },
    { route: '/number', key: 'number', icon: 'bi-dice-5-fill' },
    { route: '/raffle', key: 'raffle', icon: 'bi-trophy-fill' }
  ];

  var toolItems = [
    { route: '/coin', key: 'coin', icon: 'bi-circle-fill', tone: 'tone-yellow', number: '01' },
    { route: '/number', key: 'number', icon: 'bi-dice-5-fill', tone: 'tone-coral', number: '02' },
    { route: '/raffle', key: 'raffle', icon: 'bi-trophy-fill', tone: 'tone-mint', number: '03' }
  ];

  function normalizeLocale(locale) {
    var value = (locale || 'es').toLowerCase();
    if (value.indexOf('en') === 0) return 'en';
    if (value.indexOf('es') === 0) return 'es';
    return 'es';
  }

  function currentLocale() {
    var params = new URLSearchParams(window.location.search || '');
    var requested = params.get('lang');
    return normalizeLocale(requested || (window.navigator.language || 'es'));
  }

  function t(key, values) {
    var locale = currentLocale();
    var dictionary = translations[locale] || translations.es;
    var path = key.split('.');
    var text = dictionary;

    for (var i = 0; i < path.length; i += 1) {
      if (!text || !Object.prototype.hasOwnProperty.call(text, path[i])) {
        text = translations.es;
        for (var j = 0; j <= i; j += 1) {
          if (!text || !Object.prototype.hasOwnProperty.call(text, path[j])) {
            return key;
          }
          text = text[path[j]];
        }
        return key;
      }
      text = text[path[i]];
    }

    if (typeof text !== 'string') return key;

    if (!values) return text;

    return Object.keys(values).reduce(function (result, paramKey) {
      return result.replace(new RegExp('\\{\\{\\s*' + paramKey + '\\s*\\}\\}', 'g'), String(values[paramKey]));
    }, text);
  }

  function routeLabel(route) {
    return t('routes.' + routes[route].name);
  }

  function currentRoute() {
    var route = window.location.hash.slice(1) || '/';
    return routes[route] ? route : '/';
  }

  function linkFor(route) {
    return '#' + route;
  }

  function escapeHtml(value) {
    return $('<div>').text(String(value)).html();
  }

  function randomInteger(min, max) {
    var range = max - min + 1;
    var values = new Uint32Array(1);
    var limit = Math.floor(0x100000000 / range) * range;
    var value;

    do {
      window.crypto.getRandomValues(values);
      value = values[0];
    } while (value >= limit);

    return (value % range) + min;
  }

  function renderHeader(route) {
    var backLink = route !== '/' ? '<a class="menu-link d-inline-flex align-items-center gap-2" href="#/"><i class="bi bi-arrow-left" aria-hidden="true"></i>' + t('menu') + '</a>' : '';
    $('#site-header').html(
      '<div class="d-flex align-items-center justify-content-between gap-3">' +
        '<a class="brand-link d-inline-flex align-items-center gap-3" href="#/">' +
          '<span class="brand-mark"><i class="bi bi-stars" aria-hidden="true"></i></span>' +
          '<span>' + t('brand') + '</span>' +
        '</a>' + backLink +
      '</div>'
    );
  }

  function renderNavigation(route) {
    var html = '<div class="bottom-nav-inner">';
    navItems.forEach(function (item) {
      var active = route === item.route ? ' active' : '';
      var current = route === item.route ? ' aria-current="page"' : '';
      html += '<a class="nav-link' + active + '" href="' + linkFor(item.route) + '"' + current + '>' +
        '<i class="bi ' + item.icon + '" aria-hidden="true"></i>' + t('nav.' + item.key) + '</a>';
    });
    html += '</div>';
    $('#bottom-nav').html(html);
  }

  function pageIntro(icon, tone, eyebrow, title, description) {
    return '<section class="mb-5">' +
      '<div class="page-icon ' + tone + '"><i class="bi ' + icon + '" aria-hidden="true"></i></div>' +
      '<p class="eyebrow ' + tone.replace('tone-', 'text-') + '">' + eyebrow + '</p>' +
      '<h1 class="page-heading">' + title + '</h1>' +
      '<p class="page-description">' + description + '</p>' +
    '</section>';
  }

  function resultPanel(label, value, tone) {
    return '<div class="result-panel ' + tone + '" aria-live="polite">' +
      '<p class="result-label">' + label + '</p>' +
      '<div class="result-value">' + escapeHtml(value) + '</div>' +
    '</div>';
  }

  function renderHome() {
    var cards = toolItems.map(function (item) {
      var title = t('tool.' + item.key + '.title');
      var description = t('tool.' + item.key + '.description');
      return '<a class="tool-card" href="' + linkFor(item.route) + '">' +
        '<div class="d-flex align-items-start justify-content-between">' +
          '<span class="tool-icon ' + item.tone + '"><i class="bi ' + item.icon + '" aria-hidden="true"></i></span>' +
          '<span class="tool-number">' + item.number + '</span>' +
        '</div>' +
        '<div>' +
          '<div class="d-flex align-items-center justify-content-between gap-3 mb-2">' +
            '<h2 class="tool-title">' + title + '</h2>' +
            '<i class="bi bi-arrow-up-right text-white-50" aria-hidden="true"></i>' +
          '</div>' +
          '<p class="tool-description">' + description + '</p>' +
        '</div>' +
      '</a>';
    }).join('');

    return '<div>' +
      '<section class="mb-5">' +
        '<p class="eyebrow text-yellow">' + t('home.eyebrow') + '</p>' +
        '<h1 class="page-heading">' + t('home.title') + '</h1>' +
        '<p class="page-description">' + t('home.description') + '</p>' +
      '</section>' +
      '<section aria-labelledby="tools-heading">' +
        '<div class="d-flex align-items-end justify-content-between gap-3 mb-3">' +
          '<h2 id="tools-heading" class="h2 font-display fw-bold mb-0">' + t('home.pickTool') + '</h2>' +
          '<span class="d-none d-sm-block text-white-50 small">' + t('home.chooseChance') + '</span>' +
        '</div>' +
        '<div class="row g-3">' + cards.split('</a>').filter(Boolean).map(function (card) { return '<div class="col-md-4">' + card + '</a></div>'; }).join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  function renderCoin() {
    return '<div>' +
      pageIntro('bi-circle-fill', 'tone-yellow', t('coin.eyebrow'), t('coin.title'), t('coin.description')) +
      '<section class="tool-panel coin-stage mb-4">' +
        '<div class="coin-perspective"><div id="coin" class="coin">' +
          '<div class="coin-face"><div class="coin-face-inner"><span class="coin-letter">H</span></div></div>' +
          '<div class="coin-face coin-tail"><div class="coin-face-inner"><span class="coin-letter">T</span></div></div>' +
        '</div></div>' +
        '<button id="flip-button" type="button" class="action-button btn-light w-100" style="max-width: 320px">' + t('coin.flip') + '</button>' +
      '</section>' +
      '<div id="coin-result"></div>' +
    '</div>';
  }

  function renderNumber() {
    return '<div>' +
      pageIntro('bi-dice-5-fill', 'tone-coral', t('number.eyebrow'), t('number.title'), t('number.description')) +
      '<section class="tool-panel mb-4">' +
        '<div class="row g-3 mb-4">' +
          '<div class="col-sm-6"><label class="form-label" for="minimum">' + t('number.min') + '</label><input id="minimum" class="form-control mt-2" type="number" inputmode="numeric" value="1"></div>' +
          '<div class="col-sm-6"><label class="form-label" for="maximum">' + t('number.max') + '</label><input id="maximum" class="form-control mt-2" type="number" inputmode="numeric" value="100"></div>' +
        '</div>' +
        '<p id="number-error" class="mb-3 text-coral fw-bold small" role="alert"></p>' +
        '<button id="number-button" type="button" class="action-button tone-coral w-100">' + t('number.generate') + '</button>' +
      '</section>' +
      '<div id="number-result"></div>' +
    '</div>';
  }

  function renderRaffle() {
    return '<div>' +
      pageIntro('bi-trophy-fill', 'tone-mint', t('raffle.eyebrow'), t('raffle.title'), t('raffle.description')) +
      '<section class="tool-panel mb-4">' +
        '<label class="form-label d-block" for="entries">' + t('raffle.label') + '</label>' +
        '<textarea id="entries" class="form-control mt-2" rows="7" placeholder="' + t('raffle.placeholder') + '"></textarea>' +
        '<div class="d-flex align-items-center justify-content-between gap-3 mt-3 text-white-50 small"><span id="entry-count">' + t('raffle.oneReady') + '</span><span id="duplicate-note"></span></div>' +
        '<button id="raffle-button" type="button" class="action-button tone-mint w-100 mt-4" disabled>' + t('raffle.pick') + '</button>' +
      '</section>' +
      '<div id="raffle-result"></div>' +
    '</div>';
  }

  function parseEntries(value) {
    return value.split('\n').map(function (entry) { return entry.trim(); }).filter(Boolean);
  }

  function bindCoin() {
    var flipping = false;
    $('#flip-button').on('click', function () {
      if (flipping) return;
      flipping = true;
      $('#coin').addClass('is-flipping');
      $('#flip-button').prop('disabled', true).text(t('coin.air'));
      window.setTimeout(function () {
        var result = randomInteger(0, 1) === 0 ? t('coin.heads') : t('coin.tails');
        $('#coin-result').html(resultPanel(t('coin.result'), result, 'tone-yellow'));
        $('#coin').removeClass('is-flipping');
        $('#flip-button').prop('disabled', false).text(t('coin.flip'));
        flipping = false;
      }, 900);
    });
  }

  function bindNumber() {
    $('#number-button').on('click', function () {
      var minimum = Number($('#minimum').val());
      var maximum = Number($('#maximum').val());
      var error = '';
      if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) error = t('number.wholeNumbers');
      if (!error && minimum > maximum) error = t('number.minMax');
      $('#number-error').text(error);
      if (error) {
        $('#number-result').empty();
        return;
      }
      $('#number-result').html(resultPanel(t('number.result'), randomInteger(minimum, maximum), 'tone-coral'));
    });
  }

  function bindRaffle() {
    function updateEntries() {
      var entries = parseEntries($('#entries').val());
      var countLabel = entries.length === 1 ? t('raffle.oneReady') : t('raffle.count', { count: entries.length });
      $('#entry-count').text(countLabel);
      $('#duplicate-note').text(entries.length ? t('raffle.duplicate') : '');
      $('#raffle-button').prop('disabled', entries.length === 0);
      return entries;
    }
    $('#entries').on('input', updateEntries);
    $('#raffle-button').on('click', function () {
      var entries = updateEntries();
      if (!entries.length) return;
      $('#raffle-result').html(resultPanel(t('raffle.result'), entries[randomInteger(0, entries.length - 1)], 'tone-mint'));
    });
  }

  function render(route) {
    var normalizedRoute = routes[route] ? route : '/';
    document.documentElement.lang = currentLocale();
    document.title = t('siteTitle');
    renderHeader(normalizedRoute);
    renderNavigation(normalizedRoute);
    $('#current-tool').text(routeLabel(normalizedRoute));
    if (normalizedRoute === '/') $('#main-content').html(renderHome());
    if (normalizedRoute === '/coin') { $('#main-content').html(renderCoin()); bindCoin(); }
    if (normalizedRoute === '/number') { $('#main-content').html(renderNumber()); bindNumber(); }
    if (normalizedRoute === '/raffle') { $('#main-content').html(renderRaffle()); bindRaffle(); }
    $('#main-content').trigger('focus');
  }

  $(window).on('hashchange', function () { render(currentRoute()); });
  $(function () { render(currentRoute()); });
})(jQuery);
