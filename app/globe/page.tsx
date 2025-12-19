'use client';
import GetLocations from '@/lib/actions/get-locations';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Container from '../component/Container';


const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type LocationData = {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  tripId: string;
};

export default function GlobeComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await GetLocations();
      setLocations(data);
      console.log(data);
    }
    fetchLocations()

  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 600,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-8" ref={containerRef}>
        <div className="bg-white shadow-md p-5 rounded-lg z-10 relative">
          <h1 className=" text-2xl lg:text-4xl font-semibold text-center text-gray-800">
            Visualize All Your Completed Adventures
          </h1>
        </div>

        <div className="mb-15 rounded-xl overflow-hidden shadow-2xl bg-black border border-gray-800 cursor-move">
          <Globe
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            pointsData={locations}
            pointLat="lat"
            pointLng="lng"
            pointLabel="locationTitle"
            pointColor={() => '#ef4444'}
            pointAltitude={0.05}
            pointRadius={0.2}
            atmosphereColor="#7caeef"
            atmosphereAltitude={0.15}
          />
        </div>
      </div>
    </Container>
  );
}