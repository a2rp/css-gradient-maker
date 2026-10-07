import { useState } from "react";
import { LuRectangleHorizontal, LuRectangleVertical, LuSquare } from "react-icons/lu";
import styles from "./styles.module.css";

const formats = [
    { id: "wide", label: "Wide", icon: LuRectangleHorizontal },
    { id: "square", label: "Square", icon: LuSquare },
    { id: "portrait", label: "Tall", icon: LuRectangleVertical },
];

const GradientPreview = ({ gradientCss }) => {
    const [format, setFormat] = useState("wide");
    const gradient = gradientCss.replace(/^background:\s*/, "").replace(/;\s*$/, "");

    return (
        <section className={styles.gradientPreview} id="preview" aria-labelledby="preview-title">
            <div className={styles.previewHeader}>
                <div><h2 id="preview-title">Live preview</h2><p>Try your colors across a few shapes.</p></div>
                <div className={styles.formatButtons} aria-label="Preview shape">
                    {formats.map(({ id, label, icon: Icon }) => <button type="button" key={id} className={format === id ? styles.selectedFormat : ""} onClick={() => setFormat(id)} aria-pressed={format === id} aria-label={`${label} preview`}><Icon aria-hidden="true" /><span>{label}</span></button>)}
                </div>
            </div>
            <div className={`${styles.previewCanvas} ${styles[format]}`} style={{ background: gradient }}>
                <div className={styles.shapeOne} aria-hidden="true" />
                <div className={styles.shapeTwo} aria-hidden="true" />
                <div className={styles.previewText}>
                    <span>GRADIENT STUDY · 01</span>
                    <h3>Color in motion.</h3>
                    <p>A living blend, made by you.</p>
                </div>
                <span className={styles.canvasCorner}>CSS / STUDIO</span>
            </div>
            <p className={styles.previewNote}>The preview updates as you change the type, angle, colors, or stop positions.</p>
        </section>
    );
};

export default GradientPreview;
