import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Pause, Play, CheckCircle2, Circle, Grid, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CallRecord } from '../../types';
import { sounds } from '../../utils/audio';

interface DialerModalProps {
  callerName: string;
  callerPhone?: string;
  onClose: () => void;
  onCallSaved: (newCall: CallRecord) => void;
}

export const DialerModal: React.FC<DialerModalProps> = ({
  callerName,
  callerPhone = '+91 98765 43210',
  onClose,
  onCallSaved
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [dialedInput, setDialedInput] = useState(callerPhone);
  const [sentimentPct, setSentimentPct] = useState(72);
  const [selectedOutcome, setSelectedOutcome] = useState('Quote Sent - Follow-up Scheduled');
  const [wrapupNotes, setWrapupNotes] = useState('Customer confirmed interest in 12-month 0% EMI. Sent quote on WhatsApp.');
  const [callRating, setCallRating] = useState(5);

  // SOP Checklist items
  const [sopChecked, setSopChecked] = useState<{ [key: string]: boolean }>({
    greet: true,
    need: true,
    smartgrid: false,
    emi: false,
    trial: false
  });

  // Simulated live transcript lines
  const [transcriptLines, setTranscriptLines] = useState<string[]>([
    `[00:02] Arvind: "Good afternoon ${callerName}! Arvind here from The Sleep Company Koramangala store."`,
    `[00:06] ${callerName}: "Hi Arvind, I was inquiring about the Ortho GRID mattress yesterday."`
  ]);

  // Timer effect
  useEffect(() => {
    if (isEnded || isOnHold) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
      // Small sentiment fluctuation
      setSentimentPct(prev => Math.min(96, Math.max(50, prev + (Math.random() > 0.4 ? 1 : -1))));
    }, 1000);
    return () => clearInterval(interval);
  }, [isEnded, isOnHold]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleKeyPress = (digit: string) => {
    sounds.playBeep(400 + parseInt(digit || '5') * 35, 0.08);
    setDialedInput(prev => prev + digit);
  };

  const handleInjectQuickReply = (topic: string, text: string) => {
    sounds.playPop();
    const timeStr = formatTimer(seconds);
    setTranscriptLines(prev => [...prev, `[${timeStr}] Arvind: "${text}"`]);

    if (topic === 'emi') {
      setSopChecked(s => ({ ...s, emi: true }));
      setSentimentPct(p => Math.min(95, p + 8));
    } else if (topic === 'trial') {
      setSopChecked(s => ({ ...s, trial: true }));
      setSentimentPct(p => Math.min(95, p + 6));
    } else if (topic === 'smartgrid') {
      setSopChecked(s => ({ ...s, smartgrid: true }));
      setSentimentPct(p => Math.min(95, p + 5));
    }
  };

  const handleEndCall = () => {
    sounds.playBeep(350, 0.15);
    setIsEnded(true);
  };

  const handleSaveWrapup = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newCall: CallRecord = {
      id: `call-live-${Date.now()}`,
      dir: 'out',
      name: callerName,
      phone: dialedInput,
      time: 'Just now',
      duration: formatTimer(seconds),
      sopScore: 94,
      outcome: selectedOutcome,
      category: 'Outbound Consultation'
    };

    onCallSaved(newCall);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Active Call Header */}
        <div
          style={{
            padding: '20px',
            background: isEnded
              ? 'linear-gradient(135deg, #1e293b, #334155)'
              : 'linear-gradient(135deg, #0a2e1a, #0f6e56)',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '11.5px', color: '#a8dcc4', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>
            {isEnded ? 'Call Completed · Disposition Wrapup' : 'Call in Progress · AI Assistant Active'}
          </div>

          <div style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 2px' }}>
            {callerName}
          </div>

          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
            {dialedInput}
          </div>

          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'monospace', margin: '8px 0' }}>
            {formatTimer(seconds)}
          </div>

          {/* Sentiment Bar */}
          {!isEnded && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#c9ede0' }}>Shopper Sentiment</span>
              <div style={{ width: '90px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                <div style={{ width: `${sentimentPct}%`, height: '100%', background: '#5dcaa5', transition: 'width 0.4s ease' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5dcaa5' }}>
                {sentimentPct >= 80 ? '🔥 Very Receptive' : sentimentPct >= 65 ? '😊 Positive' : 'Neutral'}
              </span>
            </div>
          )}

          {/* Call Controls */}
          {!isEnded && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '14px' }}>
              <button
                onClick={() => {
                  sounds.playBeep(450, 0.05);
                  setIsMuted(!isMuted);
                }}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button
                onClick={() => {
                  sounds.playBeep(450, 0.05);
                  setIsOnHold(!isOnHold);
                }}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: isOnHold ? '#f59e0b' : 'rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isOnHold ? 'Resume Call' : 'Hold Call'}
              >
                {isOnHold ? <Play size={18} /> : <Pause size={18} />}
              </button>

              <button
                onClick={() => setShowKeypad(!showKeypad)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: showKeypad ? '#6366f1' : 'rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Dialpad Keypad"
              >
                <Grid size={18} />
              </button>

              <button
                onClick={handleEndCall}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#dc2626',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="End Call"
              >
                <PhoneOff size={18} />
              </button>
            </div>
          )}

          {/* Interactive DTMF Dialpad Sheet */}
          {showKeypad && !isEnded && (
            <div
              style={{
                marginTop: '14px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                padding: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                maxWidth: '240px',
                margin: '14px auto 0'
              }}
            >
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isEnded ? (
            <>
              {/* Interactive AI Quick Replies */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>
                  ⚡ One-Click AI Talking Points (Inject into call)
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '11.5px', padding: '5px 10px', background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
                    onClick={() => handleInjectQuickReply('emi', 'We have 12-month zero-cost EMI on this, bringing it down to just ₹708 a month!')}
                  >
                    💳 Pitch 0% EMI (₹708/mo)
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '11.5px', padding: '5px 10px', background: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }}
                    onClick={() => handleInjectQuickReply('trial', 'You can sleep on it for 100 nights at home. If you do not love it, we refund 100% with free pickup.')}
                  >
                    🛡️ Pitch 100-Night Trial
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '11.5px', padding: '5px 10px', background: '#faf5ff', color: '#7e22ce', borderColor: '#e9d5ff' }}
                    onClick={() => handleInjectQuickReply('smartgrid', 'Our Japanese patented SmartGRID dynamically adapts to your hips and shoulders for zero back pain.')}
                  >
                    ✨ Differentiate SmartGRID
                  </button>
                </div>
              </div>

              {/* Live SOP Checklist */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Live SOP Coaching Checklist (Tap to toggle)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => setSopChecked(s => ({ ...s, greet: !s.greet }))}
                  >
                    {sopChecked.greet ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Brand greeting in first 10s</span>
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => setSopChecked(s => ({ ...s, need: !s.need }))}
                  >
                    {sopChecked.need ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Discover sleep posture / back pain</span>
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => setSopChecked(s => ({ ...s, smartgrid: !s.smartgrid }))}
                  >
                    {sopChecked.smartgrid ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Differentiate patented SmartGRID</span>
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => setSopChecked(s => ({ ...s, emi: !s.emi }))}
                  >
                    {sopChecked.emi ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Quote 12-mo 0% EMI (₹708/mo)</span>
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => setSopChecked(s => ({ ...s, trial: !s.trial }))}
                  >
                    {sopChecked.trial ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Anchor 100-night trial guarantee</span>
                  </div>
                </div>
              </div>

              {/* Real-time Simulated Transcript */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Live Voice Transcript Feed
                </div>
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    maxHeight: '140px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '12px',
                    color: '#334155'
                  }}
                >
                  {transcriptLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Wrapup Form */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Select Call Disposition Outcome
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                  {[
                    'Quote Sent - Follow-up Scheduled',
                    'Order Placed - WhatsApp Link',
                    'Store Visit Booked',
                    'Callback Requested Later',
                    'Not Interested'
                  ].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className="btn-secondary"
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        justifyContent: 'flex-start',
                        borderColor: selectedOutcome === opt ? '#0f6e56' : '#e2e8f0',
                        background: selectedOutcome === opt ? '#e1f5ee' : '#ffffff',
                        color: selectedOutcome === opt ? '#0f6e56' : '#1e293b',
                        fontWeight: selectedOutcome === opt ? 700 : 500
                      }}
                      onClick={() => {
                        sounds.playBeep(520, 0.04);
                        setSelectedOutcome(opt);
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Rating */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Rate Call Quality & Shopper Intent
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        sounds.playBeep(480 + star * 30, 0.05);
                        setCallRating(star);
                      }}
                      style={{ color: star <= callRating ? '#f59e0b' : '#cbd5e1' }}
                    >
                      <Star size={20} fill={star <= callRating ? '#f59e0b' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Wrapup Consultation Notes
                </label>
                <textarea
                  className="chat-input"
                  style={{ width: '100%', height: '70px', borderRadius: '8px' }}
                  value={wrapupNotes}
                  onChange={e => setWrapupNotes(e.target.value)}
                  placeholder="Record summary details for store team..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="btn-secondary" onClick={onClose}>
                  Discard
                </button>
                <button className="btn-primary" onClick={handleSaveWrapup}>
                  Save & Log Call
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
