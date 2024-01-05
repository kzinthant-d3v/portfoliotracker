import { Currency } from '../api/getmmkto'
import { PortfolioType } from '../pages/Portfolio'

type DebtProps = {
  portfolios: PortfolioType[]
  currentCurrency: Currency
}


function Debt({ portfolios, currentCurrency }: DebtProps) {
  const total = Number(portfolios.reduce((acc, p) => {
    if (p.portfolio !== "Debt")
      return acc;
    return acc + p.showCurrency[currentCurrency]
  }, 0).toFixed(2)).toLocaleString()

  return (
    <div>
      <h1>Debt</h1>
      <h2>{total}  {currentCurrency}</h2>
    </div>
  )
}

export default Debt