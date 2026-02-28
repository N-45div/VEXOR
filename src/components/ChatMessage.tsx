interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

function formatMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="md-h4">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="md-li">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="md-li-num">$2</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="md-p">')
    .replace(/\n/g, '<br/>')
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formattedContent = message.role === 'agent' 
    ? formatMarkdown(message.content)
    : message.content

  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">
        {message.role === 'agent' ? 'V' : 'U'}
      </div>
      <div className="message-content">
        {message.role === 'agent' ? (
          <div 
            className="md-content"
            dangerouslySetInnerHTML={{ __html: formattedContent }} 
          />
        ) : (
          <div>{message.content}</div>
        )}
        <div className="message-timestamp">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  )
}
