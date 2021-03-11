import RLogin, { RLoginButton } from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState } from 'react';
import './App.css';

const rLogin = new RLogin({
  cachedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          31: 'https://public-node.testnet.rsk.co'
        }
      }
    }
  },
  supportedChains: [31] // we are going to connect to rsk testnet for this test
})

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const connect = () => rLogin.connect()
    .then(({ provider }) => {
      setProvider(provider)
      provider.request({ method: 'eth_accounts' }).then(([account]) => setAccount(account))
    })

  return (
    <div className="App">
      <RLoginButton onClick={connect}>Connect wallet</RLoginButton>
      <p>wallet address: {account}</p>
    </div>
  );
}

export default App;
