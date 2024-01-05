import { Currency } from '../api/getmmkto'
import { illiquid } from '../config'
import { PortfolioType } from '../pages/Portfolio'

type LiquidProps = {
  portfolios: PortfolioType[]
  currentCurrency: Currency
}


function Liquid({ portfolios, currentCurrency }: LiquidProps) {
  const total = Number(portfolios.reduce((acc, p) => {
    if (illiquid.includes(p.portfolio))
      return acc;
    return acc + p.showCurrency[currentCurrency]
  }, 0).toFixed(2)).toLocaleString()

  return (
    <div>
      <h1>Liquid Value</h1>
      <h2>{total}  {currentCurrency}</h2>
    </div>
  )
}

export default Liquid