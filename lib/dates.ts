// lib/dates.ts

/**
 * Formatează o dată în ro-RO.
 * Acceptă fie ISO string, fie Date.
 * withTime = true -> include HH:MM (Europe/Bucharest)
 */
export function formatDateRo(input: string | Date, withTime = false) {
  const d = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("ro-RO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: "Europe/Bucharest",
  }).format(d);
}

/** Compat: alias pentru codul existent care cerea formatDateISOtoRo */
export function formatDateISOtoRo(iso: string, withTime = false) {
  return formatDateRo(iso, withTime);
}

/** Opțional: utilitar dacă ai nevoie de Date din ISO */
export function parseISO(iso: string): Date {
  return new Date(iso);
}
