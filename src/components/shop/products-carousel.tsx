
import { MdOutlineShoppingCart } from "react-icons/md";
import { products } from "@/data/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {AddCartProductButton} from "../cart/add-product-button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";

export function ProductsCarousel() {
    return (
        <Carousel
            className="w-full"
            opts={{
                align: "start",
                dragFree: true
            }} >
            <CarouselContent className="-ml-2 md:-ml-5">
                {products.map((product, index) => (
                    <CarouselItem key={index} className={`pl-2 md:pl-5 basis-[65%] xs:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 `}>

                        <Card className="p-3 h-80 relative flex flex-col justify-between">
                            <CardHeader className="p-0">
                                <CardTitle className="text-base">{product.name}</CardTitle>
                                <CardDescription className="text-lg">2x1</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 py-2 flex-center">
                                <Image src={"/CocaColaCombo.webp"} width={160} height={160} alt="Coca Cola Combo" />
                            </CardContent>
                            <CardFooter className="p-0 flex justify-between">
                                <span className="leading-none">S/ {product.price}</span>
                                <AddCartProductButton product={product}/>
                            </CardFooter>
                        </Card>

                    </CarouselItem>
                ))}

            </CarouselContent>
            <div className="max-sm:hidden">
                <CarouselPrevious className="p-2 w-12 rounded-none border-none h-full group hover:bg-secondary dark:hover:text-primary disabled:text-muted-foreground" iconClassName="h-10 w-10 group-hover:scale-110 duration-200" />
                <CarouselNext className="p-2 w-12 rounded-none border-none h-full group hover:bg-secondary dark:hover:text-primary disabled:text-muted-foreground" iconClassName="h-10 w-10 group-hover:scale-110 duration-200" />
            </div>
        </Carousel>
    );
}