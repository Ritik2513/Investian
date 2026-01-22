const slugify = (...parts) => {
  return parts
    .filter(Boolean)
    .join(" ")                 // Combine all parts
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")  // Remove ALL special chars
    .replace(/\s+/g, "-");         // Convert spaces to hyphens
};

export default slugify;
