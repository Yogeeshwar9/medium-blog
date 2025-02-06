import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;      
  content: string;  
  publishedDate: string;
  id: string;        
}

export function Avatar({ authorName, size = 'small' }: { authorName: string; size?: "small" | "big" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`${size === "small" ? "text-sm leading-6" : "text-lg leading-9"} text-gray-600 dark:text-white flex items-center justify-center`}>
        {authorName[0]}
      </span>
    </div>
  );
}


function BlogCard({ authorName, title, content, publishedDate, id }: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar authorName={authorName} size="small" />
          <div className="font-light pl-2 text-sm flex flex-col justify-center ">{authorName}</div>
          <div className="font-thin pl-2 text-sm flex flex-col justify-center ">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2">
          {title}
        </div>
        <div className="text-xl font-thin">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-2">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
