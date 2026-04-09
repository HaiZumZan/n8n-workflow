import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Filter, Clock, TrendingUp } from 'lucide-react';

const CATEGORIES = ['general', 'research', 'lecture', 'assignment', 'notes', 'reference'];
const FILE_TYPES = ['PDF', 'DOCX', 'PPTX', 'XLSX', 'TXT'];

interface SidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedFileType: string | null;
  onFileTypeChange: (type: string | null) => void;
}

const AppSidebar = ({ selectedCategory, onCategoryChange, selectedFileType, onFileTypeChange }: SidebarProps) => {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4" />
            Categories
          </h3>
          <div className="space-y-1">
            <Button
              variant={selectedCategory === null ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start text-sm"
              onClick={() => onCategoryChange(null)}
            >
              All
            </Button>
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start capitalize text-sm"
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">File Types</h3>
          <div className="flex flex-wrap gap-2">
            {FILE_TYPES.map(type => (
              <Badge
                key={type}
                variant={selectedFileType === type.toLowerCase() ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => onFileTypeChange(selectedFileType === type.toLowerCase() ? null : type.toLowerCase())}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            Quick Filters
          </h3>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-2" />
              Recent uploads
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
