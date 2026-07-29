import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import {
  provinces as mockProvinces,
  plants as mockPlants,
  molecules as mockMolecules,
} from '../data/mockData';

export function useAtlasData() {
  const [provinces, setProvinces] = useState(mockProvinces);
  const [plants, setPlants] = useState(mockPlants);
  const [molecules, setMolecules] = useState(mockMolecules);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('mock');

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [provRes, plantRes, molRes] = await Promise.allSettled([
          apiService.getProvinces(),
          apiService.getPlants(),
          apiService.getMolecules(),
        ]);

        if (cancelled) return;

        if (provRes.status === 'fulfilled' && provRes.value?.data?.length) {
          setProvinces(provRes.value.data);
          setSource('api');
        }
        if (plantRes.status === 'fulfilled' && plantRes.value?.data?.length) {
          setPlants(plantRes.value.data);
        }
        if (molRes.status === 'fulfilled' && molRes.value?.data?.length) {
          setMolecules(molRes.value.data);
        }
      } catch {
        // Mock data already loaded as fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  const getPlantsByProvince = useCallback(
    (provinceId) => plants.filter((p) => p.provinceId === provinceId),
    [plants]
  );

  return { provinces, plants, molecules, loading, source, getPlantsByProvince };
}
