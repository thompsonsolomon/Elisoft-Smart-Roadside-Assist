import { createContext, useContext, useState } from "react";

const MechanicContext = createContext();

export function MapProvider({ children }) {
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  // Optional: clear mechanic when user navigates away
  const clearSelectedMechanic = () => setSelectedMechanic(null);

  return (
    <MechanicContext.Provider
      value={{ selectedMechanic, setSelectedMechanic, clearSelectedMechanic }}
    >
      {children}
    </MechanicContext.Provider>
  );
}

export function useMapContext() {
  return useContext(MechanicContext);
}
