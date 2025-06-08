import { Shareicon } from '../../icon/shareicon';
import { contentAPI } from '../../Api';

interface CardComponent {
    id?: string;         
    title: string;
    type: "twitter" | "youtube";
    link: string;
    onDelete?: () => void; 
}

const basicStyle = "bg-white rounded-md p-4 shadow-md outline-slate-200 border-gray-100 m-8 max-w-72";

export function Card(props: CardComponent) {
    const handleDelete = async () => {
        if (!props.id) return;
        
        const confirmDelete = window.confirm('Are you sure you want to delete this content?');
        if (!confirmDelete) return;

        try {
            await contentAPI.deleteContent(props.id);
            if (props.onDelete) {
                props.onDelete();
            }
        } catch (error) {
            console.error('Error deleting content:', error);
            alert('Failed to delete content. Please try again.');
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(props.link);
        alert('Link copied to clipboard!');
    };

    return (
        <div className={`${basicStyle}`}>
            <div className="flex justify-between items-center">
                <div className='flex my-4 items-center'>
                    <Shareicon />
                    <span className='ml-2'>{props.title}</span>
                </div>
                <div className='flex pr-2 gap-2'>
                   
                    <button 
                        onClick={handleShare}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Copy link"
                    >
                        <Shareicon />
                    </button>
                    
                   
                    {props.id && (
                        <button 
                            onClick={handleDelete}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                            title="Delete content"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <div className='pt-6'>
               
                {props.type === 'youtube' && (
                    <iframe width="560" height="315" src={`${props.link}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
                        
                       
                )}
                
               
                {props.type === 'twitter' && (
                    <blockquote className="twitter-tweet">
                        <a href={props.link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>
                )}
            </div>
        </div>
    );
}