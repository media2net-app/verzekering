export interface FormData {
  selectedInsurances: string[];
  answers: Record<string, Record<string, any>>;
  personalInfo: {
    naam?: string;
    email?: string;
    telefoon?: string;
    postcode?: string;
    huisnummer?: string;
  };
}

export interface Step {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}

