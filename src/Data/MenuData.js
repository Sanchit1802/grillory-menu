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
import rolls from "../assets/rolls.webp";
import kfcVeg from "../assets/kfcveg.jpg";
import breads from "../assets/breads.webp";
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
      {
        id: "rolls",
        title: "Rolls",
        image: rolls,
        qtyNote: "Half: 2 pcs | Full: 4 pcs",
        items: [
          { name: "Veg Spring Roll", price: "₹59 / ₹99" },
          { name: "Cheese Corn Roll", price: "₹89 / ₹179" },
        ],
      },
      {
        id: "kfc veg",
        title: "KFC Veg",
        image: kfcVeg,
        items: [
          { name: "KFC Roll", price: "₹129" },
          { name: "KFC Paneer", price: "₹149" },
          { name: "KFC Momos (8 pcs)", price: "₹149" },
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
            price: "– / ₹229",
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
            price: "– / ₹249",
            special: true,
          },
        ],
      },
      {
        id: "breads",
        title: "Breads",
        image: breads,
        items: [
          { name: "Tandoori Roti", price: "₹10" },
          { name: "Butter Roti", price: "₹15" },
        ],
      },
      {
        id: "pasta",
        title: "Pasta",
        image: pasta,
        items: [
          { name: "Red Sauce Pasta", price: "₹79 / ₹139" },
          { name: "Alfredo Pasta (White)", price: "₹99 / ₹179" },
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
    ],
  },
  {
    PageTitle: "Drinks & Desert",
    sections: [
      {
        id: "drinks",
        title: "Drinks",
        image: drinks,
        items: [
          { name: "Mineral Water", price: "On MRP" },
          { name: "Cold Drinks", price: "On MRP" },
          { name: "Red Bull", price: "On MRP" },
          { name: "Hell", price: "On MRP" },
          { name: "Nescafe Cold Coffee (Can)", price: "On MRP" },
          { name: "Shikanji", price: "On MRP" },
          { name: "Red Bull", price: "On MRP" },
          { name: "Mint Mojito", price: "₹99" },
          { name: "Pineapple Mojito", price: "₹99" },
          { name: "Blue Lagoon Mojito", price: "₹99" },
        ],
      },
      {
        id: "dessert",
        title: "Desserts",
        image: desert,
        items: [
          { name: "Choco Lava Cake", price: "₹49" },
          { name: "Gulab Jamun", price: "₹29" },
        ],
      },
    ],
  },
];