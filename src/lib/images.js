const unsplash = (id, w = 1200, q = 75) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  hero: unsplash("1600596542815-ffad4c1539a9", 1600, 80),
  about: unsplash("1512917774080-9991f1c4c750", 1200, 80),
  featuresBanner: unsplash("1600210492493-0946911123ea", 1000, 80),

  products: {
    hs2500: unsplash("1600607687939-ce8a6c25118c", 700, 75),
    hs2900: unsplash("1600210492493-0946911123ea", 700, 75),
    hs3200: unsplash("1600585154340-be6161a56a0c", 700, 75),
    h300: unsplash("1513584684374-8bab748fbf90", 700, 75),
    cs3000: unsplash("1600047509807-ba8f99d2cdde", 700, 75),
    ds6000: unsplash("1600585153490-76fb20a32601", 700, 75),
  },

  applications: {
    luxuryHomes: unsplash("1600585153490-76fb20a32601", 700, 75),
    apartments: unsplash("1545324418-cc1a3fa10c00", 700, 75),
    commercial: unsplash("1486406146926-c627a92ad1ab", 700, 75),
    renovation: unsplash("1600566753190-17f0baa2a6c3", 700, 75),
  },

  projects: {
    villa: unsplash("1512917774080-9991f1c4c750", 800, 75),
    stairwell: unsplash("1505873242700-f289a29e1e0f", 800, 75),
    patioDoors: unsplash("1513584684374-8bab748fbf90", 800, 75),
  },
};
