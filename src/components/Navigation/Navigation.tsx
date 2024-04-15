import React from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";
import Logo from "../Logo/Logo";

type NavigationProps = {
  isLogoCentred: boolean;
};

const Navigation = ({ isLogoCentred }: NavigationProps) => (
  <nav aria-label="Site navigation" className={styles.nav} role="navigation">
    <Logo isCentred={isLogoCentred} />

    <div className={styles.links}>
      <Link className={styles.link} href="/projects">
        {"Projects"}
      </Link>

      <Link className={styles.link} href="/studio">
        {"Studio"}
      </Link>

      <Link className={styles.link} href="/newbusiness">
        {"Commission"}
      </Link>
    </div>
  </nav>
);

export default Navigation;
