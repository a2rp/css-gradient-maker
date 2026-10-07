import { LuGithub, LuSparkles } from "react-icons/lu";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.siteHeader}>
        <a className={styles.brand} href="#top" aria-label="Blend Lab home"><span><LuSparkles aria-hidden="true" /></span> blend lab</a>
        <nav aria-label="Main navigation">
            <a href="#studio">Controls</a>
            <a href="#preview">Preview</a>
            <a href="#css">CSS</a>
        </nav>
        <a className={styles.repository} href="https://github.com/a2rp/css-gradient-maker" target="_blank" rel="noreferrer"><LuGithub aria-hidden="true" /><span>Repository</span></a>
    </header>
);

export default SiteHeader;
