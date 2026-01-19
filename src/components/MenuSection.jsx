import MenuItem from "./MenuItem";

export default function MenuSection({ id, title, image, qtyNote, items }) {
  return (
    <div className="section" id={id}>
      <h2>{title}</h2>

      {qtyNote && <div className="qty-badge">{qtyNote}</div>}

      <img src={image} alt={title} loading="lazy" />

      {items.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          price={item.price}
          special={item.special}
        />
      ))}
    </div>
  );
}
