// GitHub repo configuration
const GITHUB_OWNER = "nicholasmanha";
const GITHUB_REPO = "AD_ADL_files";
const GITHUB_BRANCH = "main";

// Cache for ADL files to avoid repeated fetches
const adlCache = new Map<string, string>();

// localStorage key prefix for ADL files
const STORAGE_PREFIX = "adl_file_";

export const fetchFile = async (fileName: string, owner: string, repo: string): Promise<string | null> => {

    // Check in-memory cache first
    if (adlCache.has(fileName)) {
        return adlCache.get(fileName)!;
    }

    // Check localStorage
    const storageKey = `${STORAGE_PREFIX}${fileName}`;
    const cachedContent = localStorage.getItem(storageKey);

    if (cachedContent) {
        // Store in memory cache for faster access during this session
        adlCache.set(fileName, cachedContent);
        return cachedContent;
    }

    try {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${GITHUB_BRANCH}/${fileName}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Failed to fetch ${fileName}: ${response.status}`);
            return null;
        }

        const content = await response.text();

        // Store in both caches
        adlCache.set(fileName, content);
        try {
            localStorage.setItem(storageKey, content);
        } catch (storageError) {
            console.warn(`Failed to save ${fileName} to localStorage:`, storageError);
            // Continue execution even if localStorage fails
        }

        return content;
    } catch (error) {
        console.error(`Error fetching ADL file ${fileName}:`, error);
        return null;
    }
};

export const clearADLCache = () => {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    adlCache.clear();
};