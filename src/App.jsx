import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
    axios.get('https://honeykpatel.pythonanywhere.com/reddit')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  };
    fetchPosts(); // Fetch immediately

    const interval = setInterval(fetchPosts, 30000); // Fetch every 30 sec

    return () => clearInterval(interval); // Cleanup on unmount
}, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">r/MontagneParfums - New Posts</h1>
            <div className="space-y-4">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex">
                        {/* Left side (Voting UI - Placeholder) */}
                        <div className="flex flex-col items-center pr-4">
                            <button className="text-gray-400 hover:text-orange-500">🔼</button>
                            <span className="text-gray-700 font-semibold">{post.upvotes}</span> {/* Placeholder votes */}
                            <button className="text-gray-400 hover:text-blue-500">🔽</button>
                        </div>
                        
                        {/* Right side (Post Content) */}
                        <div className="flex-1">
                            <a href={post.url} target="_blank" rel="noopener noreferrer" 
                               className="text-lg font-semibold text-blue-600 hover:underline">
                                {post.title}
                            </a>
                            <p className="text-gray-500 text-sm mt-1">Posted by u/{post.author}r</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

};

export default App;
