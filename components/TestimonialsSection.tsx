import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testimonials = [
  {
    quote: "Working with this developer was a fantastic experience. They are highly skilled, communicative, and delivered a product that exceeded our expectations. I would highly recommend them to anyone looking for a top-notch developer.",
    name: "John Doe",
    title: "CEO, Example Inc."
  },
  {
    quote: "I was impressed by their attention to detail and their commitment to quality. They were able to take our vision and turn it into a reality, and we couldn\'t be happier with the final product.",
    name: "Jane Smith",
    title: "Marketing Manager, Another Company"
  },
  {
    quote: "Their expertise in modern web technologies is evident in the quality of their work. They are a true professional and a pleasure to work with.",
    name: "Peter Jones",
    title: "Lead Developer, Tech Solutions"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-6 md:py-8 glass-effect mb-12">
      <div className="container mx-auto px-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <h2 className="text-3xl md:text-4xl font-bold text-center w-full">What Others Are Saying</h2>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-white/30 dark:bg-slate-800 border border-slate-300/50 dark:border-transparent backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <blockquote className="italic text-base">“{testimonial.quote}”</blockquote>
                      <p className="mt-3 font-bold text-right text-sm">- {testimonial.name}, {testimonial.title}</p>
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

export default TestimonialsSection;