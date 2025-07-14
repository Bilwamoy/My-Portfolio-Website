import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const blogPosts = [
  {
    title: "The Importance of a Strong Online Presence",
    content: "In today's digital age, a strong online presence is crucial for any business. It allows you to reach a wider audience, build brand awareness, and connect with your customers on a more personal level.",
    image: "/blog/image1.jpg",
    date: "2023-10-26",
    author: "Alex Doe"
  },
  {
    title: "5 Tips for Creating Engaging Content",
    content: "Engaging content is key to keeping your audience interested and coming back for more. Here are 5 tips to help you create content that resonates with your audience: 1. Know your audience, 2. Tell a story, 3. Use visuals, 4. Be consistent, 5. Encourage interaction.",
    image: "/blog/image2.jpg",
    date: "2023-11-15",
    author: "Jane Smith"
  },
  {
    title: "How to Use Social Media to Grow Your Business",
    content: "Social media is a powerful tool that can help you grow your business. By creating a strong social media presence, you can connect with potential customers, build relationships, and drive sales.",
    image: "/blog/image3.jpg",
    date: "2023-12-01",
    author: "John Appleseed"
  }
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-6 md:py-8 bg-background text-foreground glass-effect mb-12">
      <div className="container mx-auto px-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <h2 className="text-3xl md:text-4xl font-bold text-center w-full text-primary">From the Blog</h2>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="bg-background border-border rounded-lg overflow-hidden shadow-lg">
                    <Image src={post.image} alt={`Blog post image for ${post.title}`} width={400} height={225} className="w-full h-48 object-cover"/>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{post.content}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-muted-foreground text-xs">{post.date}</p>
                        <p className="text-muted-foreground text-xs">By {post.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default BlogSection;