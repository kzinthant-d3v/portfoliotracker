import Portfolio from "./pages/Portfolio"
import Price from "./pages/Price"
import PriceProvider from "./providers/PriceProvider"

function App() {
  return (
    <PriceProvider>
      <Price />
      <Portfolio />
    </PriceProvider>
  )
}

export default App
