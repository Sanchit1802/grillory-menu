import momos from "../assets/momos.jpg";
import fries from "../assets/fries2.jpg";
import soup from "../assets/soup.jpg";
import noodles from "../assets/noodles.jpg";
import rice from "../assets/rice.jpg";
import snacks from "../assets/snacks.jpg";
import potato from "../assets/potato.jpg";
import paneer from "../assets/paneer-tikka.jpg";
import pasta from "../assets/pasta.jpg";
import burger from "../assets/burger.jpg";
import desert from "../assets/desert.jpg";
import drinks from "../assets/drinks.jpg";

export const menuData = [
  {
    PageTitle: "Starters",
    sections: [
      {
        id: "momos",
        title: "Momos",
        image: momos,
        qtyNote: "Half: 5 pcs | Full: 10 pcs",
        items: [
          { name: "Veg Steam Momos", price: "₹49 / ₹89" },
          { name: "Paneer Steam Momos", price: "₹59 / ₹109" },
          { name: "Kurkure Veg Momos", price: "₹89 / ₹179" },
          { name: "Kurkure Paneer Momos", price: "₹99 / ₹189" },
          {
            name: "Grillory Special KFC Momos",
            price: "– / ₹189",
            special: true,
          },
        ],
      },
      {
        id: "fries",
        title: "Fries",
        image: fries,
        items: [
          { name: "French Fries", price: "₹79" },
          { name: "Peri Peri Fries", price: "₹89" },
          { name: "Crushers Fries", price: "₹89" },
          { name: "Peri Peri Crushers", price: "₹99" },
          { name: "McCain Smiley Peri Peri", price: "₹99" },
        ],
      },
      {
        id: "soup",
        title: "Soup",
        image: soup,
        items: [
          { name: "Tomato Soup", price: "₹79" },
          { name: "Sweet Corn Soup", price: "₹89" },
          { name: "Manchow Soup", price: "₹99" },
          { name: "Lung Fung Soup", price: "₹99" },
          { name: "Hot & Sour Soup", price: "₹99" },
        ],
      },
    ],
  },

  {
    PageTitle: "Chinese",
    sections: [
      {
        id: "noodles",
        title: "Noodles",
        image: noodles,
        items: [
          { name: "Veg Noodles", price: "₹49 / ₹99" },
          { name: "Hakka Noodles", price: "₹79 / ₹149" },
          { name: "Singapore Noodles", price: "₹89 / ₹169" },
          { name: "Schezwan Noodles", price: "₹69 / ₹129" },
          { name: "Chilli Garlic Noodles", price: "₹69 / ₹129" },
          {
            name: "Grillory Special Noodles",
            price: "– / ₹169",
            special: true,
          },
        ],
      },
      {
        id: "rice",
        title: "Rice",
        image: rice,
        items: [
          { name: "Veg Fried Rice", price: "₹69" },
          { name: "Mushroom Rice", price: "₹89" },
          { name: "Chilli Garlic Rice", price: "₹79" },
          { name: "Schezwan Rice", price: "₹79" },
          { name: "Paneer Fried Rice", price: "₹99" },
        ],
      },
      {
        id: "snacks",
        title: "Snacks",
        image: snacks,
        items: [
          { name: "Chilli Paneer Dry", price: "₹129 / ₹219" },
          { name: "Chilli Paneer Gravy", price: "₹139 / ₹229" },
          { name: "Manchurian Dry", price: "– / ₹139" },
          { name: "Manchurian Gravy", price: "– / ₹149" },
          { name: "Chilli Mushroom", price: "– / ₹139" },
          { name: "Chilli Crispy Corn", price: "– / ₹129" },
          {
            name: "Paneer 65 (Special)",
            price: "– / ₹199",
            special: true,
          },
        ],
      },
      {
        id: "potato",
        title: "Potato",
        image: potato,
        items: [
          { name: "Chilli Potato", price: "₹79 / ₹149" },
          { name: "Honey Chilli Potato", price: "₹89 / ₹159" },
        ],
      },
    ],
  },

  {
    PageTitle: "Tandoor & Café",
    sections: [
      {
        id: "paneer",
        title: "Tandoori Paneer",
        image: paneer,
        items: [
          { name: "Paneer Tikka", price: "₹139 / ₹239" },
          { name: "Malai Paneer Tikka", price: "₹149 / ₹239" },
          { name: "Afghani Paneer Tikka", price: "₹149 / ₹239" },
          { name: "Garlic Paneer Tikka", price: "₹139 / ₹229" },
          {
            name: "Grillory Special Paneer Tikka",
            price: "– / ₹219",
            special: true,
          },
        ],
      },
      {
        id: "pasta",
        title: "Pasta",
        image: pasta,
        items: [
          { name: "Red Sauce Pasta", price: "₹79 / ₹139" },
          { name: "White Sauce Pasta", price: "₹99 / ₹179" },
          { name: "Pink Sauce Pasta", price: "₹89 / ₹159" },
        ],
      },
      {
        id: "burger",
        title: "Burger",
        image: burger,
        items: [
          { name: "Veg Burger", price: "₹49" },
          { name: "Cheese Burger", price: "₹69" },
          { name: "Grillory Jumbo Burger", price: "₹99" },
        ],
      },
      {
        id: "dessert",
        title: "Dessert & Breads",
        image: desert,
        items: [
          { name: "Rumali Roti", price: "₹10" },
          { name: "Butter Rumali Roti", price: "₹15" },
          { name: "Choco Lava Cake", price: "₹49" },
        ],
      },
      {
        id: "drinks",
        title: "Drinks",
        image: drinks,
        items: [
          { name: "Packaged Drinking Water", price: "On MRP" },
          { name: "Thumbs Up", price: "On MRP" },
          { name: "Limca", price: "On MRP" },
          { name: "Sprite", price: "On MRP" },
          { name: "Mirinda", price: "On MRP" },
          { name: "Maaza", price: "On MRP" },
          { name: "Red Bull", price: "On MRP" },
          { name: "Nescafe Cold Coffee (Can)", price: "On MRP" },
        ],
      },
    ],
  },
];
