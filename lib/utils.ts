import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`; // Need this because stripe needs to know the absolute URL where the site
                                                      //is hosted since it can go to Settings or Dashboard so it can go back to our website
}