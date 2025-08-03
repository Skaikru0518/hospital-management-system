import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '@/context/auth-context';
import type { MenuDropDownProps } from '@/interface/MenuDropDownProps';
import { MenuIcon } from 'lucide-react';

function MenuDropDown({ menuItem }: MenuDropDownProps) {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <MenuIcon />
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItem.map((item) => (
          <DropdownMenuItem
            key={item.link}
            onSelect={() => navigate(item.link)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuDropDown;
