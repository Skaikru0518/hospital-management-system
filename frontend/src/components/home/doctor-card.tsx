import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DoctorCardProps } from '@/interface/DoctorCardProps';

export function DoctorCard({
  name,
  specialty,
  experience,
  image,
  rating,
}: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-primary font-medium">{specialty}</p>
        <p className="text-sm text-muted-foreground mt-1">{experience} years</p>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-500">
            {'★'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
          </div>
        </div>
        <span className="text-sm text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Book</Button>
      </CardFooter>
    </Card>
  );
}
