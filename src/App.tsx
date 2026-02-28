import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './components/ChatMessage'
import { StrategyPresets } from './components/StrategyPresets'
import { WalletButton } from './components/WalletButton'
import { useStrategyAgent } from './hooks/useStrategyAgent'

interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

const SIGNATURE = 'ac3c0b87c8b242a6a611d59b35c1d4893efeb4e4b20f9317a7b6e9ad00c6e244'

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sendMessage, isLoading } = useStrategyAgent()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    const response = await sendMessage(input.trim(), SIGNATURE)
    
    if (response) {
      const agentMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, agentMessage])
    }
  }

  const handlePresetClick = (preset: string) => {
    setInput(preset)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <div className="logo-mark">V</div>
          <span className="logo-text">VEXOR</span>
        </div>
        
        <nav className="nav-pills">
          <button className="nav-pill active">Strategy</button>
          <button className="nav-pill">Portfolio</button>
          <button className="nav-pill">Signals</button>
        </nav>

        <WalletButton />
      </header>

      <main className="main">
        <aside className="sidebar">
          <StrategyPresets onSelect={handlePresetClick} />
          
          <div className="config-section">
            <div className="section-label">Session Config</div>
            <div className="config-row">
              <span className="config-label">Network</span>
              <span className="config-value">Monad</span>
            </div>
            <div className="config-row">
              <span className="config-label">Agent</span>
              <span className="config-value">v1.0</span>
            </div>
            <div className="config-row">
              <span className="config-label">Session</span>
              <span className="config-value">{SIGNATURE.slice(0, 8)}...</span>
            </div>
          </div>
        </aside>

        <div className="chat-container">
          <div className="chat-header">
            <span className="chat-title">Strategy Terminal</span>
            <span className="chat-meta">{messages.length} messages</span>
          </div>

          <div className="messages">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><span>⚡</span></div>
                <div className="empty-title">VEXOR Ready</div>
                <div className="empty-desc">
                  Ask for trading strategies, market analysis, or portfolio recommendations. The agent responds in real-time.
                </div>
              </div>
            ) : (
              messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            )}
            
            {isLoading && (
              <div className="message agent">
                <div className="message-avatar">R</div>
                <div className="message-content">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className="input-area" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="Ask for a trading strategy..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="send-btn"
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="footer">
        <span>VEXOR · Rebel in Paradise 2026</span>
        <div className="footer-links">
          <a href="https://rebel.openbuild.xyz" className="footer-link" target="_blank" rel="noopener">
            Event
          </a>
          <a href="https://monad.xyz" className="footer-link" target="_blank" rel="noopener">
            Monad
          </a>
        </div>
      </footer>
    </div>
  )
}
