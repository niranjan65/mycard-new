// import React, { useEffect, useState } from 'react';
// import { MapPin, Clock, Phone, Navigation, AlertTriangle } from 'lucide-react';
// import LocationModal from '@/components/HealthBloMe/LocationModal';
// import maplibre from 'maplibre-gl';

// export default function PharmacyFinder() {
//   const [location, setLocation] = useState(null);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);

//  const [permissionState, setPermissionState] = useState(null);


//  let mapContainer;
 
//   useEffect(() => {
//     const myAPIKey = '9a0dd25b5e3645f59c8db86fac99a495'; 
//     const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
 
//     const initialState = {
//       lng: 11,
//       lat: 49,
//       zoom: 4
//     };
 
//     const map = new maplibre.Map({
//       container: mapContainer,
//       style: `${mapStyle}?apiKey=${myAPIKey}`,
//       center: [initialState.lng, initialState.lat],
//       zoom: initialState.zoom
//       });
 
//   }, [mapContainer]);

 

//   const revealPosition = (position) => {
//     const { latitude, longitude } = position.coords;
//     console.log("User location:", latitude, longitude);
//     setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
//   };

//   const positionDenied = (error) => {
//     console.error("Geolocation error:", error.message);
//     setLocation("Permission denied or unavailable");
//   };

//   const handlePermission = () => {
//     if (!navigator.geolocation) {
//       setLocation("Geolocation not supported");
//       return;
//     }

//     navigator.permissions
//       .query({ name: "geolocation" })
//       .then((result) => {
//         console.log("Permission state:", result.state);
//         setPermissionState(result.state);

//         if (result.state === "granted") {
//           navigator.geolocation.getCurrentPosition(revealPosition, positionDenied);
//         } else if (result.state === "prompt") {
//           navigator.geolocation.getCurrentPosition(revealPosition, positionDenied);
//         } else if (result.state === "denied") {
//           setLocation("Permission denied");
//         }

//         result.addEventListener("change", () => {
//           console.log("Permission changed to:", result.state);
//           setPermissionState(result.state);
//         });
//       })
//       .catch((err) => console.error("Permission API error:", err));
//   };

//   useEffect(() => {
//     handlePermission();
//   }, []);


//   const pharmacies = [
//     {
//       id: 1,
//       name: '  Pharmacy: ROY BAHADUR',
//       distance: '0.6 km',
//       address: 'HOLDING No. -189, ROY BAHADUR ROAD, WARD No-120, Ground floor, P.O- Behala, P.S-Behala, Pin- 700034',
//       hours: '0:00 AM - 12:00 PM',
//       status: 'Open Now',
//       phone: '7596027783',
//       lat: 22.4850,
//       lng: 88.3100
//     },
//     {
//       id: 2,
//       name: '  Pharmacy: BHUPEN ROY ROAD',
//       distance: '0.7 km',
//       address: '68, Bhupen Roy Road, ward no-121, gr.floor, P.O& P.S-Behala, Kolkata-700034',
//       hours: '7:00 AM - 9:00 PM',
//       status: 'Open Now',
//       phone: '7596020059',
//       lat: 22.4880,
//       lng: 88.3130
//     },
//     {
//       id: 3,
//       name: '  Pharmacy: THAKURPUKUR',
//       distance: '1.1 km',
//       address: 'Ground Floor, 235/1, Diamond Harbour Road, Thakurpukur, Kolkata-700063',
//       hours: '8:00 AM - 10:00 PM',
//       status: 'Open Now',
//       phone: '7596027891',
//       lat: 22.4820,
//       lng: 88.3080
//     },
//     {
//       id: 4,
//       name: '  Pharmacy: BEHALA CHOWRASTA',
//       distance: '1.2 km',
//       address: '156, S.N. Roy Road, Behala Chowrasta, Kolkata-700034',
//       hours: '24 Hours',
//       status: 'Open Now',
//       phone: '7596028456',
//       lat: 22.4900,
//       lng: 88.3150
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
     

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-600 mb-4">
//           Home &gt; <span className="text-teal-700">Pharmacy Nearby</span>
//         </div>

//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Pharmacies Near You</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Section - Info Banner */}
//           <div className="lg:col-span-1">
//             <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 shadow-md border border-orange-200">
//               <div className="flex items-start gap-3 mb-4">
//                 <MapPin className="text-teal-700 w-6 h-6 flex-shrink-0 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Find Pharmacies Near You
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Locate the nearest pharmacy and check availability
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <Clock className="text-teal-700 w-6 h-6 flex-shrink-0 mt-1" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     Check for item availability at nearby Pharmacies
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Real-time stock information
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/ _Pharmacy_logo.svg/320px- _Pharmacy_logo.svg.png" alt="  24/7" className="h-12 mb-3" />
//                 <div className="bg-orange-500 text-white rounded-lg px-4 py-2 text-center mb-2">
//                   <p className="text-sm font-semibold">Unlock 10% Cashback on your Store Purchase</p>
//                 </div>
//                 <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
//                   Download Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Map & Results */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Location & Map */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="p-4 border-b flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <MapPin className="text-teal-700 w-5 h-5" />
//                   <span className="font-semibold text-gray-800">{location}</span>
//                 </div>
//                 <button className="text-teal-700 font-semibold text-sm hover:text-teal-800">
//                   Change
//                 </button>
//               </div>
              
//               {/* Map Placeholder */}
//               <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   {/* {pharmacies.map((pharmacy, idx) => (
//                     <div
//                       key={pharmacy.id}
//                       className="absolute"
//                       style={{
//                         left: `${20 + idx * 20}%`,
//                         top: `${30 + idx * 10}%`
//                       }}
//                     >
//                       <div className="bg-teal-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition">
//                         <MapPin className="w-5 h-5" />
//                       </div>
//                     </div>
//                   ))} */}

//                   <div className="map-container" ref={el => mapContainer = el}>
//     </div>
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded shadow text-xs text-gray-600">
//                   Map data ©2025
//                 </div>
//               </div>
//             </div>

//             {/* Pharmacy Cards */}
//             <div className="space-y-4 flex gap-5 flex-wrap">
//               {pharmacies.map((pharmacy) => (
//                 <div
//                   key={pharmacy.id}
//                   className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition w-[25rem]"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-900 mb-1">
//                         {pharmacy.name}
//                       </h3>
//                       <div className="flex items-center gap-2 text-gray-600 text-sm">
//                         <MapPin className="w-4 h-4" />
//                         <p>{pharmacy.address}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-2xl font-bold text-teal-700">
//                         {pharmacy.distance}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 mb-4">
//                     <Clock className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm text-gray-600">{pharmacy.hours}</span>
//                     <span className="text-green-600 font-semibold text-sm ml-2">
//                       {pharmacy.status}
//                     </span>
//                   </div>

//                   <div className="flex gap-3">
//                     <button className="flex-1 border-2 border-teal-700 text-teal-700 py-2 rounded-lg font-semibold hover:bg-teal-50 transition flex items-center justify-center gap-2">
//                       <Navigation className="w-4 h-4" />
//                       Get Directions
//                     </button>
//                     <button className="flex-1 bg-teal-700 text-white py-2 rounded-lg font-semibold hover:bg-teal-800 transition flex items-center justify-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       {pharmacy.phone}
//                     </button>
//                   </div>

//                   <button className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-1">
//                     <AlertTriangle className="w-4 h-4" />
//                     Report an issue with this pharmacy
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {!location && <LocationModal />}
//     </div>
//   );
// }




import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Phone, Navigation, AlertTriangle } from 'lucide-react';
import maplibre from 'maplibre-gl';
import LocationModal from '@/components/HealthBloMe/LocationModal';

export default function PharmacyFinder() {
  const [location, setLocation] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [permissionState, setPermissionState] = useState(null);
  const [city, setCity] = useState(null)
  
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const pharmacies = [
    {
      id: 1,
      name: 'Aspen Medical Harbour City',
      distance: '0.6 km',
      address: '345 Champion Parade Suite A, Ground Floor Downtown, Port Moresby, National Capital District',
      hours: '0:00 AM - 12:00 PM',
      status: 'Open Now',
      phone: '675 321 0202',
      lat: 147.149695,
      lng: -9.477393
    },
    {
      id: 2,
      name: 'Chemcare Pharmacies',
      distance: '0.7 km',
      address: 'Lae, Mangola St Lae, Postal Address: PO Box 349 Lae MP',
      hours: '7:00 AM - 9:00 PM',
      status: 'Open Now',
      phone: '675 472 3730',
      lat: 146.990083,
      lng: -6.734794
    },
    {
      id: 3,
      name: 'Ela Medical Centre',
      distance: '1.1 km',
      address: 'Carpenters House, Waigani Drive, Port Moresby, Postal Address: PO Box 863 Boroko, NCD',
      hours: '8:00 AM - 10:00 PM',
      status: 'Open Now',
      phone: '675 325 3664',
      lat: 147.180183,
      lng: -9.435229
    },
    {
      id: 4,
      name: 'GM Flores Hospital',
      distance: '1.2 km',
      address: 'Lae, Section 2, Lot 38, Microbank Haus, 5th Street, Top Town, Postal Address: PO Box 675 Lae, MP',
      hours: '24 Hours',
      status: 'Open Now',
      phone: '7596028456',
      lat: 147.002688,
      lng: -6.729797
    }
  ];

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const myAPIKey = '9a0dd25b5e3645f59c8db86fac99a495'; 
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
 
    const map = new maplibre.Map({
      container: mapContainerRef.current,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [	147.18672410, -9.43409997],
      zoom: 13
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Add markers when map is ready or location changes
  useEffect(() => {
    if (!mapRef.current || !userCoords) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add user location marker
    const userMarker = document.createElement('div');
    userMarker.className = 'user-marker';
    userMarker.style.cssText = `
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #4F46E5;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    `;

    const userMapMarker = new maplibre.Marker({element: userMarker})
      .setLngLat([userCoords.longitude, userCoords.latitude])
      .addTo(mapRef.current);
    
    markersRef.current.push(userMapMarker);

    // Add pharmacy markers
    pharmacies.forEach((pharmacy) => {
      const el = document.createElement('div');
      el.className = 'pharmacy-marker';
      el.style.cssText = `
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #0D9488;
        border: 2px solid white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      `;
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

      el.addEventListener('click', () => {
        setSelectedPharmacy(pharmacy);
        mapRef.current.flyTo({
          center: [pharmacy.lng, pharmacy.lat],
          zoom: 15
        });
      });

      const marker = new maplibre.Marker({element: el})
        .setLngLat([pharmacy.lng, pharmacy.lat])
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    const bounds = new maplibre.LngLatBounds();
    bounds.extend([userCoords.longitude, userCoords.latitude]);
    pharmacies.forEach(p => bounds.extend([p.lng, p.lat]));
    
    mapRef.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 14
    });

  }, [userCoords]);

  const revealPosition = (position) => {
    const { latitude, longitude } = position.coords;
    console.log("User location:", latitude, longitude);
    setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
    setUserCoords({ latitude, longitude });

    // Update map center
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 14
      });
    }
  };

  const positionDenied = (error) => {
    console.error("Geolocation error:", error.message);
    setLocation("Permission denied or unavailable");
  };

  const handlePermission = () => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        console.log("Permission state:", result.state);
        setPermissionState(result.state);

        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(revealPosition, positionDenied);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(revealPosition, positionDenied);
        } else if (result.state === "denied") {
          setLocation("Permission denied");
        }

        result.addEventListener("change", () => {
          console.log("Permission changed to:", result.state);
          setPermissionState(result.state);
        });
      })
      .catch((err) => console.error("Permission API error:", err));
  };

  useEffect(() => {
    handlePermission();
  }, []);

  const handleGetDirections = (pharmacy) => {
    console.log(`userCoords: ${userCoords}, destination: ${pharmacy}`)
    if (userCoords) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userCoords.latitude},${userCoords.longitude}&destination=${pharmacy.lat},${pharmacy.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          Home &gt; <span className="text-teal-700">Pharmacy Nearby</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Pharmacies Near You</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Info Banner */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 shadow-md border border-orange-200">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-teal-700 w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Find Pharmacies Near You
                  </h3>
                  <p className="text-sm text-gray-600">
                    Locate the nearest pharmacy and check availability
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="text-teal-700 w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Check for item availability at nearby Pharmacies
                  </h3>
                  <p className="text-sm text-gray-600">
                    Real-time stock information
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
                <div className="h-12 mb-3 flex items-center justify-center bg-teal-700 text-white rounded font-bold text-xl">
                  PHARMACY 24/7
                </div>
                <div className="bg-orange-500 text-white rounded-lg px-4 py-2 text-center mb-2">
                  <p className="text-sm font-semibold">Unlock 10% Cashback on your Store Purchase</p>
                </div>
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                  Download Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Map & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location & Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="text-teal-700 w-5 h-5" />
                  <span className="font-semibold text-gray-800">
                    {location || "Detecting location..."}
                  </span>
                </div>
                <button 
                  onClick={handlePermission}
                  className="text-teal-700 font-semibold text-sm hover:text-teal-800"
                >
                  Refresh
                </button>
              </div>
              
              {/* Map Container */}
              <div className="relative h-64 w-full">
                <div 
                  className="absolute inset-0 w-full h-full" 
                  ref={mapContainerRef}
                />
                <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded shadow text-xs text-gray-600 z-10">
                  Map data ©2025
                </div>
              </div>
            </div>

            {/* Pharmacy Cards */}
            <div className="space-y-4 flex gap-5 flex-wrap">
              {pharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className={`bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition w-full lg:w-[calc(50%-0.625rem)] ${
                    selectedPharmacy?.id === pharmacy.id ? 'ring-2 ring-teal-700' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {pharmacy.name}
                      </h3>
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{pharmacy.address}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <span className="text-2xl font-bold text-teal-700">
                        {pharmacy.distance}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{pharmacy.hours}</span>
                    <span className="text-green-600 font-semibold text-sm ml-2">
                      {pharmacy.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleGetDirections(pharmacy)}
                      className="flex-1 border-2 border-teal-700 text-teal-700 py-2 rounded-lg font-semibold hover:bg-teal-50 transition flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                    <a
                      href={`tel:${pharmacy.phone}`}
                      className="flex-1 bg-teal-700 text-white py-2 rounded-lg font-semibold hover:bg-teal-800 transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {pharmacy.phone}
                    </a>
                  </div>

                  <button className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Report an issue with this pharmacy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {location === "Permission denied" && <LocationModal city={city} setCity={setCity} />}
    </div>
  );
}