const generateQuery = (base: string, query: Record<string, unknown>) =>
  encodeURI(
    `${base}${Object.entries(query)
      .reduce(
        (accumulator, [key, value]) =>
          typeof value === "undefined"
            ? accumulator
            : `${accumulator}${key}=${value}&`,
        "?"
      )
      .slice(0, -1)}`
  );

export default generateQuery;
