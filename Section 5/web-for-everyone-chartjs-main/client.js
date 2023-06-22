$(() => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Some Data',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 25, 40, 25, 10, 25, 50],
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {},
  };

  const myChart = new Chart($('#myChart'), config);
});
