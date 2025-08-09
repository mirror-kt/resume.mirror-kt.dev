import type { JSX } from "react";
import ShieldsStaticBadge from "./shieldsStaticBadge";

export type SocialAccountBadgeProps = {
  text: string;
  alt: string;
  href?: string;
  brandColor: string;
  logo: string;
};

const FlatSquareBadge = ({
  text,
  alt,
  href,
  brandColor,
  logo,
}: SocialAccountBadgeProps): JSX.Element => {
  return (
    <a href={href} target="_blank">
      <ShieldsStaticBadge
        alt={alt}
        badgeContent={`${text}-%23${brandColor}.svg`}
        badgeStyle="flat-square"
        logo={logo}
        logoColor="white"
      />
    </a>
  );
};

export default FlatSquareBadge;
