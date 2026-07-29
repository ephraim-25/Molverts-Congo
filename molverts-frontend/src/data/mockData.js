// Convertit lon/lat en coordonnées 3D normalisées pour la carte
const geoTo3D = (lon, lat) => ({
  x: (lon - 23.5) * 0.18,
  z: -(lat + 2.5) * 0.22,
  y: 0,
});

const biodiversityHeight = {
  'Très élevée': 0.35,
  'Élevée': 0.28,
  'Moyenne': 0.2,
  'Modérée': 0.15,
};

export const provinces = [
  { id: 1, name: 'Kinshasa', ...geoTo3D(15.3, -4.3), description: 'Capitale et métropole économique', biodiversity: 'Élevée', hotspots: [{ x: 0, y: 0.4, z: 0.1, name: 'Mont Ngaliema' }] },
  { id: 2, name: 'Kongo Central', ...geoTo3D(14.0, -5.0), description: 'Côte atlantique et forêts du Mayombe', biodiversity: 'Élevée', hotspots: [{ x: 0, y: 0.3, z: 0.1, name: 'Mayombe' }] },
  { id: 3, name: 'Kwango', ...geoTo3D(17.5, -6.0), description: 'Savanes et forêts galeries du sud', biodiversity: 'Moyenne', hotspots: [] },
  { id: 4, name: 'Kwilu', ...geoTo3D(18.5, -4.5), description: 'Plateaux fertiles et biodiversité agricole', biodiversity: 'Moyenne', hotspots: [{ x: 0, y: 0.3, z: 0.1, name: 'Forêt de Bulungu' }] },
  { id: 5, name: 'Mai-Ndombe', ...geoTo3D(18.0, -2.5), description: 'Lac Mai-Ndombe et forêts inondées', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.4, z: 0.1, name: 'Lac Mai-Ndombe' }] },
  { id: 6, name: 'Kasaï', ...geoTo3D(20.5, -5.0), description: 'Savanes boisées du Kasaï', biodiversity: 'Moyenne', hotspots: [] },
  { id: 7, name: 'Kasaï-Central', ...geoTo3D(22.0, -5.5), description: 'Diamants et forêts miombo', biodiversity: 'Moyenne', hotspots: [{ x: 0, y: 0.3, z: 0.1, name: 'Forêt miombo' }] },
  { id: 8, name: 'Kasaï-Oriental', ...geoTo3D(23.5, -6.0), description: 'Savanes et forêts galeries', biodiversity: 'Moyenne', hotspots: [{ x: 0, y: 0.3, z: 0.1, name: 'Réserve de Lomami' }] },
  { id: 9, name: 'Lomami', ...geoTo3D(24.5, -6.5), description: 'Parc national de la Lomami', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Parc Lomami' }] },
  { id: 10, name: 'Sankuru', ...geoTo3D(23.5, -3.5), description: 'Forêts tropicales humides', biodiversity: 'Élevée', hotspots: [] },
  { id: 11, name: 'Maniema', ...geoTo3D(26.0, -3.0), description: 'Forêts denses de l\'est', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.4, z: 0.1, name: 'Parc de la Maiko' }] },
  { id: 12, name: 'Sud-Kivu', ...geoTo3D(28.5, -3.0), description: 'Grands lacs et forêts montagneuses', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Parc Kahuzi-Biega' }, { x: 0.2, y: 0.4, z: 0.1, name: 'Lac Kivu' }] },
  { id: 13, name: 'Nord-Kivu', ...geoTo3D(29.0, -0.5), description: 'Région volcanique aux forêts denses', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Parc Virunga' }, { x: 0.2, y: 0.4, z: 0.1, name: 'Nyiragongo' }] },
  { id: 14, name: 'Ituri', ...geoTo3D(29.5, 2.0), description: 'Forêt de l\'Ituri, pygmées et biodiversité', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Forêt de l\'Ituri' }] },
  { id: 15, name: 'Haut-Uele', ...geoTo3D(27.0, 3.5), description: 'Forêts du nord-est', biodiversity: 'Élevée', hotspots: [{ x: 0, y: 0.4, z: 0.1, name: 'Garamba' }] },
  { id: 16, name: 'Tshopo', ...geoTo3D(25.0, 0.5), description: 'Chutes Boyoma et forêts tropicales', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Chutes de Boyoma' }] },
  { id: 17, name: 'Bas-Uele', ...geoTo3D(25.5, 3.0), description: 'Forêts primaires du nord', biodiversity: 'Élevée', hotspots: [{ x: 0, y: 0.4, z: 0.1, name: 'Forêt de l\'Aruwimi' }] },
  { id: 18, name: 'Nord-Ubangi', ...geoTo3D(21.5, 3.5), description: 'Fleuve Ubangi et forêts', biodiversity: 'Élevée', hotspots: [] },
  { id: 19, name: 'Mongala', ...geoTo3D(22.0, 2.0), description: 'Fleuve Congo et forêts équatoriales', biodiversity: 'Élevée', hotspots: [] },
  { id: 20, name: 'Sud-Ubangi', ...geoTo3D(19.5, 3.0), description: 'Zones ripariennes du Congo', biodiversity: 'Élevée', hotspots: [] },
  { id: 21, name: 'Équateur', ...geoTo3D(18.5, 0.5), description: 'Forêt équatoriale dense', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Réserve de faune' }] },
  { id: 22, name: 'Tshuapa', ...geoTo3D(21.0, -1.0), description: 'Forêt du Tshuapa, cœur de la RDC', biodiversity: 'Très élevée', hotspots: [{ x: 0, y: 0.5, z: 0.1, name: 'Salonga Nord' }] },
  { id: 23, name: 'Tanganyika', ...geoTo3D(28.5, -6.0), description: 'Lac Tanganyika et savanes', biodiversity: 'Élevée', hotspots: [{ x: 0, y: 0.4, z: 0.1, name: 'Lac Tanganyika' }] },
  { id: 24, name: 'Haut-Lomami', ...geoTo3D(25.5, -7.5), description: 'Plateaux du Katanga intérieur', biodiversity: 'Moyenne', hotspots: [] },
  { id: 25, name: 'Haut-Katanga', ...geoTo3D(27.5, -10.0), description: 'Région minière aux savanes boisées', biodiversity: 'Moyenne', hotspots: [{ x: 0, y: 0.3, z: 0.1, name: 'Forêt miombo' }] },
  { id: 26, name: 'Lualaba', ...geoTo3D(25.0, -9.0), description: 'Fleuve Lualaba et mines de cuivre', biodiversity: 'Modérée', hotspots: [{ x: 0, y: 0.3, z: 0.1, name: 'Kolwezi' }] },
].map((p) => ({
  ...p,
  position: { x: p.x, y: biodiversityHeight[p.biodiversity] || 0.2, z: p.z },
}));

export const plants = [
  {
    id: 1, name: 'Harungana madagascariensis', commonName: 'Harungana', provinceId: 13, image: '🌿',
    description: 'Arbre médicinal aux propriétés anti-inflammatoires puissantes, endémique des forêts tropicales d\'Afrique centrale.',
    molecules: [
      { name: 'Anthraquinones', formula: 'C₁₄H₈O₂', properties: 'Anti-microbien, Anti-inflammatoire' },
      { name: 'Harunganin', formula: 'C₁₅H₁₂O₅', properties: 'Antioxydant, Cicatrisant' },
    ],
    therapeuticUses: ['Traitement des plaies', 'Anti-inflammatoire', 'Anti-bactérien'],
    traditionalUses: 'Écorce rouge utilisée en médecine traditionnelle pour soigner les infections cutanées et les inflammations.',
    chemicalStructure: 'C₁₄H₈O₂',
  },
  {
    id: 2, name: 'Alstonia boonei', commonName: 'Alstonia', provinceId: 12, image: '🌳',
    description: 'Arbre sacré aux multiples vertus thérapeutiques, surnommé "l\'arbre à quinine africain".',
    molecules: [
      { name: 'Alcaloïdes indoliques', formula: 'C₂₀H₂₄N₂O₄', properties: 'Anti-paludique, Analgésique' },
      { name: 'Échitamine', formula: 'C₂₂H₂₈N₂O₄', properties: 'Anti-fébrile, Anti-parasitaire' },
    ],
    therapeuticUses: ['Traitement du paludisme', 'Réduction de la fièvre', 'Sédatif'],
    traditionalUses: 'Écorce utilisée en décoction contre le paludisme et les fièvres tropicales.',
    chemicalStructure: 'C₂₀H₂₄N₂O₄',
  },
  {
    id: 3, name: 'Rauvolfia vomitoria', commonName: 'Rauvolfia', provinceId: 21, image: '🌱',
    description: 'Plante aux effets hypotenseurs remarquables, source historique de la réserpine.',
    molecules: [
      { name: 'Réserpine', formula: 'C₃₃H₄₀N₂O₉', properties: 'Anti-hypertenseur, Tranquilisant' },
      { name: 'Ajmaline', formula: 'C₂₀H₂₂N₂O₃', properties: 'Anti-arythmique' },
    ],
    therapeuticUses: ['Hypertension artérielle', 'Troubles cardiaques', 'Anxiété'],
    traditionalUses: 'Racine utilisée pour calmer les troubles nerveux et l\'hypertension.',
    chemicalStructure: 'C₃₃H₄₀N₂O₉',
  },
  {
    id: 4, name: 'Cryptolepis sanguinolenta', commonName: 'Cryptolepis', provinceId: 16, image: '🍃',
    description: 'Liane aux puissantes propriétés anti-malariaires, étudiée par l\'OMS.',
    molecules: [
      { name: 'Cryptolépine', formula: 'C₁₆H₁₂N₂', properties: 'Anti-paludique, Anti-bactérien' },
      { name: 'Quindoline', formula: 'C₁₄H₁₀N₂', properties: 'Anti-inflammatoire, Antioxydant' },
    ],
    therapeuticUses: ['Paludisme', 'Infections bactériennes', 'Fièvres'],
    traditionalUses: 'Racine en décoction pour traiter le paludisme et les infections.',
    chemicalStructure: 'C₁₆H₁₂N₂',
  },
  {
    id: 5, name: 'Nauclea latifolia', commonName: 'Pêche-porc', provinceId: 1, image: '🌸',
    description: 'Arbuste aux fruits comestibles et vertus médicinales reconnues par la pharmacopée africaine.',
    molecules: [
      { name: 'Naucléine A', formula: 'C₂₈H₃₄N₂O₄', properties: 'Anti-diarrhéique, Anti-spasmodique' },
      { name: 'Strictosamide', formula: 'C₂₆H₃₀N₂O₈', properties: 'Anti-tumoral, Anti-viral' },
    ],
    therapeuticUses: ['Diarrhées', 'Douleurs abdominales', 'Infections'],
    traditionalUses: 'Écorce et racines utilisées contre les troubles digestifs.',
    chemicalStructure: 'C₂₈H₃₄N₂O₄',
  },
  {
    id: 6, name: 'Morinda lucida', commonName: 'Morinda', provinceId: 25, image: '🍇',
    description: 'Arbre aux propriétés anti-diabétiques, très utilisé en médecine traditionnelle katangaise.',
    molecules: [
      { name: 'Morindine', formula: 'C₁₅H₁₂O₆', properties: 'Hypoglycémiant, Antioxydant' },
      { name: 'Anthraquinones', formula: 'C₁₄H₈O₂', properties: 'Anti-microbien' },
    ],
    therapeuticUses: ['Diabète', 'Infections', 'Ulcères'],
    traditionalUses: 'Feuilles et écorce utilisées pour traiter le diabète.',
    chemicalStructure: 'C₁₅H₁₂O₆',
  },
  {
    id: 7, name: 'Vernonia amygdalina', commonName: 'Amère', provinceId: 8, image: '🌼',
    description: 'Plante amère aux vertus digestives et anti-parasitaires, aliment de base en Afrique centrale.',
    molecules: [
      { name: 'Vernodalin', formula: 'C₂₀H₂₆O₇', properties: 'Anti-parasitaire, Anti-cancéreux' },
      { name: 'Vernolide', formula: 'C₁₉H₂₂O₆', properties: 'Anti-inflammatoire, Antioxydant' },
    ],
    therapeuticUses: ['Parasitoses', 'Diabète', 'Cancer'],
    traditionalUses: 'Feuilles amères en décoction pour les parasites et le diabète.',
    chemicalStructure: 'C₂₀H₂₆O₇',
  },
  {
    id: 8, name: 'Azadirachta indica', commonName: 'Neem', provinceId: 17, image: '🌲',
    description: 'Arbre aux multiples propriétés thérapeutiques, acclimaté dans les forêts du nord-est.',
    molecules: [
      { name: 'Azadirachtine', formula: 'C₃₅H₄₄O₁₆', properties: 'Anti-insecte, Anti-fongique' },
      { name: 'Nimbine', formula: 'C₂₄H₃₀O₆', properties: 'Anti-inflammatoire, Anti-bactérien' },
    ],
    therapeuticUses: ['Infections cutanées', 'Anti-parasitaire', 'Fièvres'],
    traditionalUses: 'Feuilles et huile utilisées pour les soins de la peau.',
    chemicalStructure: 'C₃₅H₄₄O₁₆',
  },
  {
    id: 9, name: 'Prunus africana', commonName: 'Pygeum', provinceId: 14, image: '🌴',
    description: 'Arbre emblématique de l\'Ituri, utilisé pour les troubles de la prostate.',
    molecules: [
      { name: 'Phytostérols', formula: 'C₂₉H₅₀O', properties: 'Anti-inflammatoire, Anti-androgène' },
      { name: 'Triterpènes', formula: 'C₃₀H₅₀O₂', properties: 'Anti-prostatique' },
    ],
    therapeuticUses: ['Hypertrophie prostatique', 'Inflammations urinaires'],
    traditionalUses: 'Écorce en décoction pour les troubles urinaires masculins.',
    chemicalStructure: 'C₂₉H₅₀O',
  },
  {
    id: 10, name: 'Bridelia ferruginea', commonName: 'Bridelia', provinceId: 22, image: '🍂',
    description: 'Arbre médicinal des forêts du Tshuapa, puissant anti-diabétique.',
    molecules: [
      { name: 'Bridelin', formula: 'C₂₀H₂₂O₅', properties: 'Hypoglycémiant' },
      { name: 'Flavonoïdes', formula: 'C₁₅H₁₀O₂', properties: 'Antioxydant, Anti-inflammatoire' },
    ],
    therapeuticUses: ['Diabète', 'Infections', 'Douleurs'],
    traditionalUses: 'Écorce en décoction contre le diabète et les douleurs.',
    chemicalStructure: 'C₂₀H₂₂O₅',
  },
  {
    id: 11, name: 'Hibiscus sabdariffa', commonName: 'Bissap', provinceId: 2, image: '🌺',
    description: 'Plante aux fleurs rouges riches en antioxydants, cultivée sur la côte atlantique.',
    molecules: [
      { name: 'Anthocyanines', formula: 'C₁₅H₁₁O₆', properties: 'Antioxydant, Anti-hypertenseur' },
      { name: 'Acide hibiscique', formula: 'C₆H₈O₇', properties: 'Diurétique, Anti-cholestérol' },
    ],
    therapeuticUses: ['Hypertension', 'Cholestérol', 'Fatigue'],
    traditionalUses: 'Infusion de calices pour la tension et la fatigue.',
    chemicalStructure: 'C₁₅H₁₁O₆',
  },
  {
    id: 12, name: 'Pterocarpus soyauxii', commonName: 'Padouk', provinceId: 5, image: '🪵',
    description: 'Arbre majestueux du bassin du Congo, écorce rouge aux propriétés cicatrisantes.',
    molecules: [
      { name: 'Pterostilbène', formula: 'C₁₆H₁₆O₃', properties: 'Antioxydant, Anti-cancéreux' },
      { name: 'Isoflavones', formula: 'C₁₅H₁₀O₂', properties: 'Anti-inflammatoire' },
    ],
    therapeuticUses: ['Cicatrisation', 'Inflammations', 'Infections'],
    traditionalUses: 'Poudre d\'écorce sur les plaies et blessures.',
    chemicalStructure: 'C₁₆H₁₆O₃',
  },
];

export const molecules = plants.flatMap((plant) =>
  plant.molecules.map((mol, idx) => ({
    id: `${plant.id}-${idx}`,
    ...mol,
    plantId: plant.id,
    plantName: plant.name,
    provinceId: plant.provinceId,
  }))
);

export const pathologies = [
  { id: 1, name: 'Paludisme', plants: [2, 4] },
  { id: 2, name: 'Diabète', plants: [6, 7, 10] },
  { id: 3, name: 'Hypertension', plants: [3, 11] },
  { id: 4, name: 'Infections cutanées', plants: [1, 8] },
  { id: 5, name: 'Troubles digestifs', plants: [5, 7] },
  { id: 6, name: 'Inflammations', plants: [1, 3, 12] },
];

export const getPlantsByProvince = (provinceId) =>
  plants.filter((plant) => plant.provinceId === provinceId);

export const getProvinceById = (provinceId) =>
  provinces.find((province) => province.id === provinceId);

export const searchAtlas = (query) => {
  if (!query || query.trim().length < 2) return { plants: [], provinces: [], molecules: [] };
  const q = query.toLowerCase().trim();

  const matchedPlants = plants.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.commonName.toLowerCase().includes(q) ||
      p.therapeuticUses.some((u) => u.toLowerCase().includes(q))
  );

  const matchedProvinces = provinces.filter(
    (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );

  const matchedMolecules = molecules.filter(
    (m) => m.name.toLowerCase().includes(q) || m.properties.toLowerCase().includes(q)
  );

  return { plants: matchedPlants, provinces: matchedProvinces, molecules: matchedMolecules };
};
