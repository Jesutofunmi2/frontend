// import React, { useState, useEffect } from 'react';

// function NetworkStrengthDetector() {
//   const [networkMbps, setNetworkMbps] = useState(null);

//   useEffect(() => {
//     // Check if the 'navigator.connection' API is available
//     if ('connection' in navigator) {
//       const connection = navigator.connection;

//       // Check if 'downlink' is available (Mbps information)
//       if (connection?.downlink) {
//         const mbps = connection?.downlink;
//         setNetworkMbps(mbps);

//         // Check if network speed is less than 5 Mbps
//         if (mbps < 5) {
//           console.log('Poor network');
//         }
//       }
//     }
//   }, [networkMbps]);

//   return (
//     <div>
//       <p>Network Mbps: {networkMbps !== null ? networkMbps.toFixed(2) : 'Loading...'}</p>
//     </div>
//   );
// }

// export default NetworkStrengthDetector;
 
 