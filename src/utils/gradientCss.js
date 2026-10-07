const validColor = /^#[\da-f]{6}$/i;

export const createGradientCss = (type, angle, stops) => {
    if (type !== "linear" && type !== "radial") throw new Error("Choose a linear or radial gradient.");
    if (!Number.isInteger(angle) || angle < 0 || angle > 360) throw new Error("The angle must be a whole number from 0 to 360 degrees.");
    if (!Array.isArray(stops) || stops.length < 2 || stops.length > 5) throw new Error("A gradient needs between two and five color stops.");

    const orderedStops = stops.map((stop) => {
        if (!validColor.test(stop.color)) throw new Error("Every stop needs a six-digit hex color.");
        if (!Number.isInteger(stop.position) || stop.position < 0 || stop.position > 100) {
            throw new Error("Stop positions must be whole numbers from 0 to 100 percent.");
        }
        return { color: stop.color.toUpperCase(), position: stop.position };
    }).sort((first, second) => first.position - second.position);

    const stopsText = orderedStops.map(({ color, position }) => `${color} ${position}%`).join(", ");
    const gradient = type === "linear" ? `linear-gradient(${angle}deg, ${stopsText})` : `radial-gradient(circle at center, ${stopsText})`;
    return `background: ${gradient};`;
};

export const cssGradientPresets = [
    {
        id: "violet-haze",
        name: "Violet haze",
        description: "Soft lilac into deep blue",
        type: "linear",
        angle: 135,
        stops: [{ color: "#EAB7E8", position: 0 }, { color: "#8575E8", position: 48 }, { color: "#344D99", position: 100 }],
    },
    {
        id: "peach-dusk",
        name: "Peach dusk",
        description: "Warm peach with a berry edge",
        type: "linear",
        angle: 115,
        stops: [{ color: "#FFD19B", position: 0 }, { color: "#FA8F86", position: 57 }, { color: "#9E4B91", position: 100 }],
    },
    {
        id: "mint-current",
        name: "Mint current",
        description: "Fresh green and cool cyan",
        type: "linear",
        angle: 130,
        stops: [{ color: "#C0EFC5", position: 0 }, { color: "#69CFB4", position: 50 }, { color: "#3687B5", position: 100 }],
    },
    {
        id: "candy-orbit",
        name: "Candy orbit",
        description: "A bright radial blend",
        type: "radial",
        angle: 135,
        stops: [{ color: "#FFE28C", position: 0 }, { color: "#F18BBA", position: 57 }, { color: "#7657D8", position: 100 }],
    },
    {
        id: "blue-hour",
        name: "Blue hour",
        description: "A deep, quiet evening sky",
        type: "linear",
        angle: 170,
        stops: [{ color: "#527DC7", position: 0 }, { color: "#303C78", position: 54 }, { color: "#221E42", position: 100 }],
    },
];
