import Image from "next/image";

export default function ProductCard({ productData }) {

    const { image_url, code, brands, categories, generic_name_fr, stores, quantity } = productData

    function renderProductName(productData) {
        return productData.product_name_fr || productData.product_name || productData.product_name_fr_imported;
    }

    return (
        <div>
            <h1>
                {renderProductName(productData)}
            </h1>
            <Image
                src={image_url}
                alt="Product Image"
                height={200}
                width={200}
                style={{ objectFit: "contain" }}
            />
            {code && <p>Code: {code}</p>}
            {brands && <p>Brands: {brands}</p>}
            {quantity && <p>Quantity: {quantity}</p>}
            {generic_name_fr && <p>Generic Name: {generic_name_fr}</p>}
            {categories && <p>Categories: {categories}</p>}
            {stores && <p>Stores: {stores}</p>}
        </div>
    );
}