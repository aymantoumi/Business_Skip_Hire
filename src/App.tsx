
import { useEffect, useState } from 'react';

interface Bin {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number;
  per_tonne_cost: number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export default function Home() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchBins() {
      try {
        const res = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        const data = await res.json();
        if (res.ok) {
          setBins(data);
        } else {
          setError(data.error || 'Failed to fetch bins');
        }
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchBins();
  }, []);

  const handleSelectBin = (bin: Bin) => {
    if (selectedBin?.id === bin.id) {
      setIsVisible(false);
      setTimeout(() => setSelectedBin(null), 300);
    } else {
      setSelectedBin(bin);
      setIsVisible(true);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className='py-6 dark:bg-gray-950'>
        <nav className="flex justify-center py-4">
          <div className="w-full max-w-5xl px-4">
            <div className="flex items-start justify-between relative">
              <div className="flex flex-col items-center w-full">

                <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="text-center font-semibold">
                  <p className='dark:text-gray-50' >Location</p>
                  <p className="text-sm text-gray-500">Choose address</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-full">
                <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
                  <i className="fa-solid fa-trash-can"></i>
                </div>
                <div className="text-center font-semibold">
                  <p className='dark:text-gray-50' >Waste Type</p>
                  <p className="text-sm text-gray-500">Select waste</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-full">
                <div className="bg-blue-600 text-white p-4 rounded-full mb-2">
                  <i className="fa-solid fa-truck-moving"></i>
                </div>
                <div className="text-center font-semibold">
                  <p className='dark:text-gray-50' >Delivery</p>
                  <p className="text-sm text-gray-500">Truck on the way</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-full opacity-50">
                <div className="bg-gray-300 text-gray-500 p-4 rounded-full mb-2">
                  <i className="fa-solid fa-shield"></i>
                </div>
                <div className="text-center font-semibold">
                  <p className='dark:text-gray-50' >Safety</p>
                  <p className="text-sm text-gray-400">Confirm safety</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-full opacity-50">
                <div className="bg-gray-300 text-gray-500 p-4 rounded-full mb-2">
                  <i className="fa-solid fa-calendar"></i>
                </div>
                <div className="text-center font-semibold">
                  <p className='dark:text-gray-50' >Schedule</p>
                  <p className="text-sm text-gray-400">Pick date</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-full opacity-50">
                <div className="bg-gray-300 text-gray-500 p-4 rounded-full mb-2">
                  <i className="fa-regular fa-credit-card"></i>
                </div>
                <div className="text-center font-semibold">
                  <p className='dark:text-gray-50' >Payment</p>
                  <p className="text-sm text-gray-400">Complete payment</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-xl font-extrabold dark:text-gray-50'>Choose Your Skip Size</h1>
          <h1 className='dark:text-gray-50'>Select the skip size that best suits your needs</h1>
        </div>
        <section className='xl:py-16 2xl:px-72'>
          <div className='grid justify-center lg:grid-cols-2 2xl:grid-cols-3 gap-y-8'>
            {bins.map((bin) => (
              <div
                key={bin.id}
                className="relative group rounded-xl overflow-hidden bg-gray-200 shadow-lg w-96 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${bin.size}-yarder-skip.jpg`}
                    alt={`${bin.size}-yarder skip`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:blur-sm group-hover:opacity-90"
                  />

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-xl font-bold text-gray-900">{bin.size} Yard Skip</h3>
                    <p className="text-sm text-gray-900">{bin.hire_period_days} day hire period</p>
                  </div>

                  {!bin.allowed_on_road && (
                    <div className="absolute top-2 right-2 bg-yellow-300 text-gray-950 text-xs font-bold px-2 py-1 rounded">
                      Not Allowed On The Road
                    </div>
                  )}
                </div>

                <div className="relative p-4 dark:bg-gray-600 bg-gray-100 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl dark:text-gray-100 text-gray-800">
                      £{(bin.price_before_vat * (1 + bin.vat / 100)).toFixed(0)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectBin(bin)}
                    className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out relative z-10"
                  >
                    {selectedBin?.id === bin.id ? 'Deselect' : 'Select This Skip'}
                  </button>

                  <div className="absolute inset-0 bg-blue-600 -z-10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {selectedBin && (
        <div
          className={`fixed top-6 right-6 z-50 w-80 transform transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="group rounded-xl overflow-hidden bg-white shadow-lg w-full flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Your Selection</h2>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedBin.size} Yard Skip</h3>
              <p className="mb-1 text-gray-700">Hire Period: {selectedBin.hire_period_days} days</p>
              <p className="mb-1 text-gray-700">
                Total Price:{' '}
                £{(selectedBin.price_before_vat * (1 + selectedBin.vat / 100)).toFixed(2)}
              </p>
              <button
                onClick={() => handleSelectBin(selectedBin)}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}