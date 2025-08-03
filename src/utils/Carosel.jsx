import * as React from "react"
import {
  Carousel as CarouselPrimitive,
  CarouselContent as CarouselContentPrimitive,
  CarouselItem as CarouselItemPrimitive,
} from "@radix-ui/react-carousel"

import { cn } from "@/lib/utils"

const Carousel = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselPrimitive
    ref={ref}
    className={cn("relative w-full", className)}
    {...props}
  />
))
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselContentPrimitive
    ref={ref}
    className={cn("flex -ml-4", className)}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselItemPrimitive
    ref={ref}
    className={cn("pl-4", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

export { Carousel, CarouselContent, CarouselItem }
