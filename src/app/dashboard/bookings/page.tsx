import { mockBookings, mockHalls } from "@/lib/data";
import type { Booking } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, Hourglass, Calendar, Building2, Check, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const statusConfig = {
  Approved: {
    icon: <CheckCircle className="size-4 text-green-500" />,
    badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700",
  },
  Pending: {
    icon: <Hourglass className="size-4 text-yellow-500" />,
    badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700",
  },
  Rejected: {
    icon: <XCircle className="size-4 text-red-500" />,
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700",
  },
   Resolved: {
    icon: <CheckCircle className="size-4 text-blue-500" />,
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300 dark:border-blue-700",
  },
};

export default function BookingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Bookings
        </h1>
      </div>
      <p className="text-muted-foreground">
        Here is a list of your seminar hall booking requests.
      </p>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="hidden md:table-cell">Hall</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBookings.map((booking) => {
                const hall = mockHalls.find(h => h.id === booking.hallId);
                const statusInfo = statusConfig[booking.status];
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{booking.eventName}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {hall?.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{hall?.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{format(booking.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="hidden sm:table-cell">{booking.startTime} - {booking.endTime}</TableCell>
                    <TableCell>
                       <Badge className={cn("flex items-center justify-center gap-1.5", statusInfo.badgeClass)}>
                        {statusInfo.icon}
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.status === 'Pending' ? (
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            <Check className="size-4 mr-1" /> Approve
                          </Button>
                          <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                            <X className="size-4 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}