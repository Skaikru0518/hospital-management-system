import { Card } from '@/components/ui/card';
import type { ServiceCardProps } from '@/interface/ServiceCardProps';

export function ServiceCard({ title, description, Icon }: ServiceCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-300">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground"> {description}</p>
    </Card>
  );
}
