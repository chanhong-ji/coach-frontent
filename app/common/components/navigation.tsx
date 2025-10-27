import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '~/common/components/ui/navigation-menu';
import { Link, NavLink } from 'react-router';
import { Separator } from './ui/separator';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';

const menus = [
  {
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    name: 'Expenses',
    to: '/expenses',
  },
];

export function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className='flex px-20 h-16 items-center backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50'>
      <div className='flex w-full items-center'>
        <Link to='/' className='font-bold tracking-tighter text-lg'>
          ExpenseTracker
        </Link>
        <Separator orientation='vertical' className='mx-4 min-h-6' />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                <NavLink className={({ isActive }) => cn(navigationMenuTriggerStyle(), isActive && 'bg-accent')} to={menu.to}>
                  {menu.name}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className='ml-auto space-x-3'>
          {isLoggedIn ? (
            <Button variant='secondary'>
              <Link to='/logout'>Logout</Link>
            </Button>
          ) : (
            <>
              <Button variant='secondary'>
                <Link to='/login'>Login</Link>
              </Button>
              <Button variant='secondary'>
                <Link to='/join'>Join</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
