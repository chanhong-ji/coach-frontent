import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '~/common/components/ui/navigation-menu';
import { Link } from 'react-router';
import { Separator } from './ui/separator';

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

export function Navigation() {
  return (
    <nav className='flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50'>
      <div className='flex items-center'>
        <Link to='/' className='font-bold tracking-tighter text-lg'>
          ExpenseTracker
        </Link>
        <Separator orientation='vertical' className='mx-4 min-h-6' />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                  {menu.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
