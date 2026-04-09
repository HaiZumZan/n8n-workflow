import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface DocumentCardProps {
  document: {
    id: string;
    title: string;
    description: string | null;
    tags: string[] | null;
    file_name: string;
    file_type: string;
    file_size: number;
    file_path: string;
    category: string | null;
    created_at: string;
  };
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentCard = ({ document }: DocumentCardProps) => {
  const handleView = () => {
    const { data } = supabase.storage.from('documents').getPublicUrl(document.file_path);
    window.open(data.publicUrl, '_blank');
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200 border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{document.title}</h3>
            {document.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{document.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {document.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(document.created_at), 'MMM d, yyyy')}
              </span>
              <span className="text-xs text-muted-foreground">{formatFileSize(document.file_size)}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={handleView} className="flex-shrink-0">
            <Download className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
