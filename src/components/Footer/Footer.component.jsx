import classes from './Footer.module.css';
import Logo from '../../assets/logo.png';

import {
  InboxIcon,
  LocationMarkerIcon,
  PhoneIcon,
  LoginIcon,
  UsersIcon,
  LinkIcon
} from '@heroicons/react/outline';

const Footer = () => {
  return (
    <div className={classes.cFooterWrapper}>
      <hr />
      <div className={classes.cFooter}>
        <div className={classes.logo}>
          <img src={Logo} alt='Company Logo' />
          <span>E - Commerce App</span>
        </div>
        <div className={classes.block}>
          <div className={classes.detail}>
            <span>Contact Us</span>

            <span className={classes.pngLine}>
              <LocationMarkerIcon className={classes.icon} />
              <span>Pragati Indl. Lower Parel, Mumbai</span>
            </span>

            <span className={classes.pngLine}>
              {' '}
              <PhoneIcon className={classes.icon} />
              <a href='tel: 9372612340'>+91 93726-12340</a>
            </span>

            <span className={classes.pngLine}>
              <InboxIcon className={classes.icon} />
              <a href='mailto: jayantkodam2322@gmail.com'>
                {' '}
                jayantkodam2322@gmail.com{' '}
              </a>
            </span>
          </div>
        </div>
        <div className={classes.block}>
          <div className={classes.detail}>
            <span>Account</span>

            <span className={classes.pngLine}>
              <LoginIcon className={classes.icon} />
              Sign In
            </span>
          </div>
        </div>
        <div className={classes.block}>
          <div className={classes.detail}>
            <span>Company</span>

            <span className={classes.pngLine}>
              <UsersIcon className={classes.icon} />
              <a href='/about'>About Us</a>
            </span>
          </div>
        </div>
        <div className={classes.block}>
          <div className={classes.detail}>
            <span>Resource</span>

            <span className={classes.pngLine}>
              <LinkIcon className={classes.icon} />
              <p>Safety Privacy & Terms</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
