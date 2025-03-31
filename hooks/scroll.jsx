import { useEffect, useState } from 'react'

function UsehandleScoll(collectionMainRef) {

    const [progressWidth, setProgressWidth] = useState()

    useEffect(() => {
        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = collectionMainRef.current;
            const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            // sliderProgressInnerRef.current.style.width = `${scrollPercentage}%`;
            setProgressWidth(scrollPercentage)
        };

        const collectionMain = collectionMainRef.current;
        collectionMain.addEventListener('scroll', handleScroll);

        return () => {
            collectionMainRef && collectionMain.removeEventListener('scroll', handleScroll);
        };
    }, [collectionMainRef, progressWidth]);

    return { progressWidth }
}

export default UsehandleScoll