export const business = {
  name: "Payal Industries",
  city: "Hubli",
  tagline: "UPVC Windows, Aluminium Windows, Profile Doors & All Glass Work",
  email: "payalindustrieshubli@gmail.com",
  gstin: "29CHJPK4375C1Z6",
  address: "D-57, 9th Cross, Gamangatti, Hubballi, Karnataka",
  facebook: "https://www.facebook.com/share/1PJxc6VQsc/",
  instagram: "https://www.instagram.com/payal_industries_hubbli",
  geo: { lat: 15.3729812, lng: 75.0487033 },
  contacts: [
    { name: "Pempe Khan", phone: "9538204851" },
    { name: "Contractor", phone: "8105398475" },
  ],
};

// Set NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://yourdomain.com) in hosting env vars.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://payalindustries.com").replace(/\/$/, "");

export const seo = {
  keywords: [
    "UPVC windows Hubli",
    "aluminium windows Hubli",
    "UPVC doors Hubballi",
    "aluminium sliding windows Hubli",
    "glass partition Hubli",
    "glass work Hubballi",
    "structural glazing Karnataka",
    "profile doors Hubli",
    "mosquito mesh windows",
    "Payal Industries",
  ],
  areaServed: ["Hubballi", "Dharwad", "Belagavi", "Karnataka"],
};

const { lat, lng } = business.geo;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const mapEmbedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

export const primaryPhone = business.contacts[0].phone;
export const telHref = (phone) => `tel:+91${phone}`;
export const waHref = (phone) =>
  `https://wa.me/91${phone}`;
