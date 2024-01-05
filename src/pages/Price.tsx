import { useContext } from "react"
import { PriceContext } from "../providers/PriceProvider";

function Price() {
  const { currencies, fetchPrice, loading, lastUpdated } = useContext(PriceContext)
  if (loading) return <h1>Loading</h1>

  return (
    <div>
      <button onClick={() => fetchPrice(true)}>Refetch</button>
      <div>
        <h1>1 THB : {currencies[1]?.value} MMK</h1>
      </div>
      <div>
        <h1>1 USD : {currencies[2]?.value} MMK</h1>
      </div>
      <p>Last Updated: {lastUpdated}</p>
    </div>
  )
}

export default Price