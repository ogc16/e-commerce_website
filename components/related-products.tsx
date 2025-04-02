import ProductCard from "./product-card"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  // In a real app, you would fetch related products based on the category and exclude the current product
  const relatedProducts = [
    {
      id: "101",
      name: "Canvas Backpack",
      price: 79.99,
      image: "/products/canvas-backpack.png",
      category: "Bags",
    },
    {
      id: "102",
      name: "Travel Duffel Bag",
      price: 89.99,
      image: "/products/travel-duffel.png",
      category: "Bags",
      discount: 15,
    },
    {
      id: "103",
      name: "Messenger Bag",
      price: 69.99,
      image: "/products/messenger-bag.png",
      category: "Bags",
    },
    {
      id: "104",
      name: "Laptop Sleeve",
      price: 29.99,
      image: "/products/laptop-sleeve.png",
      category: "Bags",
    },
  ].filter((product) => product.id !== currentProductId)

  return (
    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {relatedProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
          discount={product.discount}
        />
      ))}
    </div>
  )
}

