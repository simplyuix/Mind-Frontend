
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Componet/UI/Button'
import { Card } from './Componet/UI/Card'
import { Addicon } from './icon/addIcon'
import { Shareicon } from './icon/shareicon'
import { CreateContentModel } from './Componet/UI/CreateComponet'
import { Sidebar } from './Componet/UI/Sidebar';

import { contentAPI, brainAPI, authAPI } from './Api';

interface ContentResponse {
    _id: string;
    title: string;
    link: string;
    type: 'twitter' | 'youtube';
    userId: string;
    tags: string[];
}

export function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState<ContentResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [shareLink, setShareLink] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    
    const navigate = useNavigate();

   
    useEffect(() => {
        if (!authAPI.isAuthenticated()) {
            navigate('/signin');
            return;
        }
        
        fetchContent();
    }, [navigate]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await contentAPI.getContent();
            setContent(response.content);
        } catch (err: any) {
            console.error('Error fetching content:', err);
            setError('Failed to load content. Please try refreshing the page.');
            
           
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                authAPI.signOut();
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleContentAdded = () => {
       
        fetchContent();
        setIsModalOpen(false);
    };

    const handleShareBrain = async () => {
        try {
            setIsSharing(true);
            const response = await brainAPI.shareBrain(true);
            setShareLink(`${window.location.origin}/brain/${response.hash}`);
        } catch (err: any) {
            console.error('Error sharing brain:', err);
            alert('Failed to share brain. Please try again.');
        } finally {
            setIsSharing(false);
        }
    };

    const handleSignOut = () => {
        authAPI.signOut();
        navigate('/signin');
    };

    const handleDeleteContent = async (contentId: string) => {
        try {
            await contentAPI.deleteContent(contentId);
            fetchContent(); 
        } catch (err: any) {
            console.error('Error deleting content:', err);
            alert('Failed to delete content. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
           
            <Sidebar onSignOut={handleSignOut} />
            
         
            <CreateContentModel 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onContentAdded={handleContentAdded}
            />
            
           
            <div className="ml-72 p-6">
               
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Content</h1>
                        <p className="text-gray-600">Welcome back! You have {content.length} items saved.</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button
                            variant='primary'
                            size='md'
                            text={isSharing ? "Sharing..." : "Share Brain"}
                            startIcon={<Shareicon/>}
                            onClick={handleShareBrain}
                            disabled={isSharing}
                        />
                        <Button
                            variant='secondary'
                            size='md'
                            text="Add Content"
                            startIcon={<Addicon/>}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>

            
                {shareLink && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-blue-800">Brain Shared Successfully!</h3>
                                <p className="text-sm text-blue-600 mt-1">Share this link with others:</p>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shareLink);
                                    alert('Link copied to clipboard!');
                                }}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                Copy Link
                            </button>
                        </div>
                        <div className="mt-2 p-2 bg-white rounded border text-sm font-mono break-all">
                            {shareLink}
                        </div>
                    </div>
                )}

               
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                        <button
                            onClick={fetchContent}
                            className="ml-2 underline hover:no-underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}
                
              
                {content.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.map((item) => (
                            <Card
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                link={item.link}
                                type={item.type}
                                onDelete={() => handleDeleteContent(item._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🧠</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
                        <p className="text-gray-600 mb-6">Start building your second brain by adding your first piece of content!</p>
                        <Button
                            variant='primary'
                            size='md'
                            text="Add Your First Content"
                            startIcon={<Addicon/>}
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}