import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

function FullBlog({ blog }: { blog: Blog }) {
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2"></div>
            <div className="pt-4">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-300 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="small" authorName={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-300">
                  Random catch phrase about the author's ability to grab users attention!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullBlog;
