export const isLightColor = (color: string): boolean => {
  if (typeof document === 'undefined') {
    return false;
  }

  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return false;

  ctx.fillStyle = color;
  const hex = ctx.fillStyle;
  if (hex === '#000000' && !['#000000', 'black'].includes(color.toLowerCase())) {
    return false;
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};
