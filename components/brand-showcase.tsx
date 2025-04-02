import Image from "next/image"

export default function BrandShowcase() {
  const brands = [
    { name: "Adidas", logo: "/brands/adidas.svg" },
    { name: "Nike", logo: "/brands/nike.svg" },
    { name: "Huawei", logo: "/brands/huawei.svg" },
    { name: "HP", logo: "/brands/hp.svg" },
    { name: "Dell", logo: "/brands/dell.svg" },
    { name: "Microsoft", logo: "/brands/microsoft.svg" },
  ]

  return (
    <section className="py-12 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Official Brand Partner</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            We're proud to offer authentic products from these leading brands
          </p>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center p-4">
              <div className="relative h-12 w-24 overflow-hidden grayscale transition-all hover:grayscale-0">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

