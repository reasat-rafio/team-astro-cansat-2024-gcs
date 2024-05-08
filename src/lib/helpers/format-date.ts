export default function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
