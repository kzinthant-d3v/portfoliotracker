import { Currency } from '../api/getmmkto'
import { PortfolioType } from '../pages/Portfolio'

type TotalProps = {
  portfolios: PortfolioType[]
  currentCurrency: Currency
}

function Total({ portfolios, currentCurrency }: TotalProps) {
  const total = Number(portfolios.reduce((acc, p) => {
    return acc + p.showCurrency[currentCurrency]
  }, 0).toFixed(2)).toLocaleString()

  return (
    <div>
      <h1>Total</h1>
      <h2>{total}  {currentCurrency}</h2>
    </div>
  )
}

export default Total