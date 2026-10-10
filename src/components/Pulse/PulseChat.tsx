import React, { useState } from 'react';
import { ArrowLeft, Send, Smile, Users, Paperclip } from 'lucide-react';
import { PulseChannel, ChatMessage } from '../../types';
import { NeedsInputCard } from './NeedsInputCard';

interface PulseChatProps {
  channel: PulseChannel;
  onBack: () => void;
  onSendMessage: (channelId: string, text: string) => void;
}

export const PulseChat: React.FC<PulseChatProps> = ({
  channel,
  onBack,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(channel.id, inputText);
    setInputText('');
  };

  const handleResolveNeedsInput = (response: string) => {
    onSendMessage(channel.id, `✅ <b>Plan Acknowledged:</b> ${response}`);
  };

  return (
    <div className="pulse-channel-chat">
      {/* Channel Header */}
      <div className="pulse-chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{ padding: '6px 8px', borderRadius: '50%' }}
            title="Back to Channels"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
                {channel.title}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <Users size={12} />
                {channel.memberCount} members
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>
              {channel.description}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned "Needs your input" card */}
      {channel.pinnedTask && (
        <NeedsInputCard
          task={channel.pinnedTask}
          onResolve={handleResolveNeedsInput}
        />
      )}

      {/* Message List */}
      <div className="chat-message-list">
        <div style={{ textAlign: 'center', margin: '6px 0 12px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#64748b',
              background: '#e2e8f0',
              padding: '3px 10px',
              borderRadius: '9999px'
            }}
          >
            {channel.dateLabel}
          </span>
        </div>

        {channel.messages.map(msg => (
          <div
            key={msg.id}
            className={`chat-bubble-wrap ${msg.isMe ? 'mine' : ''}`}
          >
            {/* Avatar for other people */}
            {!msg.isMe && (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: msg.bg || '#faeeda',
                  color: msg.color || '#854f0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '12px',
                  flexShrink: 0
                }}
              >
                {msg.init}
              </div>
            )}

            <div>
              {!msg.isMe && (
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '2px' }}>
                  {msg.who}
                </div>
              )}

              <div className="chat-bubble">
                <div
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                  style={{ wordBreak: 'break-word' }}
                />
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Input Bar */}
      <form onSubmit={handleSubmit} className="chat-input-bar">
        <button
          type="button"
          style={{ color: '#94a3b8' }}
          title="Attach note or lead link"
          onClick={() => setInputText(prev => prev + ' [Lead Attached: Mukunda MK] ')}
        >
          <Paperclip size={18} />
        </button>

        <input
          type="text"
          className="chat-input"
          placeholder={`Message ${channel.title}...`}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />

        <button
          type="button"
          style={{ color: '#94a3b8' }}
          title="Quick Emoji"
          onClick={() => setInputText(prev => prev + ' 👍')}
        >
          <Smile size={18} />
        </button>

        <button
          type="submit"
          className="btn-primary"
          style={{ padding: '8px 14px' }}
          title="Send Message"
        >
          <Send size={14} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
