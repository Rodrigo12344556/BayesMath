import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTitle } from '../AnimatedTitle';
import { ParticleBackground } from '../ParticleBackground';
import { useListSocialLinks } from '@workspace/api-client-react';
import { SiTiktok, SiInstagram, SiYoutube, SiX, SiFacebook } from 'react-icons/si';
import { Linkedin } from 'lucide-react';

const platformIcons: Record<string, React.ElementType> = {
  'instagram': SiInstagram,
  'youtube': SiYoutube,
  'tiktok': SiTiktok,
  'twitter': SiX,
  'x': SiX,
  'linkedin': Linkedin,
  'facebook': SiFacebook,
  'Instagram': SiInstagram,
  'YouTube': SiYoutube,
  'TikTok': SiTiktok,
  'Twitter': SiX,
  'X': SiX,
  'LinkedIn': Linkedin,
  'Facebook': SiFacebook
};

const getPlatformGradient = (platform: string, fallbackColor: string) => {
  if (platform.toLowerCase() === 'instagram') {
    return 'linear-gradient(45deg, #405de6, #5b51db, #b33ab4, #c135b4, #e1306c, #fd1f1f)';
  }
  return fallbackColor;
};

export const SocialSection: React.FC = () => {
  const { data: socialLinks, isLoading } = useListSocialLinks();

  return (
    <section id="redes" className="relative py-32 bg-background overflow-hidden border-t border-white/5">
      <ParticleBackground density={20} colors={['#7b2fff']} speedMultiplier={0.3} />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-16 flex flex-col items-center">
          <AnimatedTitle text="CONECTA CON NOSOTROS" className="text-4xl md:text-5xl lg:text-6xl text-white font-poppins justify-center" />
          <div className="w-24 h-1 bg-secondary mt-6 rounded-full shadow-[0_0_10px_rgba(55,0,255,0.5)]" />
        </div>

        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-20 h-20 bg-card/50 rounded-full animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {socialLinks?.map((link, idx) => {
              const Icon = platformIcons[link.platform] || SiX;
              const bgGradient = getPlatformGradient(link.platform, link.color);
              
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                  className="relative group w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {link.platform}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>

                  {/* Rising fill */}
                  <div 
                    className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-300 ease-out"
                    style={{ background: bgGradient }}
                  />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-3xl md:text-4xl text-black group-hover:text-white transition-colors duration-300">
                    <Icon />
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
