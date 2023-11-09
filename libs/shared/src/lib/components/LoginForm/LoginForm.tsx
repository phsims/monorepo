import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import Input from '../Input/Input';
import Button from '../Button/Button';

export function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div className="hidden md:block">
          <button
            type="button"
            className="flex justify-end text-xl font-medium bg-primarybg text-primary py-4 px-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-primary"
            onClick={openModal}
          >
            Sign In
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                      <div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/images/Logo/Logo.svg"
                            alt="logo"
                            width={46}
                            height={46}
                          />
                          <Link
                            href="/"
                            className="text-2xl font-semibold text-black ml-4"
                          >
                            Chef&apos;s Kitchen
                          </Link>
                        </div>
                        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-lightgrey">
                          Sign in to your account
                        </h2>
                      </div>
                      <form className="mt-8 space-y-6" action="#" method="POST">
                        <input
                          type="hidden"
                          name="remember"
                          defaultValue="true"
                        />
                        <div className="-space-y-px rounded-md shadow-sm">
                          <div>
                            <Input
                              name="email"
                              id="email-address"
                              lable="Email address"
                              type="email"
                              required={true}
                              placeholder="Email address"
                            />
                          </div>
                          <div>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              required={true}
                              lable="Password"
                              placeholder="Password"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Input
                              id="remember-me"
                              lable="Remember me"
                              name="remember-me"
                              type="checkbox"
                              placeholder="Remember me"
                            />
                          </div>

                          <div className="text-sm">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div>
                          <Button id="signin" type="submit" text="Sign in">
                            <LockClosedIcon
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              aria-hidden="true"
                            />
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end" onClick={closeModal}>
                    <Button
                      id="close-modal"
                      text="Got it, thanks!"
                      btnClass='"inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default LoginForm;
