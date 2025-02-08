import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

function Appbar() {
  const userName = localStorage.getItem("name") || "User";
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
        Medium
      </Link>
      <div className="flex">
        <Link to={'/myPosts'}>
          <div>          
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-2">myPosts</button>
          </div>
        </Link>
        <Link to={'/publish'}>
          <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-2">New Blog</button>
        </Link>
        <Avatar authorName={userName} size={'big'}/>
      </div>
    </div>
  )
}

export default Appbar
