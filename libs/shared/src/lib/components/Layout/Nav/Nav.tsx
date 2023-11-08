import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
// import LoginDialog from '../../LoginDialog/LoginDialog';

export interface NavProps {
  navigation: Array<NavigationItem>

}

export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Nav({ navigation }: NavProps) {
  const { data: session } = useSession()

  useEffect(() => {
    // The debounce function receives our function as a parameter
    const debounce = (fn: Function) => {
      // This holds the requestAnimationFrame reference, so we can cancel it if we wish
      let frame: number;
      // The debounce function returns a new function that can receive a variable number of arguments
      return (...params: any[]) => {
        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
          cancelAnimationFrame(frame);
        }
        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {
          // Call our function and pass any params we received
          fn(...params);
        });
      }
    };

    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    }

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    // Update scroll position for first time
    storeScroll();
  }, [])
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Disclosure as="nav" className="navbar">

      <div className="mx-auto max-w-7xl p-3 md:p-6 lg:px-8">
        <div className="relative flex h-12 sm:h-20 items-center">
          <div className="flex flex-1 items-center sm:justify-between">

            {/* LOGO */}

            <div className="flex sm:hidden flex-shrink-0 items-center border-right">
              <Image src="/images/Logo/Logo.svg" alt="logo" width={36} height={36} />
              <Link href="/" className='text-2xl font-semibold text-black ml-4'>
                Chef&apos;s Kitchen.
              </Link>
            </div>
            <div className="hidden sm:flex flex-shrink-0 items-center border-right">
              <Image src="/images/Logo/Logo.svg" alt="logo" width={56} height={56} />
              <Link href="/" className='text-2xl font-semibold text-black ml-4'>
                Chef&apos;s Kitchen.
              </Link>
            </div>

            {/* LINKS */}

            <div className="hidden lg:flex items-center border-right ">
              <div className="flex justify-end space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-black' : 'navlinks hover:opacity-100',
                      'px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links'
                    )}
                    aria-current={item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

            </div>
            <div className='gap-6 hidden lg:flex'>
              <div className='flex items-center gap-2'>
                <Image src={'/images/Navbar/phone.svg'} alt="phone-image" width={19} height={19} />
                <p className='text-lg font-medium'>+1(909) 235-9814</p>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className='hidden md:block'>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className='hidden md:block'>
                      {session ?
                        (
                          <button type="button" className='flex justify-end text-xl font-medium bg-primarybg text-primary py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-primary' onClick={() => signOut()}>
                            Sign Out
                          </button>
                        ) : (
                          <button type="button" className='flex justify-end text-xl font-medium bg-primarybg text-primary py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-primary' onClick={() => signIn('cognito')}>
                            Sign In
                          </button>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* DRAWER FOR MOBILE VIEW */}

          {/* DRAWER ICON */}

          <div className='block lg:hidden'>
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
          </div>

          {/* DRAWER LINKS DATA */}

          {/* <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer> */}

        </div>
      </div>

    </Disclosure>
  )
}

export default Nav;
