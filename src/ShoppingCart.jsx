import React from 'react';
import './ShoppingCart.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const articles = [
  { id: 1, linkimg: "https://i.ebayimg.com/images/g/pnQAAOSwp1ZmMylA/s-l1600.jpg", title: 'Authentic PRADA Vintage Nylon Tessuto Shoulder Hand Bag Purse Black 2894J', excerpt: 'The Authentic PRADA Vintage Nylon Tessuto Shoulder Hand Bag Purse in black (model 2894J) features a sleek, minimalist design and durable nylon material, symbolizing luxury and timeless fashion.', URL: "https://www.ebay.com/itm/116225333161?itmmeta=01J11NSGM4XEVB6EH6CHD597FE&hash=item1b0f91d7a9:g:pnQAAOSwp1ZmMylA"  },
  { id: 2, linkimg: "https://i.ebayimg.com/images/g/tBAAAOSwQYhmc677/s-l1600.jpg", title: 'Authentic PRADA Leather Nappa Shoulder Hand Bag Purse Gold 7735J', excerpt: 'The Authentic PRADA Leather Nappa Shoulder Hand Bag Purse Gold 7735J features premium leather craftsmanship, a braided handle, and a refined gold hue, exuding luxury and elegance with signature branding.', URL: "https://www.ebay.com/itm/126539538911?itmmeta=01J11NSGM540HY3RSXHZK0SXT7&hash=item1d765821df:g:tBAAAOSwQYhmc677" },
  { id: 3, linkimg: "https://i.ebayimg.com/images/g/IZ0AAOSwDadmVYxL/s-l1600.jpg", title: 'Salvatore Ferragamo Gancini Hand Bag Leather Black Auth bs9434', excerpt: 'The Salvatore Ferragamo Gancini Hand Bag in black leather features a sophisticated design, dual handles, and an iconic gold Gancini clasp, representing authentic luxury with the serial number bs9434.', URL: "https://www.ebay.com/itm/305588987115?itmmeta=01J11NSJXWA17Y74AC2NTB17ZG&hash=item472685e4eb:g:IZ0AAOSwDadmVYxL" },
  { id: 4, linkimg: "https://i.ebayimg.com/images/g/6yQAAOSweMhmcNuO/s-l1600.jpg", title: 'MCM Boston Bag Brown PVC 1379624', excerpt: 'The MCM Boston Bag (model 1379624) is a stylish brown PVC handbag adorned with the iconic MCM monogram, featuring sturdy top handles, a detachable shoulder strap, and gold-tone hardware.', URL:  
 "https://www.ebay.com/itm/296510941003?itmmeta=01J11NSHHPHMR7YXF3AASJ67ZG&hash=item45096de74b:g:6yQAAOSweMhmcNuO"},
  { id: 5, linkimg: "https://i.ebayimg.com/images/g/KCUAAOSw4EFmb58K/s-l1600.jpg", title: 'Prada Tote Bag Blue Nylon 435139', excerpt: 'The Prada Tote Bag 435139 is a stylish and spacious blue nylon accessory featuring sturdy dual leather handles, durable construction, and the iconic Prada Milano logo.', URL: "https://www.ebay.com/itm/276512362165?itmmeta=01J11NSGM4S3YYQPM80SSGW91F&hash=item40616bceb5:g:KCUAAOSw4EFmb58K"},
  { id: 6, linkimg: "https://i.ebayimg.com/images/g/cuUAAOSwFRFmdWld/s-l1600.jpg", title: 'hermes birkin 25 swift black', excerpt: 'The Hermes Birkin 25 Swift in black is a luxurious, compact handbag made from smooth Swift leather, featuring gold hardware, double top handles, and a secure lock closure.', URL: "https://www.ebay.com/itm/166834514932?itmmeta=01J11P0QZS7AYAS3YEJBBATB4M&hash=item26d81cabf4:g:cuUAAOSwFRFmdWld" },
];


const ShoppingCart = () => {
  return (
    <div className="cart-container">
      <div className="cart-header-container">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="cart-logo" />
        </Link>
        <h1 className="cart-options-title">shopping cart</h1>
        <Link to="/shoppingcart">
          <img src="/shopcart.png" alt="shopcart" className="cart-shopcart" />
        </Link>
      </div>

      <div className="articles">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            className="article"
            initial={{
              opacity: 0,
              translateX: i % 2 === 0 ? -50 : 50,
              translateY: -50,
            }}
            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
          >
            <img src = {article.linkimg}></img>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <a href={article.URL} target="_blank" rel="noopener noreferrer">View Item</a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;

