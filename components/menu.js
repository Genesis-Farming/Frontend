import { useRouter } from "next/router";

import Link from "next/link";

import ColorGuide from "../styles/colorGuide";

import useWindowSize from "../hooks/useWindowSize";

import menuRoutesList from "../data/menuRoutesList";
import styles from "./menu.module.css";

export default function Menu() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const { route } = useRouter();

  return (
    <div id={styles.main_menu}>
      <div className={styles.contentMenu}>
        <Link href="/">
          <img id={styles.logo} src="/logo.png" />
        </Link>

        <div className="containerRow">
          <Link href={"/dashboard"}>
            <p
              style={{
                marginRight: 15,
                color: ColorGuide.mainBlue,
                cursor: "pointer",
              }}
            >
              Dashboard
            </p>
          </Link>

          {responsiveWidth > 650 && (
            <div
              style={{ backgroundColor: ColorGuide.lightBlue }}
              className={styles.phone_number}
            >
              <p style={{ color: ColorGuide.mainBlue }}>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
