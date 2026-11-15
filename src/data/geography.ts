export interface GeoLevel {
  id: string;
  name: string;
  type: "national" | "region" | "zone" | "woreda" | "community";
  parentId?: string;
}

export interface RegionData {
  id: string;
  name: string;
  code: string;
  capital: string;
  playerCount: number;
  tournamentCount: number;
  zones: {
    id: string;
    name: string;
    woredas: {
      id: string;
      name: string;
      communities: string[];
    }[];
  }[];
}

export const ETHIOPIA_GEOGRAPHY: RegionData[] = [
  {
    id: "reg-aa",
    name: "Addis Ababa",
    code: "AA",
    capital: "Addis Ababa",
    playerCount: 14200,
    tournamentCount: 38,
    zones: [
      {
        id: "zone-aa-central",
        name: "Central Addis",
        woredas: [
          {
            id: "wor-bole",
            name: "Bole Sub-City",
            communities: [
              "Bole Medhanialem Cyber Lounge",
              "Bole Atlas Gaming Arena",
              "Rwanda Esports Club",
              "Bole Michael Net",
              "Gerji Gaming Hub",
            ],
          },
          {
            id: "wor-kirkos",
            name: "Kirkos Sub-City",
            communities: ["Meskel Square Esports Zone", "Kazanchis High-Ping Arena", "Beklo Bet Hub"],
          },
          {
            id: "wor-arada",
            name: "Arada Sub-City",
            communities: ["Piassa Historic Gamers Club", "4 Kilo University Hub", "Churchill Tech Lounge"],
          },
        ],
      },
      {
        id: "zone-aa-east",
        name: "East Addis",
        woredas: [
          {
            id: "wor-yeka",
            name: "Yeka Sub-City",
            communities: ["Megenagna Cyber Apex", "CMC Esports Lab", "Kotebe Gamers Union"],
          },
          {
            id: "wor-lemikura",
            name: "Lemi Kura Sub-City",
            communities: ["Ayat Gaming District", "Tafo Esports Hub", "Summit Cyber Hub"],
          },
        ],
      },
      {
        id: "zone-aa-southwest",
        name: "South-West Addis",
        woredas: [
          {
            id: "wor-nifas-silk",
            name: "Nifas Silk-Lafto",
            communities: ["Sarbet Vanguard Gaming", "Jemo Gamers Guild", "Lafto Cyber Center"],
          },
          {
            id: "wor-kolfe",
            name: "Kolfe Keranio",
            communities: ["Torhailoch Esports Lab", "18 Mazoriya Hub"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-oromia",
    name: "Oromia",
    code: "OR",
    capital: "Adama",
    playerCount: 9800,
    tournamentCount: 24,
    zones: [
      {
        id: "zone-finfinne-special",
        name: "Oromia Special Zone Surrounding Finfinnee",
        woredas: [
          {
            id: "wor-bishoftu",
            name: "Bishoftu City",
            communities: ["Bishoftu Crater Esports", "Babogaya Gaming Hub"],
          },
          {
            id: "wor-burayu",
            name: "Burayu City",
            communities: ["Burayu Net Alliance", "Gafarsa Gamers"],
          },
          {
            id: "wor-sebeta",
            name: "Sebeta City",
            communities: ["Sebeta Industrial Gaming Arena"],
          },
        ],
      },
      {
        id: "zone-east-shewa",
        name: "East Shewa Zone",
        woredas: [
          {
            id: "wor-adama",
            name: "Adama City",
            communities: ["Adama University Esports", "Posta Bet Gaming Club", "Wonji Road Gamers"],
          },
        ],
      },
      {
        id: "zone-jimma",
        name: "Jimma Zone",
        woredas: [
          {
            id: "wor-jimma-city",
            name: "Jimma City",
            communities: ["Jimma Institute of Tech Gamers", "Hermata Esports Hub"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-amhara",
    name: "Amhara",
    code: "AM",
    capital: "Bahir Dar",
    playerCount: 7600,
    tournamentCount: 19,
    zones: [
      {
        id: "zone-bahirdar",
        name: "Bahir Dar Special Zone",
        woredas: [
          {
            id: "wor-bahirdar-city",
            name: "Bahir Dar City",
            communities: ["Tana Waterfront Gaming Lounge", "Polytechnic Esports Clan", "Kebele 04 Cyber"],
          },
        ],
      },
      {
        id: "zone-gondar",
        name: "Central Gondar Zone",
        woredas: [
          {
            id: "wor-gondar-city",
            name: "Gondar City",
            communities: ["Fasil Castle Gamers", "Maraki Campus League", "Piazza Gondar Esports"],
          },
        ],
      },
      {
        id: "zone-dessie",
        name: "South Wollo Zone",
        woredas: [
          {
            id: "wor-dessie-city",
            name: "Dessie City",
            communities: ["Dessie Cyber Arena", "Piazza Wollo Gamers"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-tigray",
    name: "Tigray",
    code: "TG",
    capital: "Mekelle",
    playerCount: 4200,
    tournamentCount: 12,
    zones: [
      {
        id: "zone-mekelle",
        name: "Mekelle Special Zone",
        woredas: [
          {
            id: "wor-mekelle-city",
            name: "Mekelle City",
            communities: ["Ayder Tech Gamers", "Hawelti Gaming Hub", "MIt Mekelle Esports"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-sidama",
    name: "Sidama",
    code: "SD",
    capital: "Hawassa",
    playerCount: 5100,
    tournamentCount: 15,
    zones: [
      {
        id: "zone-hawassa",
        name: "Hawassa City Zone",
        woredas: [
          {
            id: "wor-hawassa-city",
            name: "Hawassa City",
            communities: ["Lake Hawassa Esports Resort", "Piazza Hawassa Gamers", "Menhariya Cyber"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-diredawa",
    name: "Dire Dawa",
    code: "DD",
    capital: "Dire Dawa",
    playerCount: 3800,
    tournamentCount: 11,
    zones: [
      {
        id: "zone-diredawa-admin",
        name: "Dire Dawa Administration",
        woredas: [
          {
            id: "wor-diredawa-city",
            name: "Dire Dawa City",
            communities: ["Railway City Gamers", "Kezira Esports Club", "Megala Cyber Lounge"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-harari",
    name: "Harari",
    code: "HR",
    capital: "Harar",
    playerCount: 1900,
    tournamentCount: 6,
    zones: [
      {
        id: "zone-harar",
        name: "Harar Region Zone",
        woredas: [
          {
            id: "wor-harar-city",
            name: "Harar Jugol",
            communities: ["Jugol Walled City Gamers", "Ras Makonnen Esports Lab"],
          },
        ],
      },
    ],
  },
  {
    id: "reg-somali",
    name: "Somali Region",
    code: "SM",
    capital: "Jijiga",
    playerCount: 2400,
    tournamentCount: 8,
    zones: [
      {
        id: "zone-jijiga",
        name: "Jijiga Zone",
        woredas: [
          {
            id: "wor-jijiga-city",
            name: "Jijiga City",
            communities: ["Jijiga University Gamers", "Daryeel Esports Arena"],
          },
        ],
      },
    ],
  },
];

export function getAllRegions(): { id: string; name: string; code: string; playerCount: number }[] {
  return ETHIOPIA_GEOGRAPHY.map((r) => ({
    id: r.id,
    name: r.name,
    code: r.code,
    playerCount: r.playerCount,
  }));
}

export function getZonesByRegion(regionId: string) {
  const reg = ETHIOPIA_GEOGRAPHY.find((r) => r.id === regionId);
  return reg ? reg.zones : [];
}

export function getWoredasByZone(regionId: string, zoneId: string) {
  const zones = getZonesByRegion(regionId);
  const zone = zones.find((z) => z.id === zoneId);
  return zone ? zone.woredas : [];
}

export function formatLocationBreadcrumb(
  regionName?: string,
  woredaName?: string,
  communityName?: string
): string {
  const parts = [];
  if (communityName) parts.push(communityName);
  if (woredaName) parts.push(woredaName);
  if (regionName) parts.push(regionName);
  parts.push("Ethiopia");
  return parts.join(" • ");
}

