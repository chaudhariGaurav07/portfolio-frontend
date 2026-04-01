import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { contactAPI } from "@/lib/api";
import { ContactForm as ContactFormType } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactInfo = [
  { icon: Mail, label: "SRC_MAIL", value: "gauravchaudhari7717@example.com", href: "mailto:gauravchaudhari7717@example.com", color: "#00F5FF" },
  { icon: MapPin, label: "SRC_NODE", value: "India", href: null, color: "#00FF41" },
  { icon: Phone, label: "SRC_PORT", value: "+91 866 844 9187", href: "tel:+918668449187", color: "#0786D8" },
];

const platforms = [
  { name: "GITHUB", url: "https://github.com/chaudhariGaurav07", color: "#E8EDF3" },
  { name: "LINKEDIN", url: "https://www.linkedin.com/in/gaurav-chaudhari-b20176227/", color: "#0786D8" },
  { name: "TWITTER", url: "https://x.com/GauravChau364", color: "#00F5FF" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);
    try {
      const result = await contactAPI.send(data);
      if (result.success) {
        toast({ title: "Packet Sent!", description: result.message });
        reset();
      } else {
        throw new Error(result.message);
      }
    } catch {
      toast({ title: "Transmission Error", description: "Failed to send. Please retry.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding grid-bg relative overflow-hidden">
      {/* @ symbol decorative */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[20rem] font-bold select-none pointer-events-none hidden lg:block"
        style={{ color: 'rgba(0,245,255,0.025)', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>
        @
      </div>

      <div className="container-custom relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'rgba(0,245,255,0.5)' }}>
            nc -l 8080 -k
          </p>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl tracking-wider" style={{ color: '#E8EDF3' }}>
            INITIATE_<span style={{ color: '#00F5FF' }}>HANDSHAKE</span>
          </h2>
          <p className="font-mono text-sm mt-2" style={{ color: 'rgba(232,237,243,0.4)' }}>
            Send a packet to establish a persistent connection. Response latency: typically {'<'} 24h.
          </p>
          <div className="h-px mt-3 w-36" style={{ background: 'linear-gradient(90deg, #00F5FF, transparent)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Contact info items */}
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15, margin: "-60px" }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-200 group"
                  style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.1)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${info.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${info.color}15`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}>
                    <info.icon className="w-4 h-4" style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs mb-1" style={{ color: 'rgba(0,245,255,0.4)' }}>{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="font-mono text-sm transition-colors duration-200"
                        style={{ color: 'rgba(232,237,243,0.7)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = info.color)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,243,0.7)')}>
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-mono text-sm" style={{ color: 'rgba(232,237,243,0.7)' }}>{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15, margin: "-60px" }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 rounded-lg"
              style={{ background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.1)' }}
            >
              <p className="font-mono text-xs mb-3" style={{ color: 'rgba(0,245,255,0.4)' }}>OPEN_CHANNELS</p>
              <div className="flex flex-wrap gap-2">
                {platforms.map(({ name, url, color }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3 py-1.5 rounded font-mono text-xs font-semibold transition-all duration-200"
                    style={{ color, background: `${color}10`, border: `1px solid ${color}30` }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}30`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
                  >
                    {name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 rounded-lg space-y-6"
              style={{
                background: 'rgba(13,17,23,0.8)',
                border: '1px solid rgba(0,245,255,0.15)',
                boxShadow: '0 0 40px rgba(0,245,255,0.05)'
              }}
            >
              {/* SRC_NAME */}
              <div className="space-y-2">
                <label className="font-mono text-xs" style={{ color: 'rgba(0,245,255,0.5)' }}>
                  SRC_NAME
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-2 font-mono text-xs" style={{ color: '#00FF41' }}>{'>'}</span>
                  <input
                    {...register("name")}
                    placeholder="identity.val"
                    className="w-full bg-transparent font-mono text-sm outline-none pl-4 py-2"
                    style={{
                      color: '#00F5FF',
                      borderBottom: '1px solid rgba(0,245,255,0.2)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#00F5FF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)')}
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1 font-mono text-xs" style={{ color: '#FF5F57' }}>
                    <AlertCircle className="w-3 h-3" />{errors.name.message}
                  </div>
                )}
              </div>

              {/* SRC_EMAIL */}
              <div className="space-y-2">
                <label className="font-mono text-xs" style={{ color: 'rgba(0,245,255,0.5)' }}>
                  SRC_ADDR
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-2 font-mono text-xs" style={{ color: '#00FF41' }}>{'>'}</span>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="remote.addr"
                    className="w-full bg-transparent font-mono text-sm outline-none pl-4 py-2"
                    style={{
                      color: '#00F5FF',
                      borderBottom: '1px solid rgba(0,245,255,0.2)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#00F5FF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)')}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1 font-mono text-xs" style={{ color: '#FF5F57' }}>
                    <AlertCircle className="w-3 h-3" />{errors.email.message}
                  </div>
                )}
              </div>

              {/* PAYLOAD */}
              <div className="space-y-2">
                <label className="font-mono text-xs" style={{ color: 'rgba(0,245,255,0.5)' }}>
                  PAYLOAD
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-2 font-mono text-xs" style={{ color: '#00FF41' }}>{'>'}</span>
                  <textarea
                    {...register("message")}
                    placeholder="enter message body..."
                    rows={4}
                    className="w-full bg-transparent font-mono text-sm outline-none pl-4 py-2 resize-none"
                    style={{
                      color: '#00F5FF',
                      borderBottom: '1px solid rgba(0,245,255,0.2)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#00F5FF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)')}
                  />
                </div>
                {errors.message && (
                  <div className="flex items-center gap-1 font-mono text-xs" style={{ color: '#FF5F57' }}>
                    <AlertCircle className="w-3 h-3" />{errors.message.message}
                  </div>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded font-mono font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  background: isSubmitting ? 'rgba(0,245,255,0.1)' : 'linear-gradient(135deg, #00F5FF, #00FF41)',
                  color: isSubmitting ? '#00F5FF' : '#0D1117',
                  border: isSubmitting ? '1px solid rgba(0,245,255,0.3)' : 'none',
                  boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(0,245,255,0.3)',
                  letterSpacing: '0.08em'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    ▶ EXEC_SEND
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
