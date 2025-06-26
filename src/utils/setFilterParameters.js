const ALLOW_FILTER_PARAMS = ['name', 'type', 'gender', 'species', 'status'];

export function setFilterParameters(prevUrl) {
  const urlWithFilterParams = new URL(prevUrl);
  const query = new URLSearchParams(window.location.search);

  urlWithFilterParams.search = '';

  for (const [key, value] of query.entries()) {
    if (ALLOW_FILTER_PARAMS.includes(key)) {
      urlWithFilterParams.searchParams.set(key, value);
    }
  }

  return urlWithFilterParams;
}
