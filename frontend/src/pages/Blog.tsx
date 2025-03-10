//mport React from 'react'

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import Appbar from "../components/Appbar";
function Blog() {
  const {id} = useParams();
  const {loading,blog} = useBlog({id:id||""});

  if(blog){
    return <div><FullBlog blog={blog}/></div>
  }
  else{
    if(loading){
      return <div>
        <Appbar/>
            <div className="h-screen flex flex-col justify-center">  
              <div className="flex justify-center">
                <Spinner />
              </div>
            </div>
      </div>
    }
  }
}

export default Blog
