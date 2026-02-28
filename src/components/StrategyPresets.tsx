interface StrategyPresetsProps {
  onSelect: (preset: string) => void
}

const PRESETS = [
  { label: 'BTC Price Strategy', tag: 'Crypto', query: 'Give me a BTC coin price strategy' },
  { label: 'MON Trading Signal', tag: 'Monad', query: 'What is the MON/USDC trading signal for today on Monad?' },
  { label: 'Check Wallet Balance', tag: 'Wallet', query: 'Check my wallet balance on Monad' },
  { label: 'Best Swap Route', tag: 'DeFi', query: 'Find the best swap route for 100 USDC to MON' },
  { label: 'Staking Strategy', tag: 'Yield', query: 'Should I stake my MON on aPriori? What are the rates?' },
  { label: 'Gas Optimization', tag: 'Monad', query: 'What is the current gas price on Monad and best time to transact?' },
]

export function StrategyPresets({ onSelect }: StrategyPresetsProps) {
  return (
    <div>
      <div className="section-label">Quick Strategies</div>
      <div className="preset-grid">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            className="preset-btn"
            onClick={() => onSelect(preset.query)}
          >
            <span>{preset.label}</span>
            <span className="tag">{preset.tag}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
