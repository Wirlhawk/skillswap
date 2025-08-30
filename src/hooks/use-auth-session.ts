'use client';

import { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client";

// Define a type for the session user for better type safety
interface SessionUser {
    id: string;
    name?: string | null;
    email?: string | null;
    // Add any other user properties you expect in the session
}

interface Session {
    user: SessionUser | null;
}

export const useAuthSession = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const data = await authClient.getSession();
                setSession(data);
            } catch (error) {
                console.error('Failed to fetch session', error);
                setSession(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    return { session, isLoading };
};
