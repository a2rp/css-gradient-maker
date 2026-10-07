import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const ConfirmStopRemoval = ({ index, stop, onCancel, onConfirm }) => {
    const cancelRef = useRef(null);
    const removeRef = useRef(null);

    useEffect(() => {
        cancelRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel();
            }

            if (event.key === "Tab") {
                const first = cancelRef.current;
                const last = removeRef.current;
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onCancel]);

    return (
        <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
            <div className={styles.confirmDialog} role="dialog" aria-modal="true" aria-labelledby="remove-stop-title" aria-describedby="remove-stop-description">
                <span className={styles.dialogMark} aria-hidden="true">!</span>
                <h2 id="remove-stop-title">Remove color stop?</h2>
                <p id="remove-stop-description">Stop {index + 1} at {stop.position}% ({stop.color}) will be removed from this gradient.</p>
                <div className={styles.dialogActions}>
                    <button type="button" ref={cancelRef} onClick={onCancel}>Keep stop</button>
                    <button type="button" ref={removeRef} onClick={onConfirm}>Remove stop</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmStopRemoval;
