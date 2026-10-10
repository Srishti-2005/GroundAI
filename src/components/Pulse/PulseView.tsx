import React, { useState } from 'react';
import { PulseChannel, AgentCoach } from '../../types';
import { PulseHome } from './PulseHome';
import { PulseChat } from './PulseChat';

interface PulseViewProps {
  channels: PulseChannel[];
  coaches: AgentCoach[];
  activeChannelId: string | null;
  onSelectChannel: (channelId: string | null) => void;
  onOpenCoach: (coach: AgentCoach) => void;
  onSendMessage: (channelId: string, text: string) => void;
}

export const PulseView: React.FC<PulseViewProps> = ({
  channels,
  coaches,
  activeChannelId,
  onSelectChannel,
  onOpenCoach,
  onSendMessage
}) => {
  const activeChannel = channels.find(c => c.id === activeChannelId);

  if (activeChannel) {
    return (
      <PulseChat
        channel={activeChannel}
        onBack={() => onSelectChannel(null)}
        onSendMessage={onSendMessage}
      />
    );
  }

  return (
    <PulseHome
      channels={channels}
      coaches={coaches}
      onSelectChannel={onSelectChannel}
      onOpenCoach={onOpenCoach}
    />
  );
};
