import Directory from "../../directory/directory.component";
function Home() {

  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.pinimg.com/736x/e0/64/24/e0642448d35a3b67ecc1edb6b619eb44.jpg"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.pinimg.com/originals/3c/db/8f/3cdb8f70352b7962baef3a906c75ee1b.jpg"
    }
  ]

  return (
    <Directory categories={categories}/>
  );
}

export default Home;
