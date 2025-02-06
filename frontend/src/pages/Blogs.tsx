import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

function Blogs() {
    const {loading,blogs} = useBlogs();
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
  return (
    <>
        <Appbar/>
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard 
                    authorName={blog.author.name||"Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2025"}
                    id={blog.id}
                />)}
            </div>
        </div>
    </>
    
  )
}

export default Blogs
