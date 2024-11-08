function formatDate(dateString) {
  // esta funcao recebe uma data em formato string e retorna para o formato brasileiro

  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`
}

const backgroundColorBarChart = [ // lista de cores para cada barra
  'rgba(255, 99, 132, 0.5)',
  'rgba(255, 159, 64, 0.5)',
  'rgba(255, 205, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(201, 203, 207, 0.5)'
];

const borderColorBarChart = [ // lista de cores da borda de cada barra
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

const backgroundColorPolar = [ // lista de cores para o grafico polar
  'rgb(255, 99, 132)',
  'rgb(75, 192, 192)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)',
  'rgb(54, 162, 235)'
];

const labelsPolarChart = ['1º Quadri', '2º Quadri', '3º Quadri']; // labels grafico polar

const months = [ // labels grafico de barras
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const emojis = ['😀', '😎', '😜', '🤑', '🤩', '😁', '🙃', '🤡', '😍']; // lista de emojis de para troca dinamica