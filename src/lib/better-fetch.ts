/**
 * A utility wrapper around fetch with better typing and error handling
 */
export async function betterFetch<T>(
  url: string,
  options?: RequestInit & { baseURL?: string }
): Promise<{ data: T | null; error?: Error }> {
  try {
    const { baseURL, ...fetchOptions } = options || {};
    const fullUrl = baseURL ? `${baseURL}${url}` : url;

    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error: error as Error };
  }
}