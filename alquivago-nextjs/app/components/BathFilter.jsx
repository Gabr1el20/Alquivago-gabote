import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Bathbutton({ filters, setFilters }) {
  const [visible, setVisible] = useState('hidden')
  const router = useRouter();
  const pathName = usePathname();

  function handleVisibility() {
    if (visible === 'hidden') {
      setVisible('flex')
    } else setVisible('hidden')
  }

  const handleClick = (e) => {
    const value = e.target.value;
  
    if (filters.includes(value)) {
      setFilters(filters.filter((filter) => filter !== value));
    } else {
      const hasVivienda = filters.find((filter) => filter.startsWith('baños='));
  
      if (hasVivienda) {
        const existingValues = hasVivienda.split('=')[1].split(',');
        if (!existingValues.includes(value.split('=')[1])) {
          const updatedFilter = `baños=${existingValues.join(',')},${value.split('=')[1]}`;
          setFilters(filters.map((filter) => (filter.startsWith('baños=') ? updatedFilter : filter)));
        }
      } else {
        setFilters([...filters, value]);
      }
    }
  };
  function applyFilters() {
    if (filters.length === 0) {
      if (pathName.includes("moneda=UYU")) {
        return router.push('moneda=UYU')
      }
      else if (pathName.includes("moneda=USD")) {
        return router.push('moneda=USD')
      }
      else {
        return router.push('/publish')
    }
  }
    if (pathName.includes('moneda=UYU')) {
      return router.push(`/publish/moneda=UYU&baños=${filters.join(',')}`)
    }
    else if (pathName.includes('moneda=USD')) {
      return router.push(`/publish/moneda=USD&baños=${filters.join(',')}`)
    }
    return router.push(`baños=${filters.join(',')}`)
  }

  return (
    <div className="flex flex-col gap-1 w-1/6">
      <button className="font-medium text-lg bg-white rounded-md shadow py-2 hover:bg-slate-200 transition" onClick={handleVisibility}>Baños</button>
      <div className={`${visible} flex flex-col w-full border-2 border-slate-300 rounded-lg bg-white shadow-lg`}>
        <ul>
          <li className="py-2 text-lg font-medium hover:bg-slate-200 rounded-lg transition">
            <input className="mx-2 w-8" type="checkbox" value="baños=1" onClick={handleClick} />
            1 Baño
          </li>
          <li className="py-2 text-lg font-medium hover:bg-slate-200 rounded-lg transition">
            <input className="mx-2 w-8" type="checkbox" value="baños=2" onClick={handleClick}/>
            2 baños
          </li>
          <li className="py-2 text-lg font-medium hover:bg-slate-200 rounded-lg transition">
            <input className="mx-2 w-8" type="checkbox" value="baños=3" onClick={handleClick} />
            2+baños
          </li>
        </ul>
        <button className="bg-[#CDBC82] rounded-xl hover:scale-110 transition py-3 text-white text-lg font-medium" onClick={applyFilters}>Aplicar filtros</button>
      </div>
    </div>
  );
}
