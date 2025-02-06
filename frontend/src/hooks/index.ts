import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: String;
  title: String;
  id: String;
  author: {
    name: String;
  };
}

export const useBlog = ({ id }: { id: String }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | undefined>(undefined); // Handle undefined explicitly

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog); // Ensure the property is `blog` not `blogs`
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch blog:", error);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("hi");
        const token = localStorage.getItem("token") ;
        console.log("Fetching blogs with token:", token);
        console.log("Request URL:", `${BACKEND_URL}/api/v1/blog/bulk`)
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.blogs);
        
        setBlogs(response.data.blogs); // Make sure response.data contains 'blogs'
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};
