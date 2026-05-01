import { create } from 'zustand';

interface TelemetryData {
  engine: {
    w16_firing_order: number[];
    torque_nm: number;
    rpm: number;
    boost_pressure_bar: number;
  };
  tyres: {
    pressure_psi: {
      front_left: number;
      front_right: number;
      rear_left: number;
      rear_right: number;
    };
    temperature_c: number;
    slip_angle: number;
  };
  aerodynamics: {
    drag_coefficient: number;
    downforce_n: number;
    wing_angle_deg: number;
  };
}

interface BugattiState {
  currentFrame: number;
  activeSection: string;
  telemetry: TelemetryData | null;
  setCurrentFrame: (frame: number) => void;
  setActiveSection: (section: string) => void;
  setTelemetry: (data: TelemetryData) => void;
}

export const useStore = create<BugattiState>((set) => ({
  currentFrame: 0,
  activeSection: 'HOME',
  telemetry: null,
  setCurrentFrame: (frame) => set({ currentFrame: frame }),
  setActiveSection: (section) => set({ activeSection: section }),
  setTelemetry: (data) => set({ telemetry: data }),
}));
