import * as React from "react";
import { SVGProps } from "react";
import styles from "./styles.module.css";
import { SVGContainer } from "./SVGContainer";
export const LogoSVG = (props: SVGProps<SVGSVGElement>) => (
  <SVGContainer>
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 145.32 115.56"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1={101.33}
          x2={133.61}
          y1={218.28}
          y2={218.28}
          gradientTransform="matrix(-1.4556 -.00408 .00197 -3.0228 293.94 761.34)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#00a6c0" />
          <stop offset={0.5} stopColor="#00d0e5" />
          <stop offset={1} stopColor="#1cefff" />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={11.112}
        d="m103.74 101.01 39.291.11M59.135 45.454l31.797 27.56-32.108 27.856m108.96 24.782-134.07-.18.14-104.26 134.07.18z"
        style={{
          paintOrder: "normal",
        }}
        transform="translate(-28.161 -15.65)"
      />
    </svg>
  </SVGContainer>
);
