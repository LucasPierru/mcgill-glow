import Image from "next/image";
import { Post } from "@/types/post";
import BlogCard from "./blog-card/blog-card";

const Blog = () => {
  const posts: Post[] = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1453761816053-ed5ba727b5b7?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title:
        'Maama Watali x uOGlow: "Home for the Holidays" Fundraising Gala ✨ "À la maison pour les vacances" Gala de bienfaisance',
      author: {
        name: "John Doe",
        picture:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      date: "2023-10-01",
      readTime: 5,
      body: "Maama Watali is a Black-led organization dedicated to empowering Black women and their families as they navigate the journey of rebuilding their lives after experiencing loss and gender-based violence. Maama Watali aims to create a safe and nurturing environment where women and their children can heal, thrive, and regain their independence.",
      views: 100,
      likes: 10,
      comments: 2,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Second Blog Post",
      author: {
        name: "Jane Smith",
        picture:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      date: "2023-10-02",
      readTime: 8,
      body: "This is the body of the second blog post.",
      views: 100,
      likes: 10,
      comments: 2,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1520173043194-dc6b2a237fee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Third Blog Post",
      author: {
        name: "Alice Johnson",
        picture:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      date: "2023-10-03",
      readTime: 6,
      body: "This is the body of the third blog post.",
      views: 100,
      likes: 10,
      comments: 2,
    },
  ];
  return (
    <div>
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1613966802194-d46a163af70d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Beauty Background"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 w-full lg:w-1/2" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 text-center w-full lg:w-1/2">
          <div className="w-fit mx-auto text-left">
            <h1 className={`text-7xl text-white mb-6 font-playfair`}>BLOG</h1>
            <p className={`text-lg text-white mb-8 font-playfair`}>
              What have we been up to?
              <br />
              Stay tuned for our latest updates!
            </p>
          </div>
        </div>
      </section>
      <section className="my-8 lg:my-16 flex flex-col max-w-5xl mx-auto gap-4 lg:gap-8 px-4">
        <h2 className="text-lg mb-4">All Posts</h2>
        {posts.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </section>
    </div>
  );
};

export default Blog;
