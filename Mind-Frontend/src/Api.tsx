
const API_BASE_URL = 'http://localhost:3000/api/v1';


const getAuthToken = () => {
    return localStorage.getItem('authToken');
};


const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'authorization': token }) 
    };
};

export interface SignUpData {
    username: string;
    password: string;
}

export interface SignInData {
    username: string;
    password: string;
}

export interface ContentData {
    title: string;
    link: string;
    type: 'twitter' | 'youtube';
}

export interface ContentResponse {
    _id: string;
    title: string;
    link: string;
    type: 'twitter' | 'youtube';
    userId: string;
    tags: string[];
}


export const authAPI = {
    signUp: async (data: SignUpData) => {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Sign up failed');
        }
        
        return response.json();
    },

    signIn: async (data: SignInData) => {
        const response = await fetch(`${API_BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Sign in failed');
        }
        
        const result = await response.json();
        
      
        if (result.token) {
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('username', result.username);
        }
        
        return result;
    },

    signOut: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
    },

    isAuthenticated: () => {
        return !!getAuthToken();
    }
};


export const contentAPI = {
    getContent: async (): Promise<{ content: ContentResponse[] }> => {
        const response = await fetch(`${API_BASE_URL}/content`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }
        
        return response.json();
    },

    addContent: async (data: ContentData) => {
        const response = await fetch(`${API_BASE_URL}/content`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error('Failed to add content');
        }
        
        return response.json();
    },

    deleteContent: async (contentId: string) => {
        const response = await fetch(`${API_BASE_URL}/content`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({ contentId }), 
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete content');
        }
        
        return response.json();
    }
};


export const brainAPI = {
    shareBrain: async (share: boolean) => { 
        const response = await fetch(`${API_BASE_URL}/brain/share`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ share }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to share brain');
        }
        
        return response.json();
    },

    getSharedBrain: async (shareLink: string) => {
        const response = await fetch(`${API_BASE_URL}/brain/${shareLink}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch shared brain');
        }
        
        return response.json();
    }
};