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
  const [account, setAccount] = useState('')
  const [txHash, setTxHash] = useState('')

  const connect = () => rLogin.connect()
    .then(({ provider }) => {
      setProvider(provider)
      provider.request({ method: 'eth_accounts' }).then(([account]) => setAccount(account))
    })

  const faucetAddress = '0x88250f772101179a4ecfaa4b92a983676a3ce445'
  const sendTransaction = () => provider.request({
    method: 'eth_sendTransaction',
    params: [{ from: account, to: faucetAddress, value: '100000' }]
  }).then(setTxHash)

  return (
    <div className="App">
      <RLoginButton onClick={connect}>Connect wallet</RLoginButton>
      <p>wallet address: {account}</p>
      <button onClick={sendTransaction} disabled={!account}>send transaction</button>
      <p>txHash: {txHash}</p>
    </div>
  );
}

export default App;
