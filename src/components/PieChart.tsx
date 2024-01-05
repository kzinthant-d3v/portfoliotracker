import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Currency } from '../api/getmmkto';
import { PortfolioType, Portfolios } from '../pages/Portfolio';

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  currentCurrency: Currency;
  portfolios: PortfolioType[]
}

function PieChart({ currentCurrency, portfolios }: PieChartProps) {
  const chartObj: Record<Portfolios, number> = {
    "Assets": 0,
    "Bank": 0,
    "In hand": 0,
    "Investment": 0,
    "Debt": 0,
  }

  portfolios.forEach((p) => {
    chartObj[p.portfolio] = chartObj[p.portfolio] + p.showCurrency[currentCurrency]
  });

  const data = {
    labels: Object.keys(chartObj),
    datasets: [
      {
        label: `Portfolio in ${currentCurrency}`,
        data: Object.values(chartObj),
        backgroundColor: [
          '#8338ec',
          '#2c6e49',
          '#2a9d8f',
          '#3a86ff',
          '#d62828',
        ],
        borderColor: [
          '#8338ec',
          '#2c6e49',
          '#2a9d8f',
          '#3a86ff',
          '#d62828',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  )
}

export default PieChart