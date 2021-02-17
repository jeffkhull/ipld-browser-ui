import { utc } from 'moment'
export function changeme() {}

/**
 * takes date in yyyy-MM-ddTHH:mm:ss.ffffff
 * 2020-02-25T13:52:54.238983
 */
export function getRelativeReadableDate(input: string): string {
  return utc(input, 'YYYY-MM-DD HH:mm:ss.SSSSSS').fromNow()
}
