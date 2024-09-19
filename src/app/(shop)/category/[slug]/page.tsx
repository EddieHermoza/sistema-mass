import {CATEGORIES} from "@/data/categories"


export default function Page({ params }: { params: { slug: string } }) {
    const category = CATEGORIES.find( category => category.slug === params.slug) 

    return (
        <main className="relative w-full">
            <section className="w-full flex-center">
                <h2>{category?.name}</h2>
            </section>
        </main>
    );
}