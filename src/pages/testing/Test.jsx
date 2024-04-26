import React, { useEffect } from 'react';

const Test = () => {
    
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:49122');

        socket.onopen = () => {
            console.log("Connected to SOS.");
        };
          
        socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        socket.onmessage = ({ data }) => {
            const parsed = JSON.parse(data);
            console.log("New msg:", parsed);
        };

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

    return(
        <div><p>balls</p></div>
    );
};

export default Test;