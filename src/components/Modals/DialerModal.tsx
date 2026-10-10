import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Pause, Play, CheckCircle2, Circle, Award, FileText, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CallRecord } from '../../types';

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
  const [sentimentPct, setSentimentPct] = useState(68);
  const [selectedOutcome, setSelectedOutcome] = useState('Quote Sent - Follow-up Scheduled');
  const [wrapupNotes, setWrapupNotes] = useState('Customer confirmed interest in 12-month 0% EMI. Sent quote on WhatsApp.');

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
    `[00:06] ${callerName}: "Hi Arvind, I had enquired about the Ortho GRID mattress yesterday."`
  ]);

  // Timer effect
  useEffect(() => {
    if (isEnded || isOnHold) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
      // Small sentiment fluctuation
      setSentimentPct(prev => Math.min(95, Math.max(50, prev + (Math.random() > 0.4 ? 2 : -2))));
    }, 1000);
    return () => clearInterval(interval);
  }, [isEnded, isOnHold]);

  // Transcript progression effect
  useEffect(() => {
    if (isEnded) return;
    if (seconds === 5) {
      setTranscriptLines(prev => [
        ...prev,
        `[00:05] Arvind: "Yes, I saw you were looking for spinal alignment and zero motion transfer. Are you looking for medium firm or ultra firm?"`
      ]);
      setSopChecked(s => ({ ...s, need: true }));
    } else if (seconds === 10) {
      setTranscriptLines(prev => [
        ...prev,
        `[00:10] ${callerName}: "Medium firm, my doctor recommended good lumbar support."`
      ]);
    } else if (seconds === 15) {
      setTranscriptLines(prev => [
        ...prev,
        `[00:15] Arvind: "The Ortho GRID has our patented hyper-elastic polymer grid that flexes under your hips while keeping your spine straight."`
      ]);
      setSopChecked(s => ({ ...s, smartgrid: true }));
    } else if (seconds === 22) {
      setTranscriptLines(prev => [
        ...prev,
        `[00:22] Arvind: "With our 0% EMI plan, it is just ₹708 a month for 12 months with no extra charges."`
      ]);
      setSopChecked(s => ({ ...s, emi: true }));
    } else if (seconds === 30) {
      setTranscriptLines(prev => [
        ...prev,
        `[00:30] Arvind: "Plus, you get a 100-night trial at home with 100% full money-back guarantee."`
      ]);
      setSopChecked(s => ({ ...s, trial: true }));
    }
  }, [seconds, isEnded, callerName]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleEndCall = () => {
    setIsEnded(true);
  };

  const handleSaveWrapup = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newCall: CallRecord = {
      id: `call-live-${Date.now()}`,
      dir: 'out',
      name: callerName,
      phone: callerPhone,
      time: 'Just now',
      duration: formatTimer(seconds),
      sopScore: 92,
      outcome: selectedOutcome,
      category: 'Outbound Consultation'
    };

    onCallSaved(newCall);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
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
          <div style={{ fontSize: '12px', color: '#a8dcc4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {isEnded ? 'Call Completed · Wrapup' : 'Call in Progress · Live Voice AI'}
          </div>

          <div style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 2px' }}>
            {callerName}
          </div>

          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
            {callerPhone}
          </div>

          <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'monospace', margin: '8px 0' }}>
            {formatTimer(seconds)}
          </div>

          {/* Sentiment Bar */}
          {!isEnded && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#c9ede0' }}>Sentiment</span>
              <div style={{ width: '90px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                <div style={{ width: `${sentimentPct}%`, height: '100%', background: '#5dcaa5', transition: 'width 0.4s ease' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5dcaa5' }}>
                {sentimentPct >= 70 ? 'Positive' : 'Engaged'}
              </span>
            </div>
          )}

          {/* Call Action Buttons */}
          {!isEnded && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '14px' }}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button
                onClick={() => setIsOnHold(!isOnHold)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isOnHold ? '#f59e0b' : 'rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isOnHold ? 'Resume Call' : 'Hold Call'}
              >
                {isOnHold ? <Play size={20} /> : <Pause size={20} />}
              </button>

              <button
                onClick={handleEndCall}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#dc2626',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="End Call"
              >
                <PhoneOff size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isEnded ? (
            <>
              {/* Live SOP Checklist */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Live SOP Coaching Checklist
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    {sopChecked.greet ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Brand greeting in first 10s</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    {sopChecked.need ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Discover sleep posture / back pain</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    {sopChecked.smartgrid ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Differentiate patented SmartGRID</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    {sopChecked.emi ? <CheckCircle2 size={16} color="#16a34a" /> : <Circle size={16} color="#94a3b8" />}
                    <span>Quote 12-mo 0% EMI (₹708/mo)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
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
                      onClick={() => setSelectedOutcome(opt)}
                    >
                      {opt}
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
