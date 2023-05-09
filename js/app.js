const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  //* VALIDAR FORMULARIO

  if (ciudad === '' || pais === '') {
    errorMessage('Todos los campos son obligatorios', 'error');

    return;
  }
  //* CONSULTAR API

  consultarAPI(ciudad, pais);
}

function errorMessage(message, type) {
  const alerta = document.querySelector('.alerta');
  const alert = document.createElement('P');

  if (!alerta) {
    if (type === 'error') {
      alert.classList.add(
        'bg-red-500',
        'text-white',
        'p-3',
        'text-center',
        'mt-6',
        'alerta'
      );
    } else {
      alert.classList.add(
        'bg-green-500',
        'text-white',
        'p-3',
        'text-center',
        'mt-6',
        'alerta'
      );
    }

    alert.textContent = message;

    formulario.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = 'f58ceca874eb3416141f2cda1c38c184';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  fetch(url)
    .then((response) => {
      limpiarHTML();
      return response.json();
    })
    .then((datos) => {
      if (datos.cod === '404') {
        errorMessage('Ciudad Invalida', 'error');

        return;
      }

      spinner();

      setTimeout(() => {
        mosatrarClima(datos);
      }, 1000);
    });
}

function mosatrarClima(datos) {
  const {
    main: { temp, temp_max, temp_min },
    name,
  } = datos;

  const temperatura = kevinACentigrados(temp);
  const temperaturaMaxima = kevinACentigrados(temp_max);
  const temperaturaMinima = kevinACentigrados(temp_min);

  //* -----------------

  const actual = document.createElement('P');

  actual.innerHTML = `${temperatura} &#8451`;
  actual.classList.add('font-bold', 'text-6xl');

  //* -----------------

  const max = document.createElement('P');

  max.innerHTML = `Max: ${temperaturaMaxima} &#8451`;
  max.classList.add('text-xl');

  //* -----------------

  const min = document.createElement('P');

  min.innerHTML = `Min: ${temperaturaMinima} &#8451`;
  min.classList.add('text-xl');

  //* -----------------

  const nombreCiudad = document.createElement('P');
  nombreCiudad.textContent = name;
  nombreCiudad.classList.add('font-bold', 'text-2xl');

  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-black');

  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(max);
  resultadoDiv.appendChild(min);

  resultado.appendChild(resultadoDiv);
}

function kevinACentigrados(temp) {
  return parseInt(temp - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
  limpiarHTML();
  const divSpinner = document.createElement('DIV');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);

  setTimeout(() => {
    divSpinner.remove();
  }, 1000);
}
