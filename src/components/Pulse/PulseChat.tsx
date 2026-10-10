import React, { useState } from 'react';
import { ArrowLeft, Send, Smile, Users, Paperclip, ThumbsUp, Heart, Rocket, Target, Flame } from 'lucide-react';
import { PulseChannel, ChatMessage } from '../../types';
import { NeedsInputCard } from './NeedsInputCard';
import { sounds } from '../../utils/audio';

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
  const [isTyping, setIsTyping] = useState(false);
  const [messageReactions, setMessageReactions] = useState<Record<string, Record<string, number>>>({});

  const handleAddReaction = (msgId: string, emoji: string) => {
    sounds.playPop();
    setMessageReactions(prev => {
      const currentMsg = prev[msgId] || {};
      return {
        ...prev,
        [msgId]: {
          ...currentMsg,
          [emoji]: (currentMsg[emoji] || 0) + 1
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sounds.playPop();
    const textToSend = inputText;
    setInputText('');
    onSendMessage(channel.id, textToSend);

    // Simulate typing indicator and manager auto-reply after 1.5 seconds
    if (channel.id === 'callcentre-team') {
      setTimeout(() => setIsTyping(true), 600);
      setTimeout(() => {
        setIsTyping(false);
        sounds.playCallConnected();
        onSendMessage(
          channel.id,
          `Sunita Rao: "Thanks for the update Arvind! Your focus on opening every call with the warm greeting is already lifting our floor QA score. Keep it up! 👏"`
        );
      }, 2200);
    } else if (channel.id === 'emi-push-nudges') {
      setTimeout(() => setIsTyping(true), 600);
      setTimeout(() => {
        setIsTyping(false);
        sounds.playSuccess();
        onSendMessage(
          channel.id,
          `AvaniBot: "✅ Logged! Mentioning the 12-month zero-interest plan increases cart conversion by +23.6pp. Good luck with the next callback!"`
        );
      }, 1800);
    }
  };

  const handleResolveNeedsInput = (response: string) => {
    sounds.playSuccess();
    onSendMessage(channel.id, `✅ <b>Plan Acknowledged:</b> ${response}`);
  };

  return (
    <div className="pulse-channel-chat">
      {/* Channel Header */}
      <div className="pulse-chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              sounds.playBeep(480, 0.04);
              onBack();
            }}
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

        {channel.messages.map(msg => {
          const reactions = messageReactions[msg.id] || {};
          return (
            <div
              key={msg.id}
              className={`chat-bubble-wrap ${msg.isMe ? 'mine' : ''}`}
              style={{ position: 'relative' }}
            >
              {/* Avatar for others */}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span className="chat-time" style={{ margin: 0 }}>{msg.time}</span>

                    {/* Reaction Bar */}
                    <div style={{ display: 'flex', gap: '3px', marginLeft: '10px' }}>
                      {['👍', '❤️', '🎯', '🔥'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => handleAddReaction(msg.id, emoji)}
                          style={{
                            fontSize: '11px',
                            background: 'rgba(0,0,0,0.04)',
                            padding: '1px 4px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          title={`React with ${emoji}`}
                        >
                          {emoji} {reactions[emoji] ? reactions[emoji] : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', fontStyle: 'italic', padding: '6px 10px' }}>
            <span className="live-dot" style={{ width: '6px', height: '6px', background: '#9333ea' }} />
            <span>Someone is typing a response...</span>
          </div>
        )}
      </div>

      {/* Interactive Quick Response Chips */}
      <div style={{ padding: '6px 16px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {[
          'On it Sunita! 👍',
          'Leading with greeting script 🎯',
          'Checking Hindi caller QA scores 📊',
          'Quoting ₹708/mo EMI on next 3 calls 💳'
        ].map(chip => (
          <button
            key={chip}
            onClick={() => setInputText(chip)}
            style={{
              fontSize: '11.5px',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: '#f1f5f9',
              color: '#334155',
              whiteSpace: 'nowrap',
              border: '1px solid #e2e8f0'
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Interactive Input Bar */}
      <form onSubmit={handleSubmit} className="chat-input-bar">
        <button
          type="button"
          style={{ color: '#94a3b8' }}
          title="Attach note or lead link"
          onClick={() => {
            sounds.playPop();
            setInputText(prev => prev + ' [Lead Attached: Mukunda MK] ');
          }}
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
          onClick={() => {
            sounds.playPop();
            setInputText(prev => prev + ' 👍');
          }}
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
