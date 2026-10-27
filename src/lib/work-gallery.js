const makeItems = (folder, count, label) =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `/${folder}/${n}.jpg`,
      alt: `${label} by Payal Industries, Hubballi - photo ${i + 1}`,
    };
  });

export const workCategories = [
  {
    id: "aluminium-window",
    label: "Aluminium Windows",
    items: makeItems("work-aluminium-window", 10, "Aluminium window installation"),
  },
  {
    id: "upvc-window",
    label: "UPVC Windows",
    items: makeItems("work-upvc-window", 11, "UPVC window and door installation"),
  },
  {
    id: "aluminium-partition",
    label: "Office Partitions",
    items: makeItems("work-aluminium-partition", 10, "Aluminium glass office partition"),
  },
  {
    id: "glazing",
    label: "Glazing Work",
    items: makeItems("work-glazing", 10, "Structural glazing and glass facade"),
  },
  {
    id: "partition-door",
    label: "Partition Doors",
    items: makeItems("work-partition-door", 4, "Glass partition door"),
  },
  {
    id: "slim-window",
    label: "Slim Window Systems",
    items: makeItems("work-slim-window", 10, "Slim aluminium sliding window system"),
  },
  {
    id: "aluminium-window-sample",
    label: "Profile & Hardware Samples",
    items: makeItems("work-aluminium-window-sample", 12, "Aluminium window profile and hardware sample"),
  },
];
