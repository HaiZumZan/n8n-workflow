import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BookOpen, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const initials = user?.email?.substring(0, 2).toUpperCase() ?? 'U';

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Knowledge Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
