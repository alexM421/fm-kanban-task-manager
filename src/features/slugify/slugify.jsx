import React from "react";


export default function slugify(str) {
  return str
    .toLowerCase()                    // Make lowercase
    .trim()                           // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, '')     // Remove non-alphanumeric (except space/hyphen)
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/-+/g, '-');             // Collapse multiple hyphens
}