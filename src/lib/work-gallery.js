const makeItems = (folder, count) =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { src: `/${folder}/${n}.jpg`, alt: `${folder.replace("work-", "").replace(/-/g, " ")} ${n}` };
  });

export const workCategories = [
  {
    id: "aluminium-window",
    label: "Aluminium Windows",
    items: makeItems("work-aluminium-window", 10),
  },
  {
    id: "upvc-window",
    label: "UPVC Windows",
    items: makeItems("work-upvc-window", 11),
  },
  {
    id: "aluminium-partition",
    label: "Office Partitions",
    items: makeItems("work-aluminium-partition", 10),
  },
  {
    id: "glazing",
    label: "Glazing Work",
    items: makeItems("work-glazing", 10),
  },
  {
    id: "partition-door",
    label: "Partition Doors",
    items: makeItems("work-partition-door", 4),
  },
  {
    id: "aluminium-window-sample",
    label: "Profile & Hardware Samples",
    items: makeItems("work-aluminium-window-sample", 12),
  },
];
