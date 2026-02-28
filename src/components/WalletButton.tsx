import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { monadTestnet } from '../config/wagmi'

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address,
    chainId: monadTestnet.id,
  })

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <span className="wallet-balance">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '...'}
          </span>
          <span className="wallet-address">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button className="wallet-btn disconnect" onClick={() => disconnect()}>
          ×
        </button>
      </div>
    )
  }

  return (
    <button
      className="wallet-btn connect"
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
