import React from "react";
import { socialLinks } from "../data/navigation";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./SocialIcons";

const icons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon
};

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2">
      {socialLinks.map((social) => {
        const Icon = icons[social.label];
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={`HERO SNEAKERS on ${social.label}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-silver transition-colors duration-150 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>);

      })}
    </ul>);

}