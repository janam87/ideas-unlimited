import type { Production, Show } from "./types";

export function isShowUpcoming(show: Show): boolean {
  const showDate = new Date(show.date + "T" + show.time);
  return showDate > new Date();
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
