
import { Card, CardContent } from "@/shared/ui/native/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/shared/ui/native/carousel"
import { Progress } from "@/shared/ui/native/progress"
import { EmblaCarouselType } from 'embla-carousel'
import { useEffect, useState, useCallback } from "react"

export const TrendingCarousel = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  const onScroll = useCallback((api: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, api.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!api) return

    onScroll(api)
    api
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll)
  }, [api, onScroll])

  const renderSliderItems = Array.from({ length: 10 }).map((_, index) => {
    return (
      <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-[70rem]">
        <div className="p-1 h-[30rem] justify-center">
          <Card className="h-5/6 flex justify-center items-center">
            <CardContent className="flex items-center justify-center align-center p-3">
              <span className="text-2xl font-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>)
  })

  const progressItem = <Progress className="w-3/4 m-auto mt-1" value={scrollProgress} />


  return (
    <Carousel setApi={setApi} className="w-3/4 m-auto mt-3">
      <CarouselContent className="-ml-1">
        {renderSliderItems}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {progressItem}
    </Carousel>
  )

}