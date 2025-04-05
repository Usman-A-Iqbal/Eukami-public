import { FeaturedCollection } from "@/app/(Storefront)/components/featured-collection";
import StorefrontButton from "@/app/(Storefront)/components/storefront-button";
import { UniqueSellingPoint } from "@/app/(Storefront)/components/unique-selling-point";
import { getProducts } from "@/lib/supabase/actions";
import Image from "next/image";
import { BackButton } from "./BackButton";
import { ProductInfo } from "./ProductInfo";

const Sampleproduct = {
  name: "Fake Product 1",
  image: "/images/product1.png",
  price: 29,
  description:
    "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
  isFeatured: true,
  features:
    "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat. The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
};

const ProductDetailsPage = async ({ params }) => {
  const products = await getProducts();

  //params.productName comes in URL format so we have to convert it to a normalised format
  const product = products.find(
    (product) =>
      product.name.toLowerCase().trim() ===
      decodeURI(params.productName).toLowerCase().trim()
  );

  //recommended should be 3 random products that are not the current product
  const recommendedProducts = products
    .filter((p) => p.name !== product.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (!product) {
    // redirect("/");
    return <div>Product not found</div>;
  }
  return (
    <main className="py-16 space-y-16">
      <section className="container flex">
        <BackButton />
      </section>
      <ProductInfo product={product} />
      <ProductFeatures product={product} />
      <ProductImageGrid product={product} />
      <ProductRecommendations recommendedProducts={recommendedProducts} />
      <FeaturedCollection />
      <UniqueSellingPoint />
    </main>
  );
};

const ProductFeatures = ({ product }) => {
  return (
    <section className="container relative flex flex-col gap-16 lg:flex-row">
      <div className="w-full lg:w-3/4">
        <h2 className="text-3xl font-medium uppercase">Features</h2>
        <p className="pt-3 whitespace-pre-wrap text-onyx">{product.features}</p>
      </div>
    </section>
  );
};

const ProductImageGrid = ({ product }) => {
  return (
    <section className="container flex-col flex-wrap gap-6 lg:flex lg:flex-row">
      {product?.images?.map((image, i) => (
        <div key={i} className="relative bg-white rounded-lg w-96 h-96">
          <Image
            className="object-contain rounded-lg"
            src={image.publicUrl}
            fill
            alt=""
          />
        </div>
      ))}
    </section>
  );
};

const ProductRecommendations = ({ recommendedProducts }) => {
  return (
    <section className="container py-16 space-y-16">
      <h2 className="py-3 text-3xl font-medium text-center uppercase">
        You may also like
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recommendedProducts.map((product, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-6"
          >
            <Image
              className="object-cover w-4/5 rounded-md aspect-square"
              width={300}
              height={300}
              src={product.images[0]?.publicUrl}
              alt={product.name}
            />
            <h3 className="text-lg font-medium uppercase">{product.name}</h3>
            <StorefrontButton href={`/products/${product.name}`}>
              See Product
            </StorefrontButton>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
