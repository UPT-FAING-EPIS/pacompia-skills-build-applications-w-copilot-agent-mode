export function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function buildResourceEndpoint(resource) {
  return `${getApiBaseUrl()}/${resource}/`;
}

export function normalizeApiResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  if (data && Array.isArray(data.data)) {
    return data.data;
  }

  return data ? [data] : [];
}

export function formatRecord(record) {
  if (record === null || record === undefined) {
    return 'Empty record';
  }

  if (typeof record === 'string' || typeof record === 'number' || typeof record === 'boolean') {
    return String(record);
  }

  return JSON.stringify(record, null, 2);
}

function getRecordValue(record, keys) {
  for (const key of keys) {
    const value = record?.[key];

    if (value !== null && value !== undefined && value !== '') {
      return String(value);
    }
  }

  return '';
}

export function getRecordTitle(record, fallbackLabel) {
  if (record === null || record === undefined) {
    return fallbackLabel;
  }

  if (typeof record !== 'object') {
    return String(record);
  }

  const title = getRecordValue(record, [
    'name',
    'title',
    'username',
    'full_name',
    'display_name',
    'team_name',
    'activity_name',
    'workout_name',
    'label',
  ]);

  return title || fallbackLabel;
}

export function getRecordSummary(record) {
  if (record === null || record === undefined) {
    return 'No details available';
  }

  if (typeof record !== 'object') {
    return String(record);
  }

  const summary = getRecordValue(record, [
    'description',
    'summary',
    'details',
    'notes',
    'status',
    'type',
    'level',
    'category',
  ]);

  if (summary) {
    return summary;
  }

  const fallbackPairs = Object.entries(record)
    .filter(([key, value]) => key !== 'id' && value !== null && value !== undefined && value !== '')
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`);

  return fallbackPairs.length ? fallbackPairs.join(' | ') : 'No details available';
}

export function getRecordFacts(record) {
  if (record === null || record === undefined || typeof record !== 'object') {
    return [];
  }

  return Object.entries(record)
    .filter(([key, value]) => key !== 'id' && value !== null && value !== undefined && value !== '')
    .slice(0, 4)
    .map(([key, value]) => ({
      label: key.replace(/_/g, ' '),
      value: typeof value === 'object' ? formatRecord(value) : String(value),
    }));
}

export function getSearchableText(record) {
  return formatRecord(record).toLowerCase();
}