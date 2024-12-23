import Image from 'next/image';

import Logo from '@/public/icons/logo.svg';

import Cart from '../features/cart/cart';

const Header = () => {
  return (
    <>
      {/* Spacer */}
      <div className='invisible min-h-24 w-full' id='header-spacer' />
      <header className='fixed top-0 z-10 w-full justify-between bg-background shadow-md'>
        <div className='max-w-section m-auto flex items-center justify-between p-4'>
          <Image src={Logo} alt='logo' className='size-16' />
          <Cart />
        </div>
      </header>
    </>
  );
};

export default Header;
