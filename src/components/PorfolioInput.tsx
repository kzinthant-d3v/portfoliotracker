import React, { useContext } from 'react'
import { Currency } from '../api/getmmkto'
import { PortfolioType, Portfolios } from '../pages/Portfolio'
import { PriceContext } from '../providers/PriceProvider'

type PorfolioInputProps = {
  currentCurrency: Currency
  onAction: (newPortfolio: PortfolioType, index?: number) => void;
  onCancel: () => void;
  values?: PortfolioType;
}

const currenciesArray = ["MMK", "THB", "USD"]
const portfolioTypes: Portfolios[] = ["In hand", "Assets", "Bank", "Investment", "Debt"]


function PorfolioInput({ currentCurrency, onAction, onCancel, values }: PorfolioInputProps) {
  const { currencies } = useContext(PriceContext)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formDataObject = Object.fromEntries(formData.entries());
    if (formDataObject.name === '' || formDataObject.value === '') return;
    const currency = formDataObject.currency as Currency
    let mmkValue = 0;
    let thbValue = 0;
    let usdValue = 0;

    if (currency === 'MMK') {
      mmkValue = Number(formDataObject.value)
      thbValue = mmkValue / currencies[1].value
      usdValue = mmkValue / currencies[2].value
    }
    if (currency === 'THB') {
      thbValue = Number(formDataObject.value)
      mmkValue = thbValue * currencies[1].value
      usdValue = mmkValue / currencies[2].value
    }
    if (currency === 'USD') {
      usdValue = Number(formDataObject.value)
      mmkValue = usdValue * currencies[2].value
      thbValue = mmkValue / currencies[1].value
    }

    onAction({
      name: formDataObject.name as string,
      portfolio: formDataObject.portfolio as Portfolios,
      currency,
      showCurrency: {
        'MMK': mmkValue,
        'THB': thbValue,
        'USD': usdValue,
      }
    });
    onCancel();
  };


  return (
    <form onSubmit={onSubmit}>
      <input name="name" type='text' defaultValue={values ? values.name : ""} />
      <input name="value" type='number' defaultValue={values ? values.showCurrency[values.currency] : ''} />
      <select name="currency">
        {
          currenciesArray.map((currency) => (
            <option key={currency}
              selected={!values ? currency === currentCurrency : values.currency === currency}
            >
              {currency}</option>
          ))
        }
      </select>
      <select name="portfolio">
        {portfolioTypes.map((portfolio) => (
          <option key={portfolio}
            selected={!values ? portfolio === "In hand" : values.portfolio === portfolio}
          >{portfolio}</option>
        ))}
      </select>
      <button type='submit'>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default PorfolioInput