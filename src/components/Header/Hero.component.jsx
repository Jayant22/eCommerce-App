import classes from './Hero.module.css';
import ProductImage from '../../assets/iphone.png';
import { RiShoppingBagFill } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Hero = () => {
  const transition = { duration: 3, type: 'spring' };
  return (
    <div className={classes.container}>
      <div className={classes.h_sides}>
        <span className={classes.hero_text1}>Technology Devices</span>
        <div className={classes.hero_text2}>
          <span>Trendy Collection</span>
          <span> Seedily Say has Suitable Tech and Devices</span>
        </div>
      </div>

      <div className={classes.wrapper}>
        <motion.div
          initial={{ bottom: '-2rem' }}
          whileInView={{ bottom: '0rem' }}
          transition={transition}
          className={classes.hero_circle}
        ></motion.div>

        <motion.img
          initial={{ bottom: '2rem' }}
          whileInView={{ bottom: '0rem' }}
          transition={transition}
          src={ProductImage}
          alt='Product Image'
          width={600}
        />

        <motion.div
          initial={{ right: '4%' }}
          whileInView={{ right: '2%' }}
          transition={transition}
          className={classes.cart2}
        >
          <RiShoppingBagFill />
          <div className={classes.signup}>
            <span>Best SignUp Offer</span>
            <div>
              <BsArrowRight />
            </div>
          </div>
        </motion.div>
      </div>

      <div className={classes.h_sides}>
        <div className={classes.traffic}>
          <span>1.5M</span>
          <span>Monthly Traffic</span>
        </div>

        <div className={classes.customers}>
          <span>100K</span>
          <span>Happy Customers</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
