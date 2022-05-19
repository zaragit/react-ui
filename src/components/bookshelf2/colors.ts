const PASTEL_COLORS = [
  { primary: '#f44336', light: '#e57373', text: '#ffffff' },
  { primary: '#795548', light: '#a1887f', text: '#ffffff' },
  { primary: '#ff9800', light: '#ffb74d', text: '#ffffff' },
  { primary: '#cddc39', light: '#dce775', text: '#ffffff' },
  { primary: '#4caf50', light: '#81c784', text: '#ffffff' },
  { primary: '#03a9f4', light: '#4fc3f7', text: '#ffffff' },
  { primary: '#3f51b5', light: '#7986cb', text: '#ffffff' },
  { primary: '#673ab7', light: '#9575cd', text: '#ffffff' },
  { primary: '#9c27b0', light: '#ba68c8', text: '#ffffff' },
];

export const extractColorByTitleLength = (title: string) => {
  return PASTEL_COLORS[title.length % 10];
};

export default PASTEL_COLORS;
