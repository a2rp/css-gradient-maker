import { useState } from "react";
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";
import styles from "./styles.module.css";

const CssOutput = ({ cssText }) => {
    const [copyStatus, setCopyStatus] = useState("");

    const copyCss = async () => {
        try {
            await navigator.clipboard.writeText(cssText);
            setCopyStatus("CSS copied");
        } catch {
            setCopyStatus("Clipboard unavailable");
        }
        window.setTimeout(() => setCopyStatus(""), 1800);
    };

    return (
        <section className={styles.cssOutput} id="css" aria-labelledby="css-title">
            <div className={styles.outputHeader}>
                <div><span className={styles.codeIcon}><LuCode aria-hidden="true" /></span><div><h2 id="css-title">CSS output</h2><p>Ready to paste into your stylesheet.</p></div></div>
                <button type="button" onClick={copyCss}>{copyStatus === "CSS copied" ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}{copyStatus === "CSS copied" ? "Copied" : "Copy CSS"}</button>
            </div>
            <pre tabIndex="0" aria-label="Generated CSS"><code>{cssText}</code></pre>
            <p className={styles.copyStatus} aria-live="polite">{copyStatus === "Clipboard unavailable" ? copyStatus : ""}</p>
        </section>
    );
};

export default CssOutput;
