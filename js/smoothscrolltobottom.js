function smoothscrolltobottom(document, window, time = 1000) {
    // Get the height of the entire document
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );

    // Current scroll position
    let scrollTop = 0;

    // Calculate the total distance to scroll
    const distance = documentHeight - scrollTop;

    // Duration of the smooth scroll in milliseconds
    const duration = time; // Adjust as needed

    // Custom easing function for the desired scrolling behavior
    function customEasing(t) {
        if (t < 0.25) {
            // Slow start
            return t * t * t * 8;
        } else if (t < 0.75) {
            // Speed up
            return 3 * t - 0.75;
        } else {
            // Slow down
            return 1 - (t - 0.75) * (t - 0.75) * 16;
        }
    }

    // Function to handle the animation loop
    function scrollAnimation(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;

        // Calculate the next scroll position using custom easing function
        const t = Math.min(1, elapsedTime / duration);
        const easingT = customEasing(t);
        const scrollY = scrollTop + distance * easingT;

        // if new scroll position is above the actual height, return
        if (scrollY + window.innerHeight > documentHeight) return;

        // Scroll the window to the calculated position
        window.scrollTo(0, scrollY);

        // Continue the animation until reaching the target position
        if (elapsedTime < duration) {
            window.requestAnimationFrame(scrollAnimation);
        }
    }

    // Start the animation loop
    let startTime = null;
    window.requestAnimationFrame(scrollAnimation);
}

module.exports = smoothscrolltobottom;
