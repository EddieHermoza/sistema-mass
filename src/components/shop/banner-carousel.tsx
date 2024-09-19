import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
export default function BannerCarousel() {
    return (
        <Carousel className="w-full"  
            opts={{
                align: "start",
            }} >
            <CarouselContent>
                <CarouselItem>
                    <Image src={"/MapaMass.webp"} width={1800} height={760} alt=""/>
                </CarouselItem>
                <CarouselItem>
                    <Image src={"/MapaMass.webp"} width={1800} height={760} alt=""/>
                </CarouselItem>
                <CarouselItem>
                    <Image src={"/MapaMass.webp"} width={1800} height={760} alt=""/>
                </CarouselItem>
            </CarouselContent>

            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    );
}