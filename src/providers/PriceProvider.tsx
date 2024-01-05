import React, { useEffect, useState } from 'react'
import { PriceCurrency, getmmkto } from '../api/getmmkto';

type PriceType = {
  currencies: PriceCurrency[]
  loading: boolean
  fetchPrice: (withLoading: boolean) => void
  lastUpdated: string
}

export const PriceContext = React.createContext({} as PriceType)

const getDateTimte = () => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedTime = formatter.format(date);
  return formattedTime;
}

const PriceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [price, setPrice] = useState([] as PriceCurrency[])
  const [lastUpdated, setLastUpdated] = useState(() => getDateTimte());
  const [loading, setLoading] = useState(true);

  const fetchPrice = async (withLoading = false) => {
    console.log('...fetching price')
    if (withLoading)
      setLoading(true);

    setPrice(await getmmkto())
    setLastUpdated(getDateTimte())

    if (withLoading)
      setLoading(false)
  }

  useEffect(() => {
    (async () => {
      await fetchPrice(true);
    })();

    const interval = setInterval(async () => {
      await fetchPrice();
    }, 180000)

    return () => clearInterval(interval)
  }, [])

  return (
    <PriceContext.Provider value={{
      currencies: price,
      loading,
      fetchPrice,
      lastUpdated
    }}>{children}</PriceContext.Provider>
  )
}


export default PriceProvider