import { useCallback } from 'react'
import NextImage, {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image'

// https://davidgomes.com/pick-omit-over-union-types-in-typescript/
type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never

export type ImageLayout = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

export type AspectRatio = '16:9' | '4:3' | '1:1' | '3:2' | '9:12'

export type ImageFit = 'pad' | 'fill' | 'scale' | 'crop' | 'thumb'

type ImageProps = {
  width: number
  height?: never
  layout: ImageLayout
  aspectRatio: AspectRatio
  fit?: ImageFit
} & DistributiveOmit<NextImageProps, 'height'>

export function Image({
  width,
  fit = 'fill',
  aspectRatio,
  ...nextImageProps
}: ImageProps) {
  const height = calcAspectRatio(aspectRatio, width)

  const imageLoader = useCallback(
    (args: ImageLoaderProps): string => {
      const loaderHeight = calcAspectRatio(aspectRatio, args.width)

      return `${args.src}?w=${args.width}&h=${loaderHeight}&fit=${fit}`
    },
    [aspectRatio, fit]
  )

  return (
    <NextImage
      {...nextImageProps}
      width={width}
      height={height}
      loader={imageLoader}
    />
  )
}

const aspectRatioToRatio: Record<AspectRatio, number> = {
  '1:1': 1,
  '16:9': 9 / 16,
  '4:3': 3 / 4,
  '3:2': 2 / 3,
  '9:12': 12 / 9,
}

function calcAspectRatio(aspectRatio: AspectRatio, width: number) {
  const ratio = aspectRatioToRatio[aspectRatio]

  return Math.floor(width * ratio)
}
