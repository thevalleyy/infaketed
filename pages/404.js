import React, { useEffect } from "react";

export default function FourOhFour() {
    useEffect(() => {
        window.location = "/";
    }, []);
}

// redirect to /
