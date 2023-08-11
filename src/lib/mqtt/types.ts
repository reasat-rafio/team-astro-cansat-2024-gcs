export type Topics = ContainerTopics | PayloadTopics;

export type ContainerTopics =
  | 'container/temperature'
  | 'container/humidity'
  | 'container/altitude'
  | 'container/acceleration'
  | 'container/gyroscope'
  | 'container/pressure'
  | 'container/separatorLine';

export type PayloadTopics =
  | 'payload/temperature'
  | 'payload/humidity'
  | 'payload/altitude'
  | 'payload/acceleration'
  | 'payload/gyroscope'
  | 'payload/separatorLine'
  | 'payload/pressure';
