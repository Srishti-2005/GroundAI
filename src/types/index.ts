export interface LeadSubscore {
  label: string;
  pct: number;
  color: string;
}

export interface ProblemBucket {
  cat: string;
  text: string;
}

export interface JourneyEvent {
  date: string;
  channel: string;
  icon: string;
  color: string;
  text: string;
}

export interface Lead {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  phone: string;
  interest: string;
  product: string;
  crossSell: string;
  emi: string;
  attractivenessScore: number;
  expectedValue: number;
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  statusLabel: string;
  statusColor: string;
  quoteOn?: boolean;
  icp: number;
  icpColor: string;
  intentScore: number;
  subscores: LeadSubscore[];
  slaNote?: string | null;
  notes: string[];
  problemBuckets: ProblemBucket[];
  journey: JourneyEvent[];
  actions?: string;
}

export interface WaitingCaller {
  id: string;
  name: string;
  wait: string;
  waitLevel: 'hi' | 'mid' | 'low';
  intent: string;
  phone?: string;
}

export interface CallRecord {
  id: string;
  dir: 'in' | 'out' | 'missed';
  name: string;
  phone?: string;
  time: string;
  duration: string;
  sopScore?: number;
  leadValue?: number;
  outcome?: string;
  category?: string;
}

export interface CalendarEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  time: string;
  title: string;
  meta: string;
  type?: 'coaching' | 'huddle' | 'training' | 'customer';
}

export interface ChatMessage {
  id: string;
  who: string;
  init: string;
  bg?: string;
  color?: string;
  text: string;
  time: string;
  isMe?: boolean;
  reactions?: string[];
}

export interface NeedsInputTask {
  id: string;
  question: string;
  context?: string;
  options: string[];
  resolved?: boolean;
}

export interface PulseChannel {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  dateLabel: string;
  pinnedTask?: NeedsInputTask;
  messages: ChatMessage[];
  unread?: number;
  icon?: string;
}

export interface AgentCoach {
  id: string;
  title: string;
  sub: string;
  icon: string;
  gradient: string;
  desc: string;
  tip?: string;
  example?: string;
}

export interface NotificationItem {
  id: string;
  icon: string;
  color: string;
  title: string;
  time: string;
  cta: string;
  needsAction?: boolean;
  channelId?: string;
}

export interface PractiseSOP {
  id: string;
  name: string;
  icon: string;
  tip: string;
  example: string;
  isFocus?: boolean;
}
