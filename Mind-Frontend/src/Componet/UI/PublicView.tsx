import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../UI/Card';
import { brainAPI } from '../../Api';


interface ContentResponse {
    _id: string;
    title: string;
    link: string;
    type: 'twitter' | 'youtube';
    userId: string;
    tags: string[];
}

interface SharedBrainData {
    username: string;
    content: ContentResponse[];
}

export function PublicBrainView() {
    const { shareLink } = useParams<{ shareLink: string }>();
    const [brainData, setBrainData] = useState<SharedBrainData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (shareLink) {
            fetchSharedBrain(shareLink);
        }
    }, [shareLink]);

    const fetchSharedBrain = async (hash: string) => {
        try {
            setLoading(true);
            const data = await brainAPI.getSharedBrain(hash);
            setBrainData(data);
        } catch (err: any) {
            console.error('Error fetching shared brain:', err);
            setError('This brain link is invalid or has been removed.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading shared brain...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🧠</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Brain Not Found</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <a 
                        href="/signin" 
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Go to Brain.ly
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
         
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">🧠</span>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {brainData?.username}'s Brain
                                </h1>
                                <p className="text-sm text-gray-500">Public collection</p>
                            </div>
                        </div>
                        <a 
                            href="/signin" 
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Create Your Own Brain
                        </a>
                    </div>
                </div>
            </div>

           
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {brainData?.content && brainData.content.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Shared Content ({brainData.content.length} items)
                            </h2>
                            <p className="text-gray-600">
                                Explore {brainData.username}'s curated collection of content
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {brainData.content.map((item) => (
                                <Card
                                    key={item._id}
                                    title={item.title}
                                    link={item.link}
                                    type={item.type}
                                    
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No content shared</h3>
                        <p className="text-gray-600">
                            {brainData?.username} hasn't shared any content in their brain yet.
                        </p>
                    </div>
                )}
            </div>

         
            <div className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-500">
                        <p>Powered by <span className="font-semibold">Brain.ly</span> - Your Second Brain</p>
                    </div>
                </div>
            </div>
        </div>
    );
}