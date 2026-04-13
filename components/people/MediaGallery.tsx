"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { PersonMedia } from "@/lib/types";

interface MediaGalleryProps {
  media: PersonMedia;
  name: string;
}

export function MediaGallery({ media, name }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const photos = media.photos ?? [];
  const videos = media.videos ?? [];

  if (photos.length === 0 && videos.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-grey-700">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-cream">
          Photos &amp; Videos
        </h2>
        <div className="flex gap-4">
          {photos.length > 0 && (
            <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">
              {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
            </span>
          )}
          {videos.length > 0 && (
            <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">
              {videos.length} {videos.length === 1 ? "Video" : "Videos"}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {/* Photos */}
        {photos.map((src, i) => (
          <button
            key={`photo-${i}`}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
          >
            <Image
              src={src}
              alt={`${name} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}

        {/* Videos */}
        {videos.map((video, i) => (
          <a
            key={`video-${i}`}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-grey-900"
          >
            {video.thumbnail ? (
              <Image
                src={video.thumbnail}
                alt={video.title ?? `${name} video ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-grey-900 to-grey-800">
                <Play size={32} className="text-grey-600" />
              </div>
            )}
            {/* Play badge */}
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
              <Play size={10} className="text-white fill-white" />
              <span className="font-mono text-[10px] text-white uppercase tracking-wider">Video</span>
            </div>
            {video.title && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
                <p className="text-xs text-white truncate">{video.title}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      {/* Lightbox for photos only */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={photos.map((src) => ({ src }))}
      />
    </div>
  );
}
