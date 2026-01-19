import Banner from "./components/Banner";
import PageSection from "./components/PageSection";
import { menuData } from "./Data/MenuData";
import TopNav from "./components/TopNav";
export default function App() {
  return (
    <>
      <Banner />

      <div className="container">
        <TopNav sections={menuData.flatMap(page => page.sections)} />
        {menuData.map((page, index) => (
          <PageSection key={index} {...page} />
        ))}
      </div>

      <footer>
        <h3>Contact Us</h3>
        <p>Email: grilloryfood@gmail.com</p>
        <p>Mobile: 7055850243, 8958052628</p>
        <p style={{ fontSize: "12px", color: "#aaa" }}>
          All prices are in INR. Taxes extra if applicable.
        </p>
      </footer>
    </>
  );
}