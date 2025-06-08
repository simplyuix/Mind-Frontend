import { useState } from "react";
import { contentAPI } from '../../Api';

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onContentAdded?: () => void;
}

export function CreateContentModel({ open, onClose, onContentAdded }: CreateContentModalProps) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState<'twitter' | 'youtube'>('twitter');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await contentAPI.addContent({
                title,
                link,
                type
            });

           
            setTitle('');
            setLink('');
            setType('twitter');
            
          
            if (onContentAdded) {
                onContentAdded();
            }
            
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to add content. Please try again.');
            console.error('Error adding content:', err);
        } finally {
            setLoading(false);
        }
    };

    const detectContentType = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            setType('youtube');
        } else if (url.includes('twitter.com') || url.includes('x.com')) {
            setType('twitter');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
         
            <div 
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            
         
            <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 m-4 max-w-md w-full">
               
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Add Content</h2>
                    <button 
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold disabled:opacity-50"
                    >
                        ×
                    </button>
                </div>

             
                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                        {error}
                    </div>
                )}
                
               
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input 
                            type="text" 
                            required
                            disabled={loading}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a title for this content..."
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content Type
                        </label>
                        <select 
                            value={type}
                            onChange={(e) => setType(e.target.value as 'twitter' | 'youtube')}
                            disabled={loading}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        >
                            <option value="twitter">Twitter/X Post</option>
                            <option value="youtube">YouTube Video</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link
                        </label>
                        <input 
                            type="url" 
                            required
                            disabled={loading}
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                                detectContentType(e.target.value);
                            }}
                            placeholder={
                                type === 'youtube' 
                                    ? "https://www.youtube.com/watch?v=..." 
                                    : "https://twitter.com/user/status/..."
                            }
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            {type === 'youtube' 
                                ? "Paste a YouTube video URL" 
                                : "Paste a Twitter/X post URL"
                            }
                        </p>
                    </div>
                </form>
                
              
                <div className="flex justify-end space-x-3 mt-6">
                    <button 
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading || !title.trim() || !link.trim()}
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                        {loading && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {loading ? 'Adding...' : 'Add Content'}
                    </button>
                </div>
            </div>
        </div>
    );
}