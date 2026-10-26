export const business = {
  name: "Payal Industries",
  city: "Hubli",
  tagline: "UPVC Windows, Aluminium Windows, Profile Doors & All Glass Work",
  email: "payalindustrieshubli@gmail.com",
  gstin: "29CHJPK4375C1Z6",
  address: "D-57, 9th Cross, Gamangatti, Hubballi, Karnataka",
  facebook: "https://facebook.com/payalindustrieshubli",
  contacts: [
    { name: "Pempe Khan", phone: "9538204851" },
    { name: "Contractor", phone: "8105398475" },
  ],
};

export const primaryPhone = business.contacts[0].phone;
export const telHref = (phone) => `tel:+91${phone}`;
export const waHref = (phone) =>
  `https://wa.me/91${phone}`;
