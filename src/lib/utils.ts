// Small class-name combiner (avoids pulling in a dependency for this).
// Accepts any value; keeps only truthy strings so `cond && "cls"` guards are safe.
export function cn(...classes: unknown[]): string {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}
