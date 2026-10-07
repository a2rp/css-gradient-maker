import { useMemo, useState } from "react";
import { LuArrowDown, LuCheck, LuCode, LuSparkles } from "react-icons/lu";
import BackToTop from "./components/backToTop/index.jsx";
import CssOutput from "./components/cssOutput/index.jsx";
import GradientControls from "./components/gradientControls/index.jsx";
import GradientPreview from "./components/gradientPreview/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { createGradientCss, cssGradientPresets } from "./utils/gradientCss.js";
import styles from "./App.module.css";

const initialPreset = cssGradientPresets[0];
const addStopColor = "#FFD783";

const createStopId = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `stop-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const GradientMaker = () => {
    const [type, setType] = useState(initialPreset.type);
    const [angle, setAngle] = useState(initialPreset.angle);
    const [stops, setStops] = useState(() => initialPreset.stops.map((stop, index) => ({ ...stop, id: `${initialPreset.id}-${index + 1}` })));
    const [activePreset, setActivePreset] = useState(initialPreset.id);
    const cssText = useMemo(() => createGradientCss(type, angle, stops), [angle, stops, type]);

    const changeType = (nextType) => {
        setType(nextType);
        setActivePreset("");
    };

    const changeAngle = (nextAngle) => {
        setAngle(nextAngle);
        setActivePreset("");
    };

    const changeStopColor = (stopId, color) => {
        setStops((currentStops) => currentStops.map((stop) => stop.id === stopId ? { ...stop, color } : stop));
        setActivePreset("");
    };

    const changeStopPosition = (stopId, position) => {
        setStops((currentStops) => currentStops.map((stop) => stop.id === stopId ? { ...stop, position } : stop).sort((first, second) => first.position - second.position));
        setActivePreset("");
    };

    const addStop = () => {
        setStops((currentStops) => {
            if (currentStops.length >= 5) return currentStops;
            const ordered = [...currentStops].sort((first, second) => first.position - second.position);
            const boundaries = [0, ...ordered.map((stop) => stop.position), 100];
            let widestGap = -1;
            let midpoint = 50;
            for (let index = 0; index < boundaries.length - 1; index += 1) {
                const gap = boundaries[index + 1] - boundaries[index];
                if (gap > widestGap) {
                    widestGap = gap;
                    midpoint = Math.round((boundaries[index] + boundaries[index + 1]) / 2);
                }
            }
            return [...ordered, { id: createStopId(), color: addStopColor, position: midpoint }].sort((first, second) => first.position - second.position);
        });
        setActivePreset("");
    };

    const removeStop = (stopId) => {
        setStops((currentStops) => currentStops.length <= 2 ? currentStops : currentStops.filter((stop) => stop.id !== stopId));
        setActivePreset("");
    };

    const selectPreset = (preset) => {
        setType(preset.type);
        setAngle(preset.angle);
        setStops(preset.stops.map((stop, index) => ({ ...stop, id: `${preset.id}-${index + 1}` })));
        setActivePreset(preset.id);
    };

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.mainContent}>
                <section className={styles.intro} aria-labelledby="page-title">
                    <div className={styles.introCopy}>
                        <span className={styles.introLabel}><LuSparkles aria-hidden="true" /> A COLOR PLAYGROUND</span>
                        <h1 id="page-title">Make color flow.</h1>
                        <p>Shape a gradient with your own colors. Tune the direction, move every stop, and copy the CSS straight into your design.</p>
                        <a href="#studio" className={styles.startLink}>Start blending <LuArrowDown aria-hidden="true" /></a>
                    </div>
                    <div className={styles.introCard}>
                        <span><LuCode aria-hidden="true" /> ONE DECLARATION</span>
                        <code>background: gradient(...)</code>
                        <p>Two to five colors, blended your way.</p>
                        <div className={styles.introChecks}><span><LuCheck aria-hidden="true" /> Linear</span><span><LuCheck aria-hidden="true" /> Radial</span><span><LuCheck aria-hidden="true" /> Copyable</span></div>
                    </div>
                    <div className={styles.introGlow} aria-hidden="true" />
                </section>
                <div className={styles.workspace}>
                    <GradientControls
                        type={type}
                        angle={angle}
                        stops={stops}
                        activePreset={activePreset}
                        onTypeChange={changeType}
                        onAngleChange={changeAngle}
                        onStopColorChange={changeStopColor}
                        onStopPositionChange={changeStopPosition}
                        onAddStop={addStop}
                        onStopRemove={removeStop}
                        onPresetSelect={selectPreset}
                    />
                    <div className={styles.outputColumn}>
                        <GradientPreview gradientCss={cssText} />
                        <CssOutput cssText={cssText} />
                    </div>
                </div>
                <p className={styles.pageNote}>Gradients are built locally in your browser. Your colors are not uploaded or saved.</p>
            </main>
            <SiteFooter />
            <BackToTop />
        </div>
    );
};

export default GradientMaker;
