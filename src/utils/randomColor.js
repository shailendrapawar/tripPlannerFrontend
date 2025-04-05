const highContrastColors = [
    "#D32F2F", // Red
    "#1976D2", // Blue
    "#388E3C", // Green
    "#F57C00", // Orange
    "#7B1FA2", // Purple
    "#C2185B", // Pink
    "#00796B", // Teal
    "#512DA8", // Deep Purple
    "#455A64", // Blue Grey
    "#E64A19", // Deep Orange
    "#303F9F", // Indigo
  ];
  // Mapping of usernames to their assigned colors
  const senderColorMap = {};
  // Shuffle once so same users don't get same color each time app runs
  const shuffledColors = highContrastColors.sort(() => Math.random() - 0.5);

  export  default function getSenderColor(username) {
    if (!senderColorMap[username]) {
      // Assign next available color
      const color = shuffledColors[Object.keys(senderColorMap).length % shuffledColors.length];
      senderColorMap[username] = color;
    }
    return senderColorMap[username];
  }
  