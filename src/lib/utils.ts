import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))



export function formatDate(date: Date) {
	const zonedDate = toZonedTime(date, 'America/Lima');
	return format(zonedDate, 'dd-MM-yyyy HH:mm');
}