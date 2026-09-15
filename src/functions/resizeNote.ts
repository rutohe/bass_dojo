/**
 * Calculates a note length from the distance the resize handle was dragged.
 * The result is expressed in grid cells rather than pixels.
 */
export const resizeNote = (
    initialLength: number,
    dragDistance: number,
    cellWidth: number,
    maximumLength: number,
) => {
    if (cellWidth <= 0) return initialLength;

    const lengthChange = Math.round(dragDistance / cellWidth);
    return Math.max(1, Math.min(initialLength + lengthChange, maximumLength));
};
