export default function PriceTag({ originalPrice, salePrice }) {
    const priceStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "red",
    };
    const salePriceStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "green",
    };
    return (
        <div style={priceStyle}>
            <p>{originalPrice}</p>
            <p style={salePriceStyle}>{salePrice}</p>
        </div>
    );
}   