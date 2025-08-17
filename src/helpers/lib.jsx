// Normalize before sending to backend
export function FormatPin(pin) {
    if (!pin) return "";
  
    // Ensure it's always treated as a string
    let pinStr = String(pin);
  
    // If it starts with +234, return as is
    if (pinStr.startsWith("+234")) {
      return pinStr;
    }
  
    // If it starts with 0, replace with +234
    if (pinStr.startsWith("0")) {
      return "+234" + pinStr.slice(1);
    }
  
    // Otherwise, return unchanged
    return pinStr;
  }
  