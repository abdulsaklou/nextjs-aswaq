// components/listing/steps/LocationSelector.tsx
'use client'

import { useEffect } from 'react'
import { useLocationStore } from '@/hooks/use-location-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Location } from '@/types/location'
import { useTranslation } from '@/hooks/use-translation'
import { Languages } from '@/constants/enums'

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
  error?: string;
  selectedLocationId?: string;
}

export function LocationSelector({ onLocationSelect, error, selectedLocationId }: LocationSelectorProps) {
  const { t, locale } = useTranslation()
  
  const {
    countries,
    cities,
    selectedCountry,
    selectedCity,
    fetchLocations,
    setSelectedCountry,
    setSelectedCity,
    isLoadingCountries,
    isLoadingCities
  } = useLocationStore()

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  // Initialize selection if selectedLocationId is provided
  useEffect(() => {
    if (selectedLocationId) {
      // Find the location and set the country/city accordingly
      const city = Object.values(cities).flat().find(city => city.id === selectedLocationId)
      if (city && city.parent_id) {
        setSelectedCountry(city.parent_id)
        setSelectedCity(city.id)
      }
    }
  }, [selectedLocationId, cities, setSelectedCountry, setSelectedCity])

  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId)
    setSelectedCity(null) // Reset city when country changes
  }

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId)
    const selectedCity = cities[selectedCountry!]?.find(city => city.id === cityId)
    if (selectedCity) {
      onLocationSelect(selectedCity)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t.listings.location.country}</Label>
        <Select
          value={selectedCountry || ''}
          onValueChange={handleCountryChange}
          disabled={isLoadingCountries}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.listings.location.selectCountry} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {locale === Languages.ARABIC && country.name_ar ? country.name_ar : country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <Label>{t.listings.location.city}</Label>
          <Select
            value={selectedCity || ''}
            onValueChange={handleCityChange}
            disabled={isLoadingCities}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.listings.location.selectCity} />
            </SelectTrigger>
            <SelectContent>
              {cities[selectedCountry]?.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {locale === Languages.ARABIC && city.name_ar ? city.name_ar : city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}