import React, { useEffect, useState } from 'react';
import { Post } from '@/utils/types';
import Person from '@/components/Person';

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }:Props) => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/posts');
      const jsonData = await response.json();

      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <main className="main_container">
      <div className="input_container">
        <div className="the_post">
          <textarea placeholder="say something..." />
        </div>
        <div className="post_button">
          <input type="submit" value="Post" className="create_post_submit" />
        </div>
      </div>
      <div className="main_posts">
        {data.map((post: Post) => {
            return (
                <div key={post.id} className="post_content">
                    <Person username = {post.username}/>
                    <p>{post.content}</p>
                    <div className="post_content_bottom">
                        <span>{post.date}</span>
                    </div>
                </div>
            )
        })}
      </div>
    </main>
  );
};

export default Posts;