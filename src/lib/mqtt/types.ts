export type Topics = PayloadTopics;

export type PayloadTopics =
  | 'payload/altitude'
  | 'payload/air_pressure'
  | 'payload/temperature'
  | 'payload/battery_voltage'
  | 'payload/tilt_angle'
  | 'payload/air_speed'
  | 'payload/command_echo'
  | 'payload/gps_coordinates'
  | 'payload/longitude'
  | 'payload/satellites_tracked'
  //
  | 'payload/acceleration'
  | 'payload/gyroscope'
  | 'payload/separator'
  | 'payload/pressure';
