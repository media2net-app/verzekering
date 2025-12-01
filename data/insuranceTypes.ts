export interface InsuranceType {
  id: string;
  name: string;
  category: 'auto' | 'huis' | 'persoonlijk';
  description: string;
  basePrice: number;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'radio';
  label: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
  validation?: (value: any) => boolean;
  tooltip?: string;
}

export const insuranceTypes: InsuranceType[] = [
  // Auto en vervoer
  {
    id: 'autoverzekering',
    name: 'Autoverzekering',
    category: 'auto',
    description: 'Verzekering voor uw auto',
    basePrice: 45,
    questions: [
      {
        id: 'kenteken',
        type: 'text',
        label: 'Kenteken van uw auto',
        placeholder: 'Bijv. 12-ABC-3',
        required: true,
        tooltip: 'Het kenteken staat op uw kentekenbewijs. Voer het in zonder spaties, bijvoorbeeld: 12ABC3',
      },
      {
        id: 'merk',
        type: 'text',
        label: 'Merk en model',
        placeholder: 'Bijv. Volkswagen Golf',
        required: true,
        tooltip: 'Vul het volledige merk en model in, zoals het op uw kentekenbewijs staat vermeld.',
      },
      {
        id: 'bouwjaar',
        type: 'number',
        label: 'Bouwjaar',
        placeholder: 'Bijv. 2020',
        required: true,
        tooltip: 'Het bouwjaar is het jaar waarin uw auto voor het eerst is toegelaten tot het verkeer.',
      },
      {
        id: 'schadevrije_jaren',
        type: 'number',
        label: 'Aantal schadevrije jaren',
        placeholder: '0',
        required: false,
        tooltip: 'Schadevrije jaren zijn jaren waarin u geen schade heeft gereden. Meer schadevrije jaren betekent meestal een lagere premie.',
      },
    ],
  },
  {
    id: 'fietsverzekering',
    name: 'Fietsverzekering',
    category: 'auto',
    description: 'Verzekering voor uw fiets',
    basePrice: 8,
    questions: [
      {
        id: 'fiets_waarde',
        type: 'number',
        label: 'Waarde van uw fiets (€)',
        placeholder: 'Bijv. 500',
        required: true,
        tooltip: 'De waarde van uw fiets is de aankoopprijs of de huidige marktwaarde. Voor een nieuwe fiets is dit de aankoopprijs.',
      },
      {
        id: 'fiets_type',
        type: 'select',
        label: 'Type fiets',
        options: ['Stadsfiets', 'Elektrische fiets', 'Racefiets', 'Mountainbike', 'Anders'],
        required: true,
        tooltip: 'Kies het type fiets dat het beste bij uw fiets past. Dit bepaalt mede de premie.',
      },
    ],
  },
  {
    id: 'scooterverzekering',
    name: 'Scooterverzekering',
    category: 'auto',
    description: 'Verzekering voor uw scooter',
    basePrice: 15,
    questions: [
      {
        id: 'scooter_kenteken',
        type: 'text',
        label: 'Kenteken',
        placeholder: 'Bijv. 12-ABC-3',
        required: true,
        tooltip: 'Het kenteken van uw scooter staat op het kentekenbewijs. Voer het in zonder spaties.',
      },
      {
        id: 'scooter_merk',
        type: 'text',
        label: 'Merk en model',
        required: true,
        tooltip: 'Vul het volledige merk en model van uw scooter in zoals vermeld op het kentekenbewijs.',
      },
    ],
  },
  {
    id: 'bestelautoverzekering',
    name: 'Bestelautoverzekering',
    category: 'auto',
    description: 'Verzekering voor uw bestelauto',
    basePrice: 50,
    questions: [
      {
        id: 'bestel_kenteken',
        type: 'text',
        label: 'Kenteken',
        placeholder: 'Bijv. 12-ABC-3',
        required: true,
        tooltip: 'Het kenteken van uw bestelauto staat op het kentekenbewijs. Voer het in zonder spaties.',
      },
      {
        id: 'bestel_merk',
        type: 'text',
        label: 'Merk en model',
        placeholder: 'Bijv. Ford Transit',
        required: true,
        tooltip: 'Vul het volledige merk en model van uw bestelauto in zoals vermeld op het kentekenbewijs.',
      },
      {
        id: 'bestel_bouwjaar',
        type: 'number',
        label: 'Bouwjaar',
        placeholder: 'Bijv. 2020',
        required: true,
        tooltip: 'Het bouwjaar is het jaar waarin uw bestelauto voor het eerst is toegelaten tot het verkeer.',
      },
    ],
  },
  {
    id: 'brommerverzekering',
    name: 'Brommer- en bromfietsverzekering',
    category: 'auto',
    description: 'Verzekering voor uw brommer of bromfiets',
    basePrice: 12,
    questions: [
      {
        id: 'brommer_kenteken',
        type: 'text',
        label: 'Kenteken',
        placeholder: 'Bijv. 12-ABC-3',
        required: true,
        tooltip: 'Het kenteken van uw brommer of bromfiets staat op het kentekenbewijs. Voer het in zonder spaties.',
      },
      {
        id: 'brommer_merk',
        type: 'text',
        label: 'Merk en model',
        required: true,
        tooltip: 'Vul het volledige merk en model van uw brommer of bromfiets in zoals vermeld op het kentekenbewijs.',
      },
    ],
  },
  {
    id: 'speedpedelecverzekering',
    name: 'Speed pedelecverzekering',
    category: 'auto',
    description: 'Verzekering voor uw speed pedelec',
    basePrice: 10,
    questions: [
      {
        id: 'pedelec_waarde',
        type: 'number',
        label: 'Waarde van uw speed pedelec (€)',
        placeholder: 'Bijv. 3000',
        required: true,
        tooltip: 'De waarde van uw speed pedelec is de aankoopprijs of de huidige marktwaarde. Voor een nieuwe speed pedelec is dit de aankoopprijs.',
      },
      {
        id: 'pedelec_merk',
        type: 'text',
        label: 'Merk en model',
        required: true,
        tooltip: 'Vul het volledige merk en model van uw speed pedelec in. Dit staat meestal op de frame of in de handleiding.',
      },
    ],
  },
  // Huis
  {
    id: 'woonverzekering',
    name: 'Woonverzekering',
    category: 'huis',
    description: 'All-in verzekering voor uw woning',
    basePrice: 25,
    questions: [
      {
        id: 'woon_type',
        type: 'select',
        label: 'Type woning',
        options: ['Appartement', 'Rijtjeshuis', 'Vrijstaand', 'Twee-onder-een-kap'],
        required: true,
        tooltip: 'Kies het type woning dat het beste bij uw situatie past. Dit bepaalt mede de premie en dekking.',
      },
      {
        id: 'woon_waarde',
        type: 'number',
        label: 'Waarde van uw woning (€)',
        placeholder: 'Bijv. 300000',
        required: true,
        tooltip: 'De waarde van uw woning is de geschatte marktwaarde of de aankoopprijs. U kunt ook de WOZ-waarde gebruiken.',
      },
      {
        id: 'bouwjaar_woning',
        type: 'number',
        label: 'Bouwjaar woning',
        required: true,
        tooltip: 'Het bouwjaar is het jaar waarin uw woning is gebouwd. Dit staat vaak op de funderingsbalk of in het kadaster.',
      },
    ],
  },
  {
    id: 'inboedelverzekering',
    name: 'Inboedelverzekering',
    category: 'huis',
    description: 'Verzekering voor uw inboedel',
    basePrice: 12,
    questions: [
      {
        id: 'inboedel_waarde',
        type: 'number',
        label: 'Waarde van uw inboedel (€)',
        placeholder: 'Bijv. 50000',
        required: true,
        tooltip: 'De waarde van uw inboedel is de totale waarde van alle spullen in uw woning: meubels, elektronica, kleding, etc. Tel alles bij elkaar op.',
      },
      {
        id: 'woonoppervlakte',
        type: 'number',
        label: 'Woonoppervlakte (m²)',
        placeholder: 'Bijv. 80',
        required: true,
        tooltip: 'De woonoppervlakte is het totale aantal vierkante meters van uw woning. Dit staat vaak in het koopcontract of op Funda.',
      },
    ],
  },
  {
    id: 'opstalverzekering',
    name: 'Opstalverzekering',
    category: 'huis',
    description: 'Verzekering voor uw opstal',
    basePrice: 18,
    questions: [
      {
        id: 'opstal_waarde',
        type: 'number',
        label: 'Herbouwwaarde (€)',
        placeholder: 'Bijv. 250000',
        required: true,
        tooltip: 'De herbouwwaarde is het bedrag dat nodig is om uw woning volledig te herbouwen bij totale verwoesting. Dit is meestal lager dan de marktwaarde.',
      },
    ],
  },
  {
    id: 'huisdierverzekering',
    name: 'Huisdierverzekering',
    category: 'huis',
    description: 'Verzekering voor uw huisdier',
    basePrice: 20,
    questions: [
      {
        id: 'dier_type',
        type: 'select',
        label: 'Type dier',
        options: ['Hond', 'Kat', 'Konijn', 'Anders'],
        required: true,
        tooltip: 'Kies het type huisdier dat u wilt verzekeren. Verschillende dieren hebben verschillende premies en dekkingen.',
      },
      {
        id: 'dier_leeftijd',
        type: 'number',
        label: 'Leeftijd van uw huisdier',
        required: true,
        tooltip: 'De leeftijd van uw huisdier in jaren. Voor oudere dieren kan de premie hoger zijn of kan er een wachttijd gelden.',
      },
    ],
  },
  // Persoonlijk
  {
    id: 'aansprakelijkheidsverzekering',
    name: 'Aansprakelijkheidsverzekering',
    category: 'persoonlijk',
    description: 'Verzekering voor aansprakelijkheid',
    basePrice: 6,
    questions: [
      {
        id: 'gezinssamenstelling',
        type: 'select',
        label: 'Gezinssamenstelling',
        options: ['Alleenstaand', 'Stel', 'Gezin met kinderen'],
        required: true,
        tooltip: 'Kies de gezinssamenstelling die het beste bij uw situatie past. Dit bepaalt hoeveel personen er verzekerd zijn.',
      },
    ],
  },
  {
    id: 'annuleringsverzekering',
    name: 'Annuleringsverzekering',
    category: 'persoonlijk',
    description: 'Verzekering voor annulering van reizen',
    basePrice: 5,
    questions: [
      {
        id: 'reis_waarde',
        type: 'number',
        label: 'Waarde van uw reis (€)',
        placeholder: 'Bijv. 2000',
        required: true,
        tooltip: 'De totale waarde van uw reis, inclusief vervoer, accommodatie en andere vooraf betaalde kosten.',
      },
      {
        id: 'reis_bestemming',
        type: 'text',
        label: 'Reisbestemming',
        placeholder: 'Bijv. Spanje',
        required: false,
        tooltip: 'De bestemming van uw reis. Dit kan helpen bij het bepalen van de juiste dekking voor uw reis.',
      },
    ],
  },
  {
    id: 'cyberverzekering',
    name: 'Cyberverzekering',
    category: 'persoonlijk',
    description: 'Bescherming tegen cybercriminaliteit',
    basePrice: 8,
    questions: [
      {
        id: 'dekking_niveau',
        type: 'select',
        label: 'Dekkingsniveau',
        options: ['Basis', 'Uitgebreid', 'Premium'],
        required: true,
        tooltip: 'Kies het dekkingsniveau dat past bij uw behoeften. Premium biedt de meest uitgebreide bescherming tegen cybercriminaliteit.',
      },
      {
        id: 'online_activiteiten',
        type: 'select',
        label: 'Hoeveel doet u online?',
        options: ['Weinig', 'Gemiddeld', 'Veel'],
        required: true,
        tooltip: 'Geef aan hoeveel u online doet. Meer online activiteiten kunnen een hoger risico betekenen en daarmee een andere premie.',
      },
    ],
  },
  {
    id: 'rechtsbijstandverzekering',
    name: 'Rechtsbijstandverzekering',
    category: 'persoonlijk',
    description: 'Juridische hulp wanneer u het nodig heeft',
    basePrice: 15,
    questions: [
      {
        id: 'dekking_type',
        type: 'select',
        label: 'Type dekking',
        options: ['Basis', 'Uitgebreid', 'Premium'],
        required: true,
        tooltip: 'Kies het type dekking dat past bij uw behoeften. Premium biedt de meest uitgebreide rechtsbijstand voor verschillende situaties.',
      },
    ],
  },
  {
    id: 'reisverzekering',
    name: 'Reisverzekering',
    category: 'persoonlijk',
    description: 'Verzekering voor uw reizen',
    basePrice: 3,
    questions: [
      {
        id: 'reis_type',
        type: 'select',
        label: 'Type verzekering',
        options: ['Doorlopend', 'Kortlopend (per reis)'],
        required: true,
        tooltip: 'Doorlopend: u bent het hele jaar verzekerd voor alle reizen. Kortlopend: u verzekert per reis. Doorlopend is vaak voordeliger bij meerdere reizen per jaar.',
      },
      {
        id: 'aantal_reizen',
        type: 'number',
        label: 'Aantal reizen per jaar',
        placeholder: 'Bijv. 2',
        required: false,
        tooltip: 'Het aantal reizen dat u per jaar maakt. Dit helpt bij het bepalen of een doorlopende verzekering voordeliger is.',
      },
    ],
  },
  {
    id: 'zorgverzekering',
    name: 'Zorgverzekering',
    category: 'persoonlijk',
    description: 'Basis zorgverzekering',
    basePrice: 130,
    questions: [
      {
        id: 'eigen_risico',
        type: 'select',
        label: 'Eigen risico',
        options: ['€385 (standaard)', '€585', '€785', '€885'],
        required: true,
        tooltip: 'Het eigen risico is het bedrag dat u zelf betaalt voordat de verzekering uitkeert. Een hoger eigen risico betekent meestal een lagere maandpremie.',
      },
    ],
  },
  {
    id: 'overlijdensrisicoverzekering',
    name: 'Overlijdensrisicoverzekering',
    category: 'persoonlijk',
    description: 'Verzekering bij overlijden',
    basePrice: 10,
    questions: [
      {
        id: 'verzekerd_bedrag',
        type: 'number',
        label: 'Verzekerd bedrag (€)',
        placeholder: 'Bijv. 100000',
        required: true,
        tooltip: 'Het bedrag dat uitgekeerd wordt aan uw nabestaanden bij overlijden. Kies een bedrag dat past bij uw financiële verplichtingen, zoals een hypotheek.',
      },
      {
        id: 'looptijd',
        type: 'number',
        label: 'Looptijd (jaren)',
        placeholder: 'Bijv. 30',
        required: true,
        tooltip: 'De looptijd is de periode waarin u verzekerd bent. Vaak kiest u een looptijd die overeenkomt met de resterende looptijd van uw hypotheek.',
      },
    ],
  },
];

export const categories = {
  auto: {
    name: 'Auto en vervoer',
    icon: 'car',
  },
  huis: {
    name: 'Huis',
    icon: 'home',
  },
  persoonlijk: {
    name: 'Persoonlijk',
    icon: 'user',
  },
};

