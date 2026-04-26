import type { Production, Show } from "./types";

// 2-hour grace window — a show stays "upcoming" until 2hrs after its start time.
// After that it auto-archives to "past" (no manual edits needed).
const SHOW_GRACE_MS = 2 * 60 * 60 * 1000;

export function isShowUpcoming(show: Show): boolean {
  const showStart = new Date(show.date + "T" + show.time);
  const archiveAt = new Date(showStart.getTime() + SHOW_GRACE_MS);
  return archiveAt > new Date();
}

export function isShowPast(show: Show): boolean {
  const showStart = new Date(show.date + "T" + show.time);
  const archiveAt = new Date(showStart.getTime() + SHOW_GRACE_MS);
  return archiveAt <= new Date();
}

export function getPastShows(production: Production): Show[] {
  if (!production.shows) return [];
  return production.shows.filter(isShowPast).sort(
    (a, b) => new Date(b.date + "T" + b.time).getTime() - new Date(a.date + "T" + a.time).getTime()
  );
}

export function isNowPerforming(production: Production): boolean {
  if (!production.shows) return false;
  const now = new Date();
  return production.shows.some((show) => {
    const showDate = new Date(show.date + "T" + show.time);
    const showEnd = new Date(showDate.getTime() + 3 * 60 * 60 * 1000); // assume 3hr window
    return now >= new Date(show.date) && now <= showEnd;
  });
}

export function hasUpcomingShows(production: Production): boolean {
  if (!production.shows) return false;
  return production.shows.some(isShowUpcoming);
}

export function getUpcomingShows(production: Production): Show[] {
  if (!production.shows) return [];
  return production.shows.filter(isShowUpcoming).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getNowPerformingProductions(productions: Production[]): Production[] {
  return productions.filter(
    (p) => isNowPerforming(p) || hasUpcomingShows(p)
  );
}

export function formatShowDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatShowTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}
