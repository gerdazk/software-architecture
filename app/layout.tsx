import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoginDialog } from '@/src/components/Dialogs/LoginDialog';
import { RegistrationDialog } from '@/src/components/Dialogs/RegistrationDialog';
import { LogOutButton } from '@/src/components/Buttons/LogOutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	return (
		<Provider session={session}>
			<html lang='en'>
				<body className={inter.className}>
					<nav className='bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
						<div className='mx-auto flex flex-wrap items-center justify-between mx-auto p-4'>
							<a href='https://flowbite.com/' className='flex items-center space-x-3 rtl:space-x-reverse'>
								<img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='Flowbite Logo' />
								<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>LetsSport!</span>
							</a>
							<div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
								{session?.user?.email ? (
									<div className='flex items-center justify-between'>
										<p className='text-1xl text-gray-900 dark:text-white'>{session.user.email}</p>
										<div className='ml-4'>
											<LogOutButton />
										</div>
									</div>
								) : (
									<>
										<LoginDialog />
										<RegistrationDialog />
									</>
								)}
							</div>

							<div
								className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
								id='navbar-sticky'
							>
								<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
									<li>
										<a
											href='/about'
											className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
										>
											Home
										</a>
									</li>
									<li>
										<a
											href='/coaches'
											className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
										>
											Coaches
										</a>
									</li>
									<li>
										<a
											href='/sessions'
											className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
										>
											Sessions
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<div className='mx-3 mb-6'>{children}</div>
				</body>
			</html>
		</Provider>
	);
}
