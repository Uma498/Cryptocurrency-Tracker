// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrenciesList from '../CryptocurrenciesList'

import './index.css'

class CryptocurrencyTracker extends Component {
  state = {isLoading: true, cryptocurrencyData: []}

  componentDidMount = () => {
    this.getCryptocurrenciesData()
  }

  getCryptocurrenciesData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const updatedData = data.map(eachcryptocurrency => ({
      id: eachcryptocurrency.id,
      currencyName: eachcryptocurrency.currency_name,
      usdValue: eachcryptocurrency.usd_value,
      euroValue: eachcryptocurrency.euro_value,
      currencyLogoUrl: eachcryptocurrency.currency_logo,
    }))

    this.setState({cryptocurrencyData: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, cryptocurrencyData} = this.state
    return (
      <div className="app-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Rings" color="#ffffff" height={100} width={100} />
          </div>
        ) : (
          <CryptocurrenciesList cryptocurrencyData={cryptocurrencyData} />
        )}
      </div>
    )
  }
}

export default CryptocurrencyTracker
