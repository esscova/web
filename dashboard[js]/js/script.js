// elementos html
const switchToggle = document.querySelector('.switch-toggle'); // container para temas
const icons = switchToggle.querySelectorAll('.material-symbols-outlined'); // icones dos temas
const polarChart = document.getElementById('polarChart'); // grafico polar
const barChart = document.getElementById('barChart'); // grafico de barras
const controlButtons = document.querySelectorAll('.controls button'); // filtros

// variaveis para os graficos
let newBarChart; // instancia
let newPolarChart; // instancia
let barChartValue = []; // valores
let polarChartValue = []; // valores

let optionPolarChart = { // estilo grafico no dark theme
  scales: {
    r: {
      grid: {
        color: '#666666'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#dce1eb'
      }
    }
  }
};
let optionBarChart = { // estilo grafico no dark theme
  scales: {
    y: {
      grid: {
        color: '#666666'
      },
      ticks: {
        color: '#dce1eb'
      }
    },
    x: {
      grid: {
        color: '#666666'
      },
      ticks: {
        color: '#dce1eb'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#dce1eb'
      }
    }
  }
};

// alternar temas
switchToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables'); // alterna o tema

  icons.forEach(spn => {
    spn.classList.toggle('switch-actived')
  }); // alterna o icone ativo

  // atualizacao de graficos durante o evento
  configureChartOptions();
  updateBarChartOptions();
  updatePolarChartOptions();
});


function handleShowEmoji() {
  // esta funcao altera o emoji conforme refresh
  const index = Math.floor(Math.random() * emojis.length); // indice aleatorio
  const emojiSort = emojis[index]; // lista de emojis em utils

  document.querySelector('.emoji').innerHTML = emojiSort; // inserindo emoji
};


// dados
async function handleFetch() {
  // esta função faz um requisicao assincrona para o arquivo data.json e retorna os dados como um objeto js
  
  const response = await fetch('data.json');
  return await response.json();
}

// adicionando dados aos graficos
async function hanldeChartValues() {
  // esta função é responsavel por processar os dados financeiros para exibicao nos graficos.

  const data = await handleFetch(); // dados
  const combinedData = [...data.input, ...data.output]; // array unico com entradas e saidas

  // agrupamento de valores por mes
  const monthSums = combinedData.reduce((acc, item) => {
    const [year, month] = item.date.split('-');
    const monthKey = `${year}-${month}`; // cria uma key para filtragem

    // usar chaves do mes para somar valores
    acc[monthKey] = acc[monthKey] || { input: 0, output: 0 };


    // acumular valores entradas e saidas
    if (data.input.includes(item)) {
      acc[monthKey].input += item.amount
    } else {
      acc[monthKey].output += item.amount
    }

    return acc;
  }, {});

  // calcular o balanço mensal
  const result = Object.values(monthSums).map(({ input, output }) => input - output)

  barChartValue = result;
  updateBarChartOptions();

  // agrupamento de valores quadrimestrais para o grafico polar
  const groups = [];
  const groupLength = 4;

  for (let i = 0; i < result.length; i += groupLength) {
    const group = result.slice(i, i + groupLength);
    const groupSum = group.reduce((acc, valor) => acc + valor, 0);

    groups.push(groupSum);
  }

  polarChartValue = groups;
  updatePolarChartOptions();
}

// configuração codicional de estilos para os graficos
let configurePolarChart = {};
let configureBarChart = {};

function configureChartOptions() {
  // esta função verifica se o tema escuro está ativado através da classe.
  // se estiver aplica as configurações definidas para os estilos, caso contrario, não há personalização adicional.
  const darkThemeActive = document.body.classList.contains('dark-theme-variables');

  if (darkThemeActive) {
    configurePolarChart = optionPolarChart;
    configureBarChart = optionBarChart;
  } else {
    configurePolarChart = {};
    configureBarChart = {};
  }
}

// update graficos

// polar
function updatePolarChartOptions() {
  // esta função recria o grafico polar com base nos dados e labels definidos no utils.js
  // ele destroi o grafico existente antes de gerar um novo, isso evita sobreposiçao de graficos.
  
  newPolarChart && newPolarChart.destroy(); // destroi o grafico

  newPolarChart = new Chart(polarChart, {
    type: 'polarArea',
    data: {
      labels: labelsPolarChart, // labels no utils
      datasets: [{
        data: polarChartValue, // dados no utils
        backgroundColor: backgroundColorPolar // cores no utils
      }]
    },
    options: configurePolarChart // configs do tema
  });
}

// barras
async function updateBarChartOptions() {
  // esta função recria o grafico de barras de forma semelhante ao grafico polar

  newBarChart && newBarChart.destroy(); // destroi o grafico

  newBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: months, // labels no utils
      datasets: [{
        label: 'Meses',
        data: barChartValue, // dados mensais
        backgroundColor: backgroundColorBarChart, // cor de fundo das barras
        borderColor: borderColorBarChart, // cores das bordas
        borderWidth: 1 // espessura da borda
      }]
    },
    options: configureBarChart // configs do tema
  });

};

// manipulação da tabela

controlButtons.forEach(button => {
  button.addEventListener('click', () => {
    controlButtons.forEach(btn => btn.classList.remove('selectedControlers')); // iterando array para remover classe

    handleShowTable(button.role)
    button.classList.add('selectedControlers');
  })
});

async function handleShowTable(role) {
  // esta funcao filtra e exibe registros na tabela de acordo com o botao selecionado.
  // para cada item: uma linha > icone descricao valor e data

  const data = await handleFetch();
  const lista = role === '0' || role === undefined ? [...data.input, ...data.output] : role === '1' ? data.input : data.output;
  const tbody = document.getElementById('table-body');

  tbody.innerHTML = ""; // limpar conteudo

  // filtrando pelo mes de janeiro de 23
  const result = lista.filter(item => {
    const [year, month] = item.date.split('-')
    const monthKey = `${year}-${month}`;

    if (monthKey === '2023-01') {
      return item
    }
  });

  result.forEach(item => { // converter e ordenar datas
    item.dateObj = new Date(item.date)
  });

  result.sort((a, b) => a.dateObj - b.dateObj); // ordenar registros

  // inserindo os dados na tabela
  result.forEach(item => {
    const row = document.createElement('tr');

    // inserindo icone de transacao dinamicamente com logica condicional
    const iconCell = document.createElement('td');
    iconCell.classList.add('icon-table');
    iconCell.innerHTML =
      item.type === 'input'
        ? '<span class="material-symbols-outlined positive"> trending_up </span>'
        : '<span class="material-symbols-outlined negative"> trending_down </span>'
    row.appendChild(iconCell);

    // inserindo valor para descricao
    const descriptionCell = document.createElement('td');
    descriptionCell.classList.add('description');
    descriptionCell.textContent = item.description;
    row.appendChild(descriptionCell);

    // inserindo valor para transacao
    const amountCell = document.createElement('td');
    amountCell.classList.add('amount');
    // formata decimais e acrescenta '-' para valores de saidas
    amountCell.textContent = `${item.type === 'output' ? `- R$ ${item.amount.toFixed(2)}` : `R$ ${item.amount.toFixed(2)}`}`;
    row.appendChild(amountCell);

    // inserindo valor data com formatacao 
    const date = document.createElement('td');
    date.classList.add('date');
    date.textContent = formatDate(item.date); // funcao em utils
    row.appendChild(date);

    tbody.appendChild(row);
  })
}


handleShowTable();
handleShowEmoji();
hanldeChartValues();
