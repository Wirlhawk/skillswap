// Application constants
export const APP_CONSTANTS = {
    // File upload limits
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
    MAX_FILE_SIZE_MB: 5,

    // Avatar dimensions
    PROFILE_AVATAR_SIZE: 14, // size-14 class
    EDIT_AVATAR_SIZE: 36, // h-36 w-36
    NAV_AVATAR_SIZE: 14, // size-14 class for navigation
    HERO_AVATAR_SIZE: 14, // size-14 class for hero section

    // Community info
    COMMUNITY_SIZE: "200+",

    // Form constraints
    TEXTAREA_MIN_HEIGHT: 140,

    // Supported file types
    SUPPORTED_IMAGE_TYPES: ["JPG", "PNG", "GIF"],

    // Date formatting
    DATE_FORMAT_OPTIONS: {
        day: 'numeric' as const,
        month: 'short' as const,
        year: 'numeric' as const
    }
} as const;
