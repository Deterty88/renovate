import { api as pep440 } from '../pep440';
import { api as poetry } from '../poetry';
import type { NewValueConfig, VersioningApi } from '../types';

export const id = 'python';
export const displayName = 'Python';
export const urls = [];
export const supportsRanges = false;

function isLessThanRange(version: string, range: string): boolean {
  return poetry.isValid(range)
    ? poetry.isLessThanRange!(version, range)
    : pep440.isLessThanRange!(version, range);
}

function isValid(input: string): boolean {
  return poetry.isValid(input) || pep440.isValid(input);
}

function matches(version: string, range: string): boolean {
  return poetry.isValid(range)
    ? poetry.matches(version, range)
    : pep440.matches(version, range);
}

function getSatisfyingVersion(
  versions: string[],
  range: string,
): string | null {
  return poetry.isValid(range)
    ? poetry.getSatisfyingVersion(versions, range)
    : pep440.getSatisfyingVersion(versions, range);
}

function minSatisfyingVersion(
  versions: string[],
  range: string,
): string | null {
  return poetry.isValid(range)
    ? poetry.minSatisfyingVersion(versions, range)
    : pep440.minSatisfyingVersion(versions, range);
}

function getNewValue(newValue: NewValueConfig): string | null {
  return poetry.getNewValue(newValue);
}

function subset(subRange: string, superRange: string): boolean | undefined {
  return poetry.isValid(subRange) && poetry.isValid(superRange)
    ? poetry.subset!(subRange, superRange)
    : undefined;
}

export function isBreaking(current: string, version: string): boolean {
  const currentMajor = poetry.getMajor(current);
  const currentMinor = poetry.getMinor(current);
  const newMajor = poetry.getMajor(version);
  const newMinor = poetry.getMinor(version);
  return !(currentMajor === newMajor && currentMinor === newMinor);
}

export const api: VersioningApi = {
  ...poetry,
  getNewValue,
  getSatisfyingVersion,
  isBreaking,
  isLessThanRange,
  isValid,
  matches,
  minSatisfyingVersion,
  subset,
};
export default api;
