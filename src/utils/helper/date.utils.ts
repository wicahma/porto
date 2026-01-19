import { ExperienceJob } from "@/interface/entities/experience.interface";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const formatDateRange = (
  start: string,
  end?: string,
  isCurrent?: boolean,
): string => {
  const startFormatted = formatDate(start);

  if (isCurrent) {
    return `${startFormatted} - Present`;
  }

  if (!end) {
    return startFormatted;
  }

  const endFormatted = formatDate(end);
  return `${startFormatted} - ${endFormatted}`;
};

export const calculateDuration = (start: string, end?: string): string => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.length > 0 ? parts.join(" ") : "Less than a month";
};

export const calculateTotalDuration = (jobs: ExperienceJob[]): string => {
  let totalMonths = 0;

  jobs.forEach((job) => {
    const startDate = new Date(job.start_date);
    const endDate = job.end_date ? new Date(job.end_date) : new Date();

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();

    totalMonths += years * 12 + months;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.length > 0 ? parts.join(" ") : "Less than a month";
};

export const getNewestJob = (jobs: ExperienceJob[]): ExperienceJob => {
  if (jobs.length === 0) {
    throw new Error("Cannot get newest job from empty array");
  }

  return jobs.reduce((newest, current) => {
    const newestDate = new Date(newest.start_date);
    const currentDate = new Date(current.start_date);
    return currentDate > newestDate ? current : newest;
  });
};
