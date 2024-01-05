import React, { useState } from 'react'
import { Currency } from '../api/getmmkto'
import PorfolioInput from '../components/PorfolioInput'
import PieChart from '../components/PieChart'
import Total from '../components/Total'
import Liquid from '../components/Liquid'
import Illliquid from '../components/Illiquid'
import Debt from '../components/Debt'

export type Portfolios = "Assets" | "Bank" | "In hand" | "Investment" | "Debt"

export type PortfolioType = {
  name: string
  portfolio: Portfolios
  currency: Currency
  showCurrency: {
    [K in Currency]: number
  }
  isEditing?: boolean
}

function Portfolio() {
  const [portfolios, setPortfolios] = React.useState<PortfolioType[]>([])
  const [currentCurrency, setCurrentCurrency] = React.useState<Currency>("MMK")

  const [add, setAdd] = useState(false)

  const changeAdd = (val: boolean) => {
    setAdd(val)
  }

  const addPortfolio = (newPortfolio: PortfolioType) => {
    setPortfolios(prev => [...prev, newPortfolio])
  }

  const addEditPortfolio = (newPortfolio: PortfolioType, index: number) => {
    setPortfolios(prev => prev.map((p, i) => {
      if (i === index) {
        return newPortfolio
      }
      return p;
    }))
  }


  const editPortfolio = (index: number, isToEdit: boolean) => {
    setPortfolios(prev => prev.map((p, i) => {
      if (i === index) {
        return {
          ...p,
          isEditing: isToEdit
        }
      }
      return p;
    }))
  }

  const removePortfolio = (index: number) => {
    setPortfolios(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <Total portfolios={portfolios} currentCurrency={currentCurrency} />
      <Liquid portfolios={portfolios} currentCurrency={currentCurrency} />
      <Illliquid portfolios={portfolios} currentCurrency={currentCurrency} />
      <Debt portfolios={portfolios} currentCurrency={currentCurrency} />
      <label>
        <input type='radio' name='currency' value="MMK"
          onChange={(e) => setCurrentCurrency(e.currentTarget.value as Currency)}
          checked={currentCurrency === "MMK"}
        />
        MMK
      </label>
      <label>
        <input type='radio' name='currency' value="THB"
          onChange={(e) => setCurrentCurrency(e.currentTarget.value as Currency)}
          checked={currentCurrency === "THB"}
        />
        THB
      </label>
      <label>
        <input type='radio' name='currency' value="USD"
          onChange={(e) => setCurrentCurrency(e.currentTarget.value as Currency)}
          checked={currentCurrency === "USD"}
        />
        USD
      </label>
      {
        portfolios.length > 0 && portfolios.map((p, i) => (
          <div
            key={p.name + p.portfolio + p.currency}
          >
            {
              !p.isEditing ?
                <div>
                  {p.name} {p.portfolio} {p.showCurrency[p.currency].toLocaleString()} {p.currency} , View: {Number(p.showCurrency[currentCurrency].toFixed(2)).toLocaleString()} {currentCurrency}
                  <button onClick={() => editPortfolio(i, true)}>edit</button>
                  <button onClick={() => removePortfolio(i)}>remove</button>
                </div> :
                <div>
                  <PorfolioInput currentCurrency={currentCurrency}
                    onAction={(editedPortfolio) => addEditPortfolio(editedPortfolio, i)}
                    onCancel={() => editPortfolio(i, false)}
                    values={portfolios[i]}
                  />
                </div>
            }
          </div>))
      }

      <br />
      <br />
      <br />
      Sum: {Number(portfolios.reduce((acc, p) => acc + Number(p.showCurrency[currentCurrency].toFixed(2)), 0).toFixed(2)).toLocaleString()} {currentCurrency}
      <br />
      <br />
      <br />
      <button onClick={() => changeAdd(true)}>Add</button>
      {
        add && <PorfolioInput currentCurrency={currentCurrency}
          onAction={addPortfolio}
          onCancel={() => changeAdd(false)}
        />
      }
      <div style={{ width: '500px' }}>
        <PieChart currentCurrency={currentCurrency}
          portfolios={portfolios}
        />
      </div>
    </div>
  )
}

export default Portfolio