import { Link } from 'react-router-dom'

import $ from "./Header.module.css";

const Header = () => {
  return (
    <header className={$.header}>
        <Link className={$.link} to="/" >
            <img 
                className={$.logo} 
                alt="news.com.au — Australia’s leading news site"
                src="https://www.news.com.au/wp-content/themes/newscorpau-news-dna/dist/images/logos/news-be-on-it.svg"
                width="238"
                height="48"/>
        </Link>
    </header>
  );
};

export default Header;
