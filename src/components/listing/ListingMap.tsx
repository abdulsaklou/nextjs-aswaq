'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

interface ListingMapProps {
  location: string
  latitude?: number | null
  longitude?: number | null
  title: string
}

export function ListingMap({ location, latitude, longitude }: ListingMapProps) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(
    latitude && longitude ? { lat: latitude, lng: longitude } : null
  )
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)

      import('leaflet').then((L) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/marker-icon-2x.png',
          iconUrl: '/leaflet/marker-icon.png',
          shadowUrl: '/leaflet/marker-shadow.png',
        })
      });
    }
  }, [])

  useEffect(() => {
    if (!coordinates) {
      // Only geocode if we don't have coordinates
      const geocodeLocation = async () => {
        try {
          const params = new URLSearchParams({ q: `${location}, UAE` })
          const response = await fetch(`/api/geocode?${params}`)
          const data = await response.json()

          if (data && data[0]) {
            const { lat, lon } = data[0]
            setCoordinates({
              lat: parseFloat(lat),
              lng: parseFloat(lon)
            })
          }
        } catch (error) {
          console.error('Geocoding error:', error)
        }
      }

      geocodeLocation()
    }
  }, [location, coordinates])

  if (!coordinates || !isClient) {
    return (
      <Card className="mt-8">
        <div className="h-[300px] w-full rounded-lg bg-muted animate-pulse" />
      </Card>
    )
  }

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]} />
      </MapContainer>
    </div>
  )
}