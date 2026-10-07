import { useCallback, useState } from "react";
import { LuCheck, LuCircle, LuMoveRight, LuPlus, LuTrash2 } from "react-icons/lu";
import { createGradientCss, cssGradientPresets } from "../../utils/gradientCss.js";
import ConfirmStopRemoval from "./confirmStopRemoval/index.jsx";
import styles from "./styles.module.css";

const getGradientBackground = (preset) => createGradientCss(preset.type, preset.angle, preset.stops).replace(/^background:\s*/, "").replace(/;\s*$/, "");

const GradientControls = ({ type, angle, stops, activePreset, onTypeChange, onAngleChange, onStopColorChange, onStopPositionChange, onAddStop, onStopRemove, onPresetSelect }) => {
    const [pendingStopId, setPendingStopId] = useState("");
    const pendingStop = stops.find((stop) => stop.id === pendingStopId);
    const pendingIndex = stops.findIndex((stop) => stop.id === pendingStopId);
    const cancelRemoval = useCallback(() => setPendingStopId(""), []);
    const confirmRemoval = useCallback(() => {
        if (pendingStopId) onStopRemove(pendingStopId);
        setPendingStopId("");
    }, [onStopRemove, pendingStopId]);

    return (
        <section className={styles.gradientControls} id="studio" aria-labelledby="studio-title">
            <div className={styles.sectionHeader}>
                <div className={styles.headingIcon}><LuCircle aria-hidden="true" /></div>
                <div><h2 id="studio-title">Tune your gradient</h2><p>Choose a direction, add color, and shape the blend.</p></div>
            </div>

            <div className={styles.typeControl}>
                <span>Gradient type</span>
                <div role="group" aria-label="Gradient type">
                    <button type="button" className={type === "linear" ? styles.typeSelected : ""} onClick={() => onTypeChange("linear")} aria-pressed={type === "linear"}><LuMoveRight aria-hidden="true" /> Linear</button>
                    <button type="button" className={type === "radial" ? styles.typeSelected : ""} onClick={() => onTypeChange("radial")} aria-pressed={type === "radial"}><LuCircle aria-hidden="true" /> Radial</button>
                </div>
            </div>

            {type === "linear" && (
                <label className={styles.angleControl} htmlFor="gradient-angle">
                    <span><strong>Direction</strong><output htmlFor="gradient-angle">{angle}°</output></span>
                    <input id="gradient-angle" type="range" min="0" max="360" step="1" value={angle} onChange={(event) => onAngleChange(Number(event.target.value))} />
                    <small><span>0°</span><span>180°</span><span>360°</span></small>
                </label>
            )}

            <div className={styles.stopsSection}>
                <div className={styles.stopsHeading}>
                    <div><h3>Color stops</h3><p>Adjust each color and where it appears.</p></div>
                    <span>{stops.length} / 5</span>
                </div>
                <div className={styles.stopList}>
                    {stops.map((stop, index) => (
                        <article className={styles.stopCard} key={stop.id}>
                            <label className={styles.stopColor}>
                                <span className={styles.colorLabel}>Color {index + 1}</span>
                                <input type="color" value={stop.color} aria-label={`Color for stop ${index + 1}`} onChange={(event) => onStopColorChange(stop.id, event.target.value.toUpperCase())} />
                            </label>
                            <div className={styles.stopInfo}><strong>Stop {String(index + 1).padStart(2, "0")}</strong><code>{stop.color.toUpperCase()}</code></div>
                            <label className={styles.positionControl}>
                                <span>Position <output>{stop.position}%</output></span>
                                <input type="range" min="0" max="100" step="1" value={stop.position} aria-label={`Position for stop ${index + 1}`} onChange={(event) => onStopPositionChange(stop.id, Number(event.target.value))} />
                            </label>
                            <button className={styles.removeStop} type="button" disabled={stops.length <= 2} onClick={() => setPendingStopId(stop.id)} aria-label={`Remove stop ${index + 1}, ${stop.color.toUpperCase()} at ${stop.position} percent`} title={stops.length <= 2 ? "A gradient needs at least two stops" : "Remove this stop"}><LuTrash2 aria-hidden="true" /></button>
                        </article>
                    ))}
                </div>
                <button className={styles.addStop} type="button" onClick={onAddStop} disabled={stops.length >= 5}><LuPlus aria-hidden="true" /> Add a color stop</button>
            </div>

            <div className={styles.presetSection}>
                <div className={styles.stopsHeading}>
                    <div><h3>Try a preset</h3><p>Each preset can be edited once applied.</p></div>
                </div>
                <div className={styles.presetGrid}>
                    {cssGradientPresets.map((preset) => (
                        <button type="button" key={preset.id} className={activePreset === preset.id ? styles.presetSelected : ""} onClick={() => onPresetSelect(preset)} aria-pressed={activePreset === preset.id}>
                            <span className={styles.presetGradient} style={{ background: getGradientBackground(preset) }}>
                                {activePreset === preset.id && <LuCheck aria-hidden="true" />}
                            </span>
                            <span className={styles.presetName}>{preset.name}</span>
                            <small>{preset.description}</small>
                        </button>
                    ))}
                </div>
            </div>
            {pendingStop && <ConfirmStopRemoval index={pendingIndex} stop={pendingStop} onCancel={cancelRemoval} onConfirm={confirmRemoval} />}
        </section>
    );
};

export default GradientControls;
