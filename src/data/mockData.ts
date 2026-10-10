import { Lead, WaitingCaller, CallRecord, CalendarEvent, PulseChannel, AgentCoach, NotificationItem, PractiseSOP } from '../types';

export const LEADS_DATA: Lead[] = [
  {
    id: 'lead-1',
    name: 'Mukunda',
    initials: 'MK',
    avatarBg: '#e1f5ee',
    avatarColor: '#0f6e56',
    phone: '+91 98765 43210',
    interest: 'Interested: Ortho GRID · ₹8,490',
    product: 'Ortho GRID Mattress',
    crossSell: 'Mattress Protector · ₹1,999',
    emi: 'Asked about EMI — quote the 12-month zero-interest plan',
    attractivenessScore: 90,
    expectedValue: 8490,
    badge: '2h left',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    statusLabel: 'Open',
    statusColor: '#1d9e75',
    quoteOn: true,
    icp: 87,
    icpColor: '#1d9e75',
    intentScore: 91,
    subscores: [
      { label: 'Budget Fit', pct: 87, color: '#1d9e75' },
      { label: 'Need Match', pct: 72, color: '#c8860a' },
      { label: 'Decision Stage', pct: 60, color: '#7c3aed' }
    ],
    notes: [
      'Asked about EMI on the Ortho GRID — lead with the 12-month zero-interest plan.',
      'Price-sensitive — compared us with a competitor, so mention the 100-night trial to reduce risk.',
      'Prefers evening calls, after 6pm.'
    ],
    problemBuckets: [
      { cat: 'Financing Related', text: 'Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker' },
      { cat: 'Quotation Demanded', text: 'Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number' },
      { cat: 'Warranty Related', text: "Hasn't raised this yet — worth proactively mentioning the 100-night trial to reduce perceived risk" }
    ],
    journey: [
      { date: '18 May', channel: 'Meta Ad', icon: '📢', color: '#1877f2', text: 'Clicked our "0% EMI on Ortho GRID" retargeting ad — first touch' },
      { date: '20 May', channel: 'AI Agent', icon: '💬', color: '#7c3aed', text: 'WhatsApp opt-in — shared preferred size' },
      { date: '22 May', channel: 'Voice AI', icon: '📞', color: '#7c3aed', text: '4m 12s qualifying call — asked if pillows come bundled' },
      { date: '24 May', channel: 'WhatsApp', icon: '💬', color: '#25D366', text: 'Asked for a quote with pillows bundled in' }
    ]
  },
  {
    id: 'lead-2',
    name: 'Kavitha R.',
    initials: 'KR',
    avatarBg: '#faeeda',
    avatarColor: '#854f0b',
    phone: '+91 97412 88319',
    interest: 'Interested: Elegance Luxe · ₹24,990',
    product: 'Elegance Luxe King Mattress',
    crossSell: 'Ergonomic Contour Pillow · ₹2,490',
    emi: 'Approved for 6-month HDFC zero-cost EMI',
    attractivenessScore: 84,
    expectedValue: 24990,
    badge: 'Hot lead',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    statusLabel: 'Follow-up',
    statusColor: '#d97706',
    quoteOn: true,
    icp: 82,
    icpColor: '#1d9e75',
    intentScore: 86,
    subscores: [
      { label: 'Budget Fit', pct: 90, color: '#1d9e75' },
      { label: 'Need Match', pct: 85, color: '#1d9e75' },
      { label: 'Decision Stage', pct: 75, color: '#7c3aed' }
    ],
    notes: [
      'Suffering from lower back pain, was recommended orthopedic firm mattress by doctor.',
      'Husband works in tech, looking for delivery before upcoming anniversary on the 15th.',
      'Ready to close if express 48hr delivery is guaranteed.'
    ],
    problemBuckets: [
      { cat: 'Product Related', text: 'Specific firmness requirements due to lower back pain; validated for SmartGRID firm layer' },
      { cat: 'Quotation Demanded', text: 'Offered festive ₹2,000 store discount coupon; valid till Sunday' }
    ],
    journey: [
      { date: '2 days ago', channel: 'Store Walk-in', icon: '🏬', color: '#0f766e', text: 'Visited Koramangala store, tried SmartGRID Elegance for 15 mins' },
      { date: 'Yesterday', channel: 'Outbound Call', icon: '📞', color: '#2563eb', text: '2m 05s touchpoint — requested written quote on WhatsApp' }
    ]
  },
  {
    id: 'lead-3',
    name: 'Priya Iyer',
    initials: 'PI',
    avatarBg: '#fce7f3',
    avatarColor: '#9d174d',
    phone: '+91 99001 24567',
    interest: 'Interested: Dual Comfort Queen · ₹12,490',
    product: 'Dual Comfort Mattress',
    crossSell: 'Waterproof Protector Cover · ₹1,499',
    emi: 'Interested in Bajaj Finserv No-Cost EMI',
    attractivenessScore: 74,
    expectedValue: 12490,
    badge: 'Waiting in queue',
    badgeBg: '#fee2e2',
    badgeColor: '#b91c1c',
    statusLabel: 'Pending',
    statusColor: '#e11d48',
    quoteOn: false,
    icp: 75,
    icpColor: '#c8860a',
    intentScore: 70,
    subscores: [
      { label: 'Budget Fit', pct: 78, color: '#1d9e75' },
      { label: 'Need Match', pct: 68, color: '#c8860a' },
      { label: 'Decision Stage', pct: 55, color: '#e24b4a' }
    ],
    notes: [
      'Uncertain whether to choose Dual Comfort or Ortho GRID.',
      'Expressed concern regarding heat retention during Bangalore summer.'
    ],
    problemBuckets: [
      { cat: 'Product Related', text: 'Needs clarification on breathability and cooling grid technology' },
      { cat: 'Warranty Related', text: 'Asked about 10-year warranty claim process in case of sagging' }
    ],
    journey: [
      { date: '3 days ago', channel: 'Website', icon: '🌐', color: '#3b82f6', text: 'Browsed product comparison page for 8 mins' },
      { date: 'Today', channel: 'Inbound', icon: '📞', color: '#dc2626', text: 'Waiting in queue for 4m 20s' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Suresh Nair',
    initials: 'SN',
    avatarBg: '#e0e7ff',
    avatarColor: '#3730a3',
    phone: '+91 98860 11982',
    interest: 'Interested: Ortho Pro Firm · ₹16,990',
    product: 'Ortho Pro Firm Mattress',
    crossSell: 'Bamboo Memory Foam Pillow set · ₹2,990',
    emi: 'Willing to pay via UPI for upfront cash discount',
    attractivenessScore: 62,
    expectedValue: 16990,
    badge: 'Warm lead',
    badgeBg: '#e0e7ff',
    badgeColor: '#3730a3',
    statusLabel: 'In Queue',
    statusColor: '#4f46e5',
    quoteOn: true,
    icp: 64,
    icpColor: '#c8860a',
    intentScore: 58,
    subscores: [
      { label: 'Budget Fit', pct: 65, color: '#c8860a' },
      { label: 'Need Match', pct: 60, color: '#c8860a' },
      { label: 'Decision Stage', pct: 50, color: '#e24b4a' }
    ],
    notes: [
      'Looking to upgrade old spring mattress.',
      'Wants to confirm exact room delivery and old mattress removal service.'
    ],
    problemBuckets: [
      { cat: 'In-Store Experience Needed', text: 'Lives 2km from Indiranagar store — suggested visiting for live comfort test' }
    ],
    journey: [
      { date: 'Yesterday', channel: 'Google Search', icon: '🔍', color: '#ea4335', text: 'Searched "best mattress for spine alignment"' },
      { date: 'Today', channel: 'Inbound Call', icon: '📞', color: '#4f46e5', text: 'Calling for delivery and installation policy' }
    ]
  },
  {
    id: 'lead-5',
    name: 'Rohan Mehta',
    initials: 'RM',
    avatarBg: '#fef3c7',
    avatarColor: '#92400e',
    phone: '+91 98110 54321',
    interest: 'Interested: SmartGRID Hybrid · ₹32,000',
    product: 'SmartGRID Hybrid Luxe',
    crossSell: 'All-Weather Comforter · ₹3,490',
    emi: 'Card EMI enquiry',
    attractivenessScore: 48,
    expectedValue: 32000,
    badge: 'Follow-up',
    badgeBg: '#fef3c7',
    badgeColor: '#92400e',
    statusLabel: 'Cold',
    statusColor: '#6b7280',
    quoteOn: false,
    icp: 50,
    icpColor: '#e24b4a',
    intentScore: 45,
    subscores: [
      { label: 'Budget Fit', pct: 55, color: '#c8860a' },
      { label: 'Need Match', pct: 45, color: '#e24b4a' },
      { label: 'Decision Stage', pct: 40, color: '#e24b4a' }
    ],
    notes: [
      'High budget, comparing with international brands (Tempur, King Koil).',
      'Requires in-depth technical breakdown of Japanese patented polymer.'
    ],
    problemBuckets: [
      { cat: 'Product Related', text: 'Demanded technical whitepaper on pressure relief testing' }
    ],
    journey: [
      { date: 'Last week', channel: 'Instagram', icon: '📸', color: '#d946ef', text: 'Saved video on patent comparison' }
    ]
  }
];

export const WAITING_CALLERS: WaitingCaller[] = [
  {
    id: 'wait-1',
    name: 'Priya Iyer',
    wait: '4m 20s',
    waitLevel: 'hi',
    intent: 'Likely billing dispute — flagged before',
    phone: '+91 99001 24567'
  },
  {
    id: 'wait-2',
    name: 'Suresh Nair',
    wait: '1m 50s',
    waitLevel: 'mid',
    intent: 'Plan upgrade enquiry & delivery logistics',
    phone: '+91 98860 11982'
  }
];

export const CALL_RECORDS: CallRecord[] = [
  {
    id: 'call-1',
    dir: 'in',
    name: 'Mukunda R.',
    phone: '+91 98765 43210',
    time: '10:42 AM',
    duration: '4m 12s',
    sopScore: 92,
    leadValue: 8490,
    outcome: 'Quote Sent - Follow-up Scheduled',
    category: 'Product & EMI'
  },
  {
    id: 'call-2',
    dir: 'out',
    name: 'Kavitha R.',
    phone: '+91 97412 88319',
    time: 'Yesterday',
    duration: '2m 05s',
    sopScore: 88,
    leadValue: 24990,
    outcome: 'Decision Pending',
    category: 'Store Follow-up'
  },
  {
    id: 'call-3',
    dir: 'missed',
    name: 'Ritu S.',
    phone: '+91 98220 44910',
    time: 'Today 11:20 AM',
    duration: '—',
    leadValue: 18490,
    category: 'High Value Lead'
  },
  {
    id: 'call-4',
    dir: 'missed',
    name: 'Amit Patel',
    phone: '+91 99401 77312',
    time: 'Today 09:45 AM',
    duration: '—',
    leadValue: 8490,
    category: 'Ortho Inbound'
  },
  {
    id: 'call-5',
    dir: 'in',
    name: 'Sneha D.',
    phone: '+91 98200 91823',
    time: 'Yesterday',
    duration: '5m 30s',
    sopScore: 78,
    leadValue: 14500,
    outcome: 'Callback Requested',
    category: 'Warranty & Exchange'
  },
  {
    id: 'call-6',
    dir: 'missed',
    name: 'Unknown Caller',
    phone: '+91 98000 12345',
    time: 'Yesterday',
    duration: '—',
    leadValue: 4500,
    category: 'Unidentified'
  }
];

export const CALENDAR_INVITES: CalendarEvent[] = [
  {
    id: 'cal-1',
    day: 23,
    month: 10,
    year: 2026,
    time: '11:00 AM',
    title: 'SOP coaching session',
    meta: 'With Sunita Rao (Manager) · via #callcentre-team',
    type: 'coaching'
  },
  {
    id: 'cal-2',
    day: 26,
    month: 10,
    year: 2026,
    time: '2:30 PM',
    title: 'Warranty pitch refresher',
    meta: 'With L&D team · flagged from your last 3 calls',
    type: 'training'
  },
  {
    id: 'cal-3',
    day: 28,
    month: 10,
    year: 2026,
    time: '10:00 AM',
    title: 'Weekly team huddle',
    meta: 'With Koramangala store team & ASM',
    type: 'huddle'
  },
  {
    id: 'cal-4',
    day: 14,
    month: 10,
    year: 2026,
    time: '03:15 PM',
    title: 'Product demo: SmartGRID Luxe',
    meta: 'Virtual briefing with Sleep Lab specialists',
    type: 'training'
  },
  {
    id: 'cal-5',
    day: 18,
    month: 10,
    year: 2026,
    time: '12:00 PM',
    title: 'Store visit & handover review',
    meta: 'Walk-through at Koramangala flagship branch',
    type: 'customer'
  }
];

export const PULSE_CHANNELS: PulseChannel[] = [
  {
    id: 'callcentre-team',
    title: '#callcentre-team',
    description: 'Call centre agents & managers shift sync',
    memberCount: 14,
    dateLabel: 'Today · Call Centre Team',
    unread: 1,
    icon: '👥',
    pinnedTask: {
      id: 'task-qa-greet',
      question: 'Sunita Rao: "Greeting-in-first-10s QA score is 71% this week (target: 85%). Commit to greeting SOP?"',
      context: 'Issue flagged across yesterday’s 42 calls. Requires agent acknowledgment.',
      options: ['Accept plan — will lead with greeting script', 'Request tweak — need clarification on Hindi callers'],
      resolved: false
    },
    messages: [
      {
        id: 'msg-1',
        who: 'Sunita Rao',
        init: 'SR',
        bg: '#faeeda',
        color: '#854f0b',
        text: '👥 <b>STAKEHOLDERS:</b> <b style="color:#854f0b">@You (Arvind R.)</b>, whole call centre shift',
        time: '2:05pm'
      },
      {
        id: 'msg-2',
        who: 'Sunita Rao',
        init: 'SR',
        bg: '#faeeda',
        color: '#854f0b',
        text: '⚠️ <b>ISSUE DEFINITION:</b> Greeting-in-first-10s QA score is at 71% this week, below our 85% target.',
        time: '2:05pm'
      },
      {
        id: 'msg-3',
        who: 'Sunita Rao',
        init: 'SR',
        bg: '#faeeda',
        color: '#854f0b',
        text: '💡 <b>SUGGESTED RESOLUTION:</b> Let\'s push that up 🚀 — open every call with the standard greeting script. I\'ll check back Friday.',
        time: '2:05pm'
      },
      {
        id: 'msg-4',
        who: 'You',
        init: 'AR',
        text: 'On it Sunita! Will make sure I open every call with the warm brand greeting and shopper name verification. 👍',
        time: '2:10pm',
        isMe: true
      },
      {
        id: 'msg-5',
        who: 'Sunita Rao',
        init: 'SR',
        bg: '#faeeda',
        color: '#854f0b',
        text: 'Great attitude Arvind! 🎯 Keep up the momentum on those high-value missed calls today.',
        time: '2:14pm'
      }
    ]
  },
  {
    id: 'emi-push-nudges',
    title: '#emi-push-nudges',
    description: 'AI vertical coach on financing conversion',
    memberCount: 8,
    dateLabel: 'Today · Nudges Agent',
    unread: 2,
    icon: '💳',
    pinnedTask: {
      id: 'task-emi-nudge',
      question: 'AvaniBot: "EMI was mentioned in only 4 of 11 calls today (36%). Pitch 12-month zero-cost EMI on next 3 calls?"',
      context: 'Customers who hear EMI options close at +23.6pp higher conversion rate.',
      options: ['Commit to pitching EMI', 'Customer already paying cash'],
      resolved: false
    },
    messages: [
      {
        id: 'emi-1',
        who: 'AvaniBot',
        init: 'AB',
        bg: '#eef2ff',
        color: '#4338ca',
        text: '💳 <b>Nudge:</b> EMI mentioned in only 4/11 calls this shift (36%) — below target of 70%. When pitching Ortho GRID (₹8,490), break it down to just <b>₹708/month</b>.',
        time: '1:15pm'
      },
      {
        id: 'emi-2',
        who: 'You',
        init: 'AR',
        text: 'Got it, quoting ₹708/mo really lowers the psychological barrier. Will lead with this for Mukunda.',
        time: '1:20pm',
        isMe: true
      }
    ]
  },
  {
    id: 'product-updates',
    title: '#product-updates',
    description: 'Catalog, pricing & inventory releases',
    memberCount: 22,
    dateLabel: 'Yesterday · Catalog Ops',
    unread: 0,
    icon: '📢',
    messages: [
      {
        id: 'prod-1',
        who: 'Catalog Bot',
        init: 'CB',
        bg: '#f1f5f9',
        color: '#334155',
        text: '📢 <b>Update:</b> SmartGRID Hybrid king size back in stock in Bangalore warehouse. Delivery SLA is now 24-48 hours.',
        time: 'Yesterday 4:00pm'
      }
    ]
  },
  {
    id: 'deals-and-discounts',
    title: '#deals-and-discounts',
    description: 'Active store vouchers & seasonal promotions',
    memberCount: 18,
    dateLabel: 'This Week · Sales Ops',
    unread: 0,
    icon: '🏷️',
    messages: [
      {
        id: 'deal-1',
        who: 'Marketing Ops',
        init: 'MO',
        bg: '#fef3c7',
        color: '#92400e',
        text: '🏷️ Use coupon code <b>FESTIVE2K</b> for instant ₹2,000 off on all mattresses above ₹20,000. Stackable with 0% EMI!',
        time: 'Mon 10:00am'
      }
    ]
  }
];

export const AGENT_COACHES: AgentCoach[] = [
  {
    id: 'skillimprovement',
    title: 'Skill Improvement Coach',
    sub: 'Practice & feedback agent',
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#5b21b6,#7c3aed)',
    desc: 'Pick a skill you want to get sharper at — warranty pitch, objection handling, EMI close — and get instant roleplay feedback.',
    tip: 'Lead with empathy, acknowledge their concern before bridging to the SmartGRID solution.',
    example: '"I completely understand why you are comparing, Mukunda. That is why we offer a 100-night risk-free trial..."'
  },
  {
    id: 'pitchcoach',
    title: 'Pitch Coach',
    sub: 'Real-time script guidance',
    icon: '🗣️',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    desc: 'Audio simulation for the 30-second elevator hook. Highlights filler words and clarity.',
    tip: 'Keep your opening under 15 seconds: Name + Store + Reason for call.',
    example: '"Good afternoon Mukunda! Arvind here from The Sleep Company Koramangala store regarding your enquiry."'
  },
  {
    id: 'asmagent',
    title: 'ASM Agent',
    sub: 'Floor & Area Sales alignment',
    icon: '👔',
    gradient: 'linear-gradient(135deg,#0f766e,#14b8a6)',
    desc: 'Coordinates store walk-in handovers and offline appointment booking.',
    tip: 'Always ask if they prefer an in-store demo before sending a direct payment link.'
  },
  {
    id: 'telecaller',
    title: 'Tele-caller Assistant',
    sub: 'Speed-to-lead queue optimizer',
    icon: '⚡',
    gradient: 'linear-gradient(135deg,#b45309,#f59e0b)',
    desc: 'Calculates the highest ROI lead to call next based on missed call recency and cart value.'
  }
];

export const PRACTISE_SOPS: PractiseSOP[] = [
  {
    id: 'greeting',
    name: 'Greeting in first 10s',
    icon: '👋',
    tip: 'State your name clearly, name the customer, and reference their exact store or ad inquiry within 10 seconds.',
    example: '"Good afternoon Mukunda! Arvind here from The Sleep Company Koramangala store. I saw you were checking out the Ortho GRID mattress — how can I help you pick the right firmness today?"',
    isFocus: true
  },
  {
    id: 'emi',
    name: '0% EMI objection handling',
    icon: '💳',
    tip: 'Break down large ticket amounts into daily/monthly equivalents so it sounds effortless.',
    example: '"The Ortho GRID is ₹8,490 total, but with our 12-month zero-interest plan, that comes out to just ₹708 a month — less than the price of a coffee every week!"',
    isFocus: true
  },
  {
    id: 'warranty',
    name: 'Warranty & 100-night trial',
    icon: '🛡️',
    tip: 'Anchor on the 100-night trial to completely eliminate risk for hesitant buyers.',
    example: '"You do not have to decide right now! You get 100 nights at home to sleep on it. If your back does not feel noticeably better, we pick it up for a 100% full refund."'
  },
  {
    id: 'closing',
    name: 'Closing commitment',
    icon: '🤝',
    tip: 'Offer a concrete next step: reservation holding or instant WhatsApp payment link.',
    example: '"Shall I reserve the Koramangala warehouse unit for you and send the zero-cost EMI link to your WhatsApp right now?"'
  }
];

export const NOTIFICATIONS_FEED: NotificationItem[] = [
  {
    id: 'notif-1',
    icon: '☎️',
    color: '#854f0b',
    title: 'Sunita Rao is checking greeting-QA scores Friday — reply in #callcentre-team',
    time: '2:05pm',
    cta: 'Open #callcentre-team',
    needsAction: true,
    channelId: 'callcentre-team'
  },
  {
    id: 'notif-2',
    icon: '💳',
    color: '#4338ca',
    title: 'EMI pitch nudge: Mention 12-month plan on your next 3 calls',
    time: '1:15pm',
    cta: 'View #emi-push-nudges',
    needsAction: true,
    channelId: 'emi-push-nudges'
  },
  {
    id: 'notif-3',
    icon: '🔥',
    color: '#0f6e56',
    title: 'High-value missed call: Ritu S. (₹18,490 at stake) needs callback',
    time: '11:20am',
    cta: 'Call back now'
  }
];

export const STAT_DETAIL_DATA = {
  convos: {
    icon: '💬',
    title: 'Conversations',
    big: '5',
    sub: "Goal 8/day · 3 more to hit today's target",
    extra: 'Today\'s conversations are 62m total, averaging 12.4m each — on track for daily quota.'
  },
  sellTime: {
    icon: '⏱️',
    title: 'Conversation Time',
    big: '47m',
    sub: 'avg 9.4m per conversation',
    extra: 'Above target threshold of 8m per consultation.'
  },
  ogScore: {
    icon: '🏆',
    title: 'OG Score™',
    big: '76',
    sub: 'Top 15% across Bangalore cluster',
    extra: '▲13 pts up from last week due to improved greeting QA and EMI objection handling.'
  }
};
