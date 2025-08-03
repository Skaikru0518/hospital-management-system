import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DoctorType } from '@/types/DoctorType';
import { labelizeEnumValue } from '@/lib/labelizer';

export function DoctorCard({
  user,
  field,
  surgery,
  room,
  phone,
  rating,
  image,
  experience,
}: DoctorType) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="overflow-hidden flex items-center justify-center">
          <img
            src={image || '/default-doctor.png'}
            alt={user.name}
            className="h-64 w-64 object-cover object-top"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <p className="text-primary font-medium">{labelizeEnumValue(field)}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {experience !== null ? `${experience} years` : 'Experience: N/A'}
        </p>
        <p className="text-sm text-muted-foreground">Room: {room}</p>
        <p className="text-sm text-muted-foreground">
          Surgery: {labelizeEnumValue(surgery)}
        </p>
        <p className="text-sm text-muted-foreground">Phone: {phone}</p>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-500">
            {'★'.repeat(Math.floor(rating ?? 0))}
            {'☆'.repeat(5 - Math.floor(rating ?? 0))}
          </div>
          <span className="text-sm text-muted-foreground ml-1">
            ({rating !== null ? rating.toFixed(1) : 'N/A'})
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full hover:cursor-pointer">
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
