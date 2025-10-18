import Image from "next/image";
import { mockHalls } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Hall } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Users, CheckCircle, XCircle, AlertTriangle, CalendarPlus } from "lucide-react";
import { BookingSheet } from "@/components/booking-sheet";

const statusConfig = {
  Available: {
    icon: <CheckCircle className="size-4 text-green-500" />,
    badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700",
  },
  Booked: {
    icon: <XCircle className="size-4 text-red-500" />,
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700",
  },
  Maintenance: {
    icon: <AlertTriangle className="size-4 text-yellow-500" />,
    badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
  },
};

const HallCard = ({ hall }: { hall: Hall }) => {
  const placeholder = PlaceHolderImages.find((p) => p.id === hall.imageId);
  const statusInfo = statusConfig[hall.status];

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="font-headline text-xl">{hall.name}</CardTitle>
          <Badge className={cn("flex items-center gap-1.5", statusInfo.badgeClass)}>
            {statusInfo.icon}
            {hall.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1 text-sm">
          <Users className="size-4" />
          <span>Capacity: {hall.capacity}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {placeholder && (
          <div className="aspect-video overflow-hidden rounded-md">
            <Image
              src={placeholder.imageUrl}
              alt={placeholder.description}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint={placeholder.imageHint}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <BookingSheet hall={hall}>
          <button
            disabled={hall.status !== "Available"}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <CalendarPlus className="size-4" />
            Book Now
          </button>
        </BookingSheet>
      </CardFooter>
    </Card>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Hall Availability
        </h1>
        <p className="text-muted-foreground">
          Browse and book seminar halls for your events.
        </p>
      </header>
      <main className="grid flex-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockHalls.map((hall) => (
          <HallCard key={hall.id} hall={hall} />
        ))}
      </main>
    </div>
  );
}
