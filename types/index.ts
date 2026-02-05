export interface FormData {
  selectedInsurances: string[];
  answers: Record<string, Record<string, any>>;
  personalInfo: {
    naam?: string;
    postcode?: string;
    huisnummer?: string;
    geboortedatum?: string;
    geslacht?: string;
    gezinssituatie?: string;
    email?: string;
    telefoonnummer?: string;
    geboortedatumPartner?: string;
    kinderen?: string[];
  };
  uploadedPolis?: {
    file: File;
    url: string;
    fileName: string;
  };
  algemeneVragen?: {
    schade_laatste_5_jaar?: boolean;
    aantal_schades?: number;
    laatste_schade_datum?: string;
    justitie_laatste_8_jaar?: boolean;
    verzekering_geweigerd?: boolean;
    beslag_gelegd?: boolean;
    failliet_schuldsanering?: boolean;
  };
}

export interface Step {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}

