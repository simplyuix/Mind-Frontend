interface SidebarProps {
    onSignOut?: () => void;
}

export function Sidebar({ onSignOut }: SidebarProps) {
    const username = localStorage.getItem('username') || 'User';

    return (
        <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 shadow-sm z-40">
            <div className="p-6 h-full flex flex-col">
               
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <span className="text-2xl mr-2">🧠</span>
                        Brain
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, {username}!</p>
                </div>
                
             
                <nav className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-700 cursor-pointer">
                        <span className="text-gray-600">📋</span>
                        <span className="font-medium">All Content</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <span className="text-gray-600">🐦</span>
                        <span className="text-gray-700">Twitter</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <span className="text-gray-600">📺</span>
                        <span className="text-gray-700">YouTube</span>
                    </div>
                   
                </nav>
                
              
                <div className="border-t pt-4">
                    <div className="text-sm text-gray-500 mb-3">
                        <p>Need help?</p>
                        <p className="text-blue-600 hover:text-blue-700 cursor-pointer">Contact Support</p>
                    </div>
                    
                  
                    {onSignOut && (
                        <button
                            onClick={onSignOut}
                            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                        >
                            <span>🚪</span>
                            <span className="font-medium">Sign Out</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}