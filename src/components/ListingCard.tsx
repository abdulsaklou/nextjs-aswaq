'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import LikeButton from "@/components/LikeButton"
import Image from "next/image"
import ImageNavigation from "@/components/ImageNavigation"
import Link from "next/link"
import { formatDistance } from "date-fns"

export interface ListingCardProps {
  photos: string[]
  title: string
  slug: string
  price: number | string
  location: string
  timestamp: string
  currency?: string
  className?: string
  onLike?: (isLiked: boolean) => void
  initialLiked?: boolean
  aspectRatio?: "square" | "video" | "portrait"
  priceFormatter?: (price: number | string) => string
}

const ASPECT_RATIOS = {
  square: "h-[400px]",
  video: "h-[300px]",
  portrait: "h-[500px]"
}

export default function ListingCard({
  photos,
  title,
  slug,
  price,
  location,
  timestamp,
  currency = "AED",
  className = "",
  onLike,
  initialLiked = false,
  aspectRatio = "square",
  priceFormatter = (price) => `${currency} ${price.toLocaleString()}`
}: ListingCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  return (
    <Card className={`w-full max-w-md overflow-hidden rounded-3xl shadow-none ${className}`}>
      <div className="relative">
        <Image
          src={`${photos[currentPhotoIndex]}`}
          alt={`Photo ${currentPhotoIndex + 1} of ${title}`}
          width={400}
          height={400}
          className={`object-cover w-full rounded-3xl ${ASPECT_RATIOS[aspectRatio]}`}
        />
        <div className="absolute top-4 right-4 z-20">
          <LikeButton
            initialLiked={initialLiked}
            onLike={onLike}
            size="lg"
          />
        </div>

        <ImageNavigation
          total={photos.length}
          current={currentPhotoIndex}
          onNext={nextPhoto}
          onPrev={prevPhoto}
          onDotClick={setCurrentPhotoIndex}
          className="z-10"
          arrowVisible={true}
        />
      </div>
      <Link href={`/listings/${slug}`}>
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold">{priceFormatter(price)}</h2>
          <h3 className="text-lg font-medium mt-2">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{location}</p>
          <p className="text-xs text-gray-500 mt-2">
            {formatDistance(new Date(timestamp), new Date(), { addSuffix: true })}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}