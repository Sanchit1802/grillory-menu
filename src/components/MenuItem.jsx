export default function MenuItem({ name, price, special }) {
  return (
    <div className={`item ${special == true ? "special" : ""}`}>
      <span>{name}</span>
      <span className="price">{price}</span>
    </div>
  );
}
