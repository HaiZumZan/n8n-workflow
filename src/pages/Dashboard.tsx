import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import DocumentCard from '@/components/DocumentCard';
import UploadModal from '@/components/UploadModal';
import AppSidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Upload, FileSearch } from 'lucide-react';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents', search, selectedCategory, selectedFileType],
    queryFn: async () => {
      let query = supabase.from('documents').select('*').order('created_at', { ascending: false });

      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      if (selectedFileType) {
        query = query.ilike('file_type', `%${selectedFileType}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground mt-1">Search and manage your knowledge base</p>
          </div>
          <Button onClick={() => setUploadOpen(true)} className="gradient-primary">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="flex gap-8">
          <AppSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedFileType={selectedFileType}
            onFileTypeChange={setSelectedFileType}
          />

          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No results found</h3>
                <p className="text-muted-foreground mb-4">Try another keyword or upload a new document.</p>
                <Button onClick={() => setUploadOpen(true)} variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map(doc => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
};

export default Dashboard;
