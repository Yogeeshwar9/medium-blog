import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";

interface Posts{
  title: string;      
  content: string;  
  publishedDate: string;
  id: string;
  author: {
    name: string;
  };
}

function MyPosts() {
    const [allPosts,setAllPosts] = useState<Posts[]>([]);
    const [loading,setLoading] = useState(true);

    const deleteHandler = async (id:string)=>{
      const userid:string = await axios.delete(`${BACKEND_URL}/api/v1/delete`,{
        headers:{
          Authorization:localStorage.getItem('token')
        },data:{id}
      })
      setLoading(true)
      setAllPosts(allPosts.filter((post) => post.id !== userid))
      setLoading(false)
    }
    useEffect(()=>{
        const fetchAllPosts = async()=> {
            try {
                const userPosts = await axios.get<{userData:Posts[]}>(`${BACKEND_URL}/api/v1/blog/myPosts`,{
                  headers:{
                    Authorization:localStorage.getItem('token')
                  }
                });
                setAllPosts(userPosts.data.userData);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching posts:",error) 
            }
        }
        fetchAllPosts();
    },[allPosts])
  if(loading){
    return<div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
  }
  else{
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
          {allPosts.length === 0 ? (
            <div className="text-center">
             <h2 className="text-2xl font-bold">No Posts Yet</h2>
            </div>
          ) :  ( allPosts.map((post) => (
            <div key={post.id} className="flex justify-between">
              <BlogCard 
                authorName={post.author.name || "Anonymous"} 
                publishedDate={"2nd Feb 2025"} 
                title={post.title}
                content={post.content} 
                id={post.id}
              />
              <div className="flex flex-col justify-center">
                <div>
                  <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={()=>{deleteHandler(post.id)}}>
                    delete
                  </button>
                </div>
              </div>
            </div>
          )))}
          </div>
        </div>
        
      </div>
    )
  }
}

export default MyPosts
