export type Currency = 'MMK' | 'THB' | 'USD'

export type PriceCurrency = {
  currency: Currency,
  value: number
}
export const getPrices = async (currency: 'MMK' | 'THB') => {
  const response = await fetch(
    'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "123",
        "content-type": "application/json",
        "Host": "p2p.binance.com",
        "Origin": "https://p2p.binance.com",
        "Pragma": "no-cache",
      },
      body: JSON.stringify({
        page: 1,
        rows: 20,
        publisherType: null,
        asset: 'USDT',
        tradeType: 'BUY',
        fiat: currency,
        payTypes: [],
      }),
    }
  );
  if(!response.ok) {
    throw new Error('Wrong from server');
  }
  const result = await response.json();
  const data = result.data;
  const prices: string[] = [];
  if(data) {
    for (const item of data) {
      prices.push(item.adv.price);
    }
  }
  return prices;
};

export const getmmkto = async (): Promise<PriceCurrency[]> => {
  const prices = await getPrices('THB');
  const dollarPrices = await getPrices('MMK');
  
  const dollarValue = (dollarPrices.reduce((a, b) => a + +b, 0) / dollarPrices.length).toFixed(0);

  const thbValue=  (prices.map((p,i) => +dollarPrices[i]/+p).reduce((a, b) => a + +b, 0) / prices.length).toFixed(2);
  
  return [{
    currency: 'MMK',
    value: 1
  }, 
  {
    currency: 'THB',
    value: +(+thbValue).toFixed(2)
  },
  {
    currency: 'USD',
    value: +dollarValue
  },

]

}