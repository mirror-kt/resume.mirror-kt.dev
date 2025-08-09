import type { ComponentPropsWithRef, JSX } from "react";

type ShieldsStaticBadgeParams = {
  /**
   * Label, (optional) message, and color. Separated by dashes
   *
   * @example build-passing-brightgreen
   */
  badgeContent: string;
  /**
   * If not specified, the default style for this badge is "flat".
   *
   * @example flat
   */
  badgeStyle?: "flat" | "flat-square" | "plastic" | "for-the-badge" | "social";
  /**
   * Icon slug from simple-icons.
   *
   * You can click the icon title on [simple-icons](https://simpleicons.org) to copy the slug,
   * or th%23ey can be found in the [slugs.md](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) file in the simple-icons repository. Further info.
   *
   * @example appveyor
   */
  logo?: string;

  /**
   * The color of the logo (hex, rgb, rgba, hsl, hsla and css named colors supported). Supported for simple-icons logos but not for custom logos.
   *
   * @example violet
   */
  logoColor?: string;

  /**
   * Make icons adaptively resize by setting auto. Useful for some wider logos like amd and amg.
   * Supported for simple-icons logos but not for custom logos.
   *
   * @example auto
   */
  logoSize?: string;

  /**
   * Override the default left-hand-side text ([URL-Encoding](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding) needed for spaces or special characters!)
   *
   * @example healthiness
   */
  label?: string;

  /**
   * Background color of the left part (hex, rgb, rgba, hsl, hsla and css named colors supported).
   *
   * @example abcdef
   */
  labelColor?: string;

  /**
   * Background color of the right part (hex, rgb, rgba, hsl, hsla and css named colors supported).
   *
   * @example fedcba
   */
  color?: string;

  /**
   * HTTP cache lifetime (rules are applied to infer a default value on a per-badge basis,
   * any values specified below the default will be ignored).
   *
   * @example 3600
   */
  cacheSeconds?: number;

  /**
   * Specify what clicking on the left/right of a badge should do. Note that this only works when integrating your badge in an `<object>` HTML tag,
   * but not an `<img>` tag or a markup language.
   */
  link?: string[];
};

export type ShieldsStaticBadgeProps = ShieldsStaticBadgeParams &
  Omit<ComponentPropsWithRef<"img">, "src" | "srcSet">;

const ShieldsStaticBadge = ({
  badgeContent,
  badgeStyle,
  logo,
  logoColor,
  logoSize,
  label,
  labelColor,
  color,
  cacheSeconds,
  ...props
}: ShieldsStaticBadgeProps): JSX.Element => {
  const shieldsUrl = new URL(badgeContent, "https://img.shields.io/badge/");
  if (badgeStyle) {
    shieldsUrl.searchParams.append("style", badgeStyle);
  }
  if (logo) {
    shieldsUrl.searchParams.append("logo", logo);
  }
  if (logoColor) {
    shieldsUrl.searchParams.append("logoColor", logoColor);
  }
  if (logoSize) {
    shieldsUrl.searchParams.append("logoSize", logoSize);
  }
  if (label) {
    shieldsUrl.searchParams.append("label", label);
  }
  if (labelColor) {
    shieldsUrl.searchParams.append("labelColor", labelColor);
  }
  if (color) {
    shieldsUrl.searchParams.append("color", color);
  }
  if (cacheSeconds) {
    shieldsUrl.searchParams.append("cacheSeconds", cacheSeconds.toString());
  }

  // linterを黙らせるためaltは冗長な書き方をしている
  return <img {...props} alt={props.alt} src={shieldsUrl.toString()} />;
};
export default ShieldsStaticBadge;
