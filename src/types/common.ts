export interface Project {
  id: string;
  name: string;
  description: string;
  developer: string;
  image: string;
  location: string;
  totalUnits: number;
}

export interface Unit {
  id: string;
  projectId: string;
  name: string;
  price: number;
  developer: string;
  zone: string;
  size: number;
  latitude: number;
  longitude: number;
  status: string;
  amenities: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}
