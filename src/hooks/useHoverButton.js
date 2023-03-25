import { useState } from "react";

const useHoverButton = () => {
    const [isHovering, setIsHovering] = useState(false);
    const hoverProps = {
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
    };
    return [isHovering, hoverProps];
};

export default useHoverButton;
