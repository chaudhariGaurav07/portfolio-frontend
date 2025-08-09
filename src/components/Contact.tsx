import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { contactAPI } from "@/lib/api";
import { ContactForm as ContactFormType } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "gauravchaudhari7717@example.com",
    href: "mailto:gauravchaudhari7717@example.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 866 844 9187",
    href: "tel:+918668449187",
  },
];

const platforms = [
  { name: "GitHub", url: "https://github.com/chaudhariGaurav07" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gaurav-chaudhari-b20176227/",
  },
  { name: "Twitter", url: "https://x.com/GauravChau364" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);

    try {
      const result = await contactAPI.send(data);

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
          variant: "default",
        });
        reset();
      } else {
        throw new Error(result.message);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss your next project or just say hello!
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 px-4"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Let's Connect
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a conversation about technology and
                development.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center space-x-4 p-3 sm:p-4 card-3d group-hover:shadow-3d-hover transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">
                        {info.label}
                      </h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-4 sm:p-6 card-3d"
            >
              <h4 className="font-semibold mb-3 sm:mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {platforms.map(({ name, url }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-xs sm:text-sm font-medium"
                  >
                    {name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-4"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-3d p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Send Message
              </h3>

              {/* Name */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Your full name"
                  className="bg-input/50 border-border/50 focus:border-primary text-sm sm:text-base"
                />
                {errors.name && (
                  <div className="flex items-center space-x-1 text-destructive text-xs sm:text-sm">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{errors.name.message}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@example.com"
                  className="bg-input/50 border-border/50 focus:border-primary text-sm sm:text-base"
                />
                {errors.email && (
                  <div className="flex items-center space-x-1 text-destructive text-xs sm:text-sm">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell me about your project or just say hello..."
                  rows={4}
                  className="bg-input/50 border-border/50 focus:border-primary resize-none text-sm sm:text-base"
                />
                {errors.message && (
                  <div className="flex items-center space-x-1 text-destructive text-xs sm:text-sm">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{errors.message.message}</span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-3d py-2 sm:py-3 text-sm sm:text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
