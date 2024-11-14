import { Box } from "@mui/material";
import React from "react";
import Access from "../GLCMA100200/Access";

const CommonCode = () => {
  return (
    <Box
      sx={{
        height: "50%",
        width: "50%",
        // backgroundColor: "#e3f2fd",
        backgroundColor: "red",
      }}
    >
      <Access />
    </Box>
  );
};

export default CommonCode;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const  CommonCode = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   // Fetch all countries
//   useEffect(() => {
//     axios.get('https://restcountries.com/v3.1/all')
//       .then((response) => {
//         setCountries(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching countries:', error);
//       });
//   }, []);

//   // Fetch states when a country is selected
//   useEffect(() => {
//     if (selectedCountry) {
//       axios.get(`https://api.example.com/states?country=${selectedCountry}`)
//         .then((response) => {
//           setStates(response.data);
//           setSelectedState('');
//           setCities([]);
//         })
//         .catch((error) => {
//           console.error('Error fetching states:', error);
//         });
//     }
//   }, [selectedCountry]);

//   // Fetch cities when a state is selected
//   useEffect(() => {
//     if (selectedState) {
//       axios.get(`https://api.example.com/cities?state=${selectedState}`)
//         .then((response) => {
//           setCities(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching cities:', error);
//         });
//     }
//   }, [selectedState]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Selected Location:', { selectedCountry, selectedState, selectedCity });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Country</label>
//         <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
//           <option value="">Select Country</option>
//           {countries.map((country) => (
//             <option key={country.cca3} value={country.cca3}>
//               {country.name.common}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>State</label>
//         <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
//           <option value="">Select State</option>
//           {states.map((state) => (
//             <option key={state.id} value={state.name}>
//               {state.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>City</label>
//         <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
//           <option value="">Select City</option>
//           {cities.map((city) => (
//             <option key={city.id} value={city.name}>
//               {city.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default  CommonCode;
