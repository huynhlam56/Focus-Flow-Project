// import React, { useEffect } from 'react';
// import { useSelector} from 'react-redux'

// function LandingPage() {
//   const sessionUser = useSelector(state => state.session.user);
//   console.log(sessionUser)
//   // Define a function for feature detection
//   function canUse(feature) {
//     const element = document.createElement('div');
//     const prefixes = ' Khtml Ms O Moz Webkit'.split(' ');
//     const upper = feature.charAt(0).toUpperCase() + feature.substr(1);

//     if (feature in element.style) return true;

//     for (let i = 0; i < prefixes.length; i++) {
//       if ((prefixes[i] + upper) in element.style) return true;
//     }

//     return false;
//   }

//   useEffect(() => {

//     // Settings for your background images and delay.
//     const settings = {
//       images: {
//         '../images/bg01.jpg': 'center',
//         '../images/bg02.jpg': 'center',
//         '../images/bg03.jpg': 'center'
//       },
//       delay: 6000
//     };

//     // Vars.
//     let pos = 0, lastPos = 0;
//     let $wrapper, $bgs = [], $bg;
//     let k;

//     // Reference to the body element.
//     const $body = document.body;

//     // Create BG wrapper, BGs.
//     $wrapper = document.createElement('div');
//     $wrapper.id = 'bg';
//     $body.appendChild($wrapper);

//     for (k in settings.images) {
//       // Create BG.
//       $bg = document.createElement('div');
//       $bg.style.backgroundImage = 'url("' + k + '")';
//       $bg.style.backgroundPosition = settings.images[k];
//       $wrapper.appendChild($bg);

//       // Add it to array.
//       $bgs.push($bg);
//     }

//     // Main loop.
//     $bgs[pos].classList.add('visible');
//     $bgs[pos].classList.add('top');

//     // Check if there's only one BG or if the client doesn't support transitions.
//     if ($bgs.length === 1 || !canUse('transition')) {
//       return;
//     }

//     const intervalId = setInterval(function () {
//       lastPos = pos;
//       pos++;

//       // Wrap to beginning if necessary.
//       if (pos >= $bgs.length) {
//         pos = 0;
//       }

//       // Swap top images.
//       $bgs[lastPos].classList.remove('top');
//       $bgs[pos].classList.add('visible');
//       $bgs[pos].classList.add('top');

//       // Hide the last image after a short delay.
//       setTimeout(function () {
//         $bgs[lastPos].classList.remove('visible');
//       }, settings.delay / 2);
//     }, settings.delay);

//     // Clear the interval when the component unmounts.
//     return () => clearInterval(intervalId);
//   }, []);
//   if (!sessionUser)
// 	return (
//     <h1>FOCUS FLOW</h1>
// 	);
// }

// export default LandingPage;
